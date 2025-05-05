import Stripe from 'stripe';
import clientPromise from '../../../lib/mongodb'; // Adjust the path to your MongoDB setup
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const headersList = headers();
  const sig2 = headersList.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(await req.text(), sig2, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log(event.type);
  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const checkoutSession = event.data.object;
        if (checkoutSession.mode === 'subscription') {
          await handleSubscriptionCheckoutCompleted(checkoutSession);
        }
        break;
      // case 'invoice.payment_succeeded':
      //   const invoice = event.data.object;
      //   await handleInvoicePaymentSucceeded(invoice);
      //   break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        const subscription = event.data.object;
        await handleSubscriptionEvent(subscription);
        break;
      // Handle other relevant events
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error(`Error processing event ${event.type}:`, error);
    return new Response(`Error processing event: ${error.message}`, { status: 500 });
  }

  // Return a 200 response to acknowledge receipt of the event
  return new Response(null, { status: 200 });
}

// Handle subscription creation from a checkout session
async function handleSubscriptionCheckoutCompleted(checkoutSession) {
  const client = await clientPromise;
  const db = client.db('Cluster0'); // Replace with your database name
  const usersCollection = db.collection('users');

  const userEmail = checkoutSession.customer_email;
  if (!userEmail) {
    throw new Error('User email not found in the checkout session');
  }

  if (userEmail) {
    const subscription = await stripe.subscriptions.retrieve(checkoutSession.subscription);
    
    //console.log(JSON.stringify(subscription))

    const toset = {
      subscriptionId: subscription.id,
      stripeCustomerId: subscription.customer,
      subscriptionStatus: subscription.status,
      stripePriceId: subscription.items.data[0]?.price.id,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
      // currentPlan: checkoutSession.display_items[0].plan.id, // Example to save the plan ID
    }
    console.log(JSON.stringify(toset));
    
    const result = await usersCollection.updateOne(
      { email: userEmail },
      {
        $set: toset
      }//,
      //{ upsert: true }
    );

    if (result.modifiedCount === 0 && result.upsertedCount === 0) {
      console.error('Failed to update the user record');
    } else {
      console.log('User record updated successfully with subscription info');
    }
  } else {
    console.error('User email not found in the checkout session');
  }
}



// Handle subscription events like creation, updates, and cancellations
async function handleSubscriptionEvent(subscription) {
  const client = await clientPromise;
  const db = client.db('Cluster0');
  const usersCollection = db.collection('users');

  console.log(JSON.stringify(subscription))

  //const customerEmail = subscription.customer_email;

  // Retrieve customer details to get the email
  const customer = await stripe.customers.retrieve(subscription.customer);
    
  if (customer.deleted) {
    throw new Error('Customer has been deleted');
  }

  const customerEmail = customer.email;
  if (!customerEmail) {
    throw new Error('Customer email not found');
  }

  if (customerEmail) {
    const status = subscription.status;

    console.log(`subscription changed ${status} ${customerEmail}`);

    let toset = {
      subscriptionId: subscription.id,
      stripeCustomerId: subscription.customer,
      subscriptionStatus: status,
      stripePriceId: subscription.items.data[0]?.price.id,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
    }
    if(status == "active")
      toset.credits = 50;
    if(status == "canceled")
      toset.credits = 0;

    const result = await usersCollection.updateOne(
      { email: customerEmail },
      {
        $set: toset
      }
    );

    if (result.modifiedCount === 0 && result.upsertedCount === 0) {
      console.error('Failed to update the user record for subscription event');
    } else {
      console.log(`User record updated successfully with status ${status}`);
    }
  } else {
    console.error('Customer email not found in subscription');
  }
}












// Handle successful invoice payment for an existing subscription
// async function handleInvoicePaymentSucceeded(invoice) {
//   const client = await clientPromise;
//   const db = client.db('Cluster0');
//   const usersCollection = db.collection('users');

//   const customerId = invoice.customer;

//   //const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
//   const customerEmail = invoice.customer_email;

//   if (customerEmail) {
//     const result = await usersCollection.updateOne(
//       { email: customerEmail },
//       {
//         $set: {
//           credits: 50,
//           subscriptionStatus: 'active',
//           lastPaymentDate: new Date(invoice.created * 1000) // Convert from Unix timestamp
//         }
//       },
//       { upsert: true }
//     );

//     if (result.modifiedCount === 0 && result.upsertedCount === 0) {
//       console.error('Failed to update the user record after invoice payment');
//     } else {
//       console.log('User record updated successfully after invoice payment');
//     }
//   } else {
//     console.error('Customer email not found in the subscription');
//   }
// }
