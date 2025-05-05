import Stripe from 'stripe';
import clientPromise from '../../../lib/mongodb';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const headersList = headers();
  const sig = headersList.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(await req.text(), sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log(`Event received: ${event.type}`);

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await handleSubscriptionEvent(event.data.object);
        console.log("previous_attributes: "+JSON.stringify(event.data.previous_attributes))
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error(`Error processing event ${event.type}:`, error);
    return new Response(`Error processing event: ${error.message}`, { status: 500 });
  }

  return new Response(null, { status: 200 });
}

async function handleCheckoutSessionCompleted(session) {
  if (session.mode !== 'subscription') {
    console.log('Not a subscription checkout session, skipping');
    return;
  }

  const client = await clientPromise;
  const db = client.db('Cluster0');
  const usersCollection = db.collection('users');

  // const userEmail = session.customer_email;
  // if (!userEmail) {
  //   throw new Error('User email not found in the checkout session');
  // }

  const subscription = await stripe.subscriptions.retrieve(session.subscription);

  const customer = await stripe.customers.retrieve(subscription.customer);
  if (customer.deleted) {
    throw new Error('Customer has been deleted');
  }

  const customerEmail = customer.email;
  if (!customerEmail) {
    throw new Error('Customer email not found');
  }


  await updateUserSubscription(usersCollection, customerEmail, subscription);
}

async function handleSubscriptionEvent(subscription) {
  const client = await clientPromise;
  const db = client.db('Cluster0');
  const usersCollection = db.collection('users');

  if(subscription.status==="incomplete") {
    console.log(`incomplete subscription, ignoring`);
    return
  }   

  const customer = await stripe.customers.retrieve(subscription.customer);
  if (customer.deleted) {
    throw new Error('Customer has been deleted');
  }

  const customerEmail = customer.email;
  if (!customerEmail) {
    throw new Error('Customer email not found');
  }

  await updateUserSubscription(usersCollection, customerEmail, subscription);
}


//store highest subscription
//only apply credits if subscription goes up or period end changed
//reset highest subscription on period end changed
//indicate to user that they have cancelled already



async function updateUserSubscription(usersCollection, email, subscription) {
  const status = subscription.status;
  console.log(`Updating subscription: ${status} for ${email}`);


  const user = await usersCollection.findOne(
    { email: email },
    {
      projection: {
        // stripePriceId: 1,
        // subscriptionStatus: 1,
        // stripeCurrentPeriodEnd: 1,
        creatorPlan: 1,
        proPlan: 1
        //credits: 1,
        //freeCredits: 1
      },
    }
  );

  console.log("test: "+JSON.stringify(user))


  let subUpdateData = {
    subscriptionId: subscription.id,
    subscriptionStatus: status,
    stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    cancelled: subscription.cancel_at_period_end
  };

  const planName = subscription.items.data[0]?.price.metadata.tier_name;

  let updateData = {
    stripeCustomerId: subscription.customer,
    //'creatorPlan':subUpdateData
  }

  let currentSubData = null;

  if(planName == "creator") {
    updateData.creatorPlan=subUpdateData
    currentSubData = user?.creatorPlan
  }
  else {
    updateData.proPlan=subUpdateData
    currentSubData = user?.proPlan
  }



  const lastPeriodEnd = currentSubData?.stripeCurrentPeriodEnd!=null ? new Date(currentSubData?.stripeCurrentPeriodEnd).getTime() : 0;
  
  if(lastPeriodEnd!=subUpdateData.stripeCurrentPeriodEnd.getTime() || status!="active") {
    subUpdateData.credits = getCreditsForPlan(subscription.items.data[0]?.price.id, status);
    console.log("credits reset");

    // try {
    //   const existingSubscriptions = await stripe.subscriptions.list({
    //     limit: 3,
    //     status: "active",
    //     customer: subscription.customer
    //   });

    //   for (let esub of existingSubscriptions.data) {
    //     if (esub.id == subscription.id) continue;
    //     await stripe.subscriptions.update(
    //       esub.id,
    //       {
    //         cancel_at_period_end: true
    //       }
    //     );
    //   }
    // }catch (error) {
    //   print(error);
    // }
    
  } else if(currentSubData) {
    subUpdateData.credits = currentSubData.credits;
    console.log("credits didn't change");
  }
  // //!user.stripePriceId || 
  // console.log(lastPeriodEnd + " " + updateData.stripeCurrentPeriodEnd.getTime())
  // if(lastPeriodEnd!=updateData.stripeCurrentPeriodEnd.getTime() || subscription.items.data[0]?.price.metadata.tier_name=="creator")
  //   updateData.stripePriceId = subscription.items.data[0]?.price.id;

  // console.log(JSON.stringify(updateData))

  // Update credits based on the subscription plan
  //updateData.credits = getCreditsForPlan(subscription.items.data[0]?.price.id, status);

  const result = await usersCollection.updateOne(
    { email: email },
    { $set: updateData},
    //{ upsert: true }
  );

  console.log(JSON.stringify(result));


  // if (result.modifiedCount === 0 && result.upsertedCount === 0) {
  //   //throw new Error('Failed to update the user record');
  //   console.log(`no changes were made to the user subscription`);
  // } else {

  //   const credits = getCreditsForPlan(subscription.items.data[0]?.price.id, status);
  //   console.log(`some changes were made to the user subscription, now setting credits to ${credits}`);

  //   const result2 = await usersCollection.updateOne(
  //       { email: email },
  //       { $set: planName == "creator" ? {"creatorPlan.credits" : credits } : {"proPlan.credits" : credits }}
  //       //{ upsert: true }
        
  //   );
  //   if (result2.modifiedCount === 0 && result2.upsertedCount === 0)
  //       console.log(`credits did not need to be changed`);
  // }

  // console.log(`User record updated successfully for ${email}`);
}

function getCreditsForPlan(priceId, status) {
  // Implement your logic to determine credits based on the price ID and status
  // This is just a placeholder implementation
  if (status === 'active') {
    //testing
    // if(priceId=="price_1PxVJNGSOkYdeBqy3NqFj5Sg")
    //   return 60;  // or use a switch statement for different price IDs
    // else if(priceId=="price_1Q4KXoGSOkYdeBqyJ0plwKQO")
    //   return 180

    
    if(priceId=="price_1QE9U3GSOkYdeBqyscUXkjim")
      return 60;  // or use a switch statement for different price IDs
    // else if(priceId=="price_1Q4KXoGSOkYdeBqyJ0plwKQO")
    //   return 180
  }
  return 0;
}