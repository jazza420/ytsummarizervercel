import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from "@/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { planId, customer } = await req.json(); // Plan ID from the client (e.g., 'price_1Hh1Q0KEXAMPLE123')

    const authsession = await auth();

    if (!authsession) {
      console.log("unauthorized");
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
      });
    }

    // const customerSession = await stripe.customerSessions.create({
    //   customer: 'cus_QwJy9MNyPmu4kW',
    //   components: {
    //     pricing_table: {
    //       enabled: true,
    //     },
    //   },
    // });
    // console.log(customerSession);
    console.log(new Date().getTime());

    let checkoutSessionData = {
      payment_method_types: ['card'],
      line_items: [
        {
          price: planId, // Use the price ID of the subscription plan
          quantity: 1,
          
        },
      ],
      // subscription_data: {
      //   proration_behavior:"none",
      //   billing_cycle_anchor: null,
      // },
      mode: 'subscription', // Set mode to 'subscription' for recurring payments
      success_url: `${process.env.NEXT_PUBLIC_SUCCESS_URL}`,//?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.NEXT_PUBLIC_CANCEL_URL,
      //subscription:"sub_1Q4PRKGSOkYdeBqySKblZBSH"
    }
    if(customer) checkoutSessionData.customer = customer;
    else checkoutSessionData.customer_email = authsession.user.email


    // Create a Stripe Checkout session for a subscription
    const session = await stripe.checkout.sessions.create(checkoutSessionData);

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}