import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from "@/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { customerID } = await req.json(); // Plan ID from the client (e.g., 'price_1Hh1Q0KEXAMPLE123')

    const authsession = await auth();

    if (!authsession) {
      console.log("unauthorized");
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
      });
    }

    const session = await stripe.billingPortal.sessions.create({
        customer: customerID,
        return_url: process.env.NEXT_PUBLIC_SUCCESS_URL,
        
        // configuration: {
        //   features: {
        //     subscription_update: {
        //       enabled: true,
        //       proration_behavior: 'always_invoice',
        //       default_allowed_updates: ['price'],
        //     }
        //   }
        // },
        //configuration: "bpc_1PxWjVGSOkYdeBqyUS2QLd7u"
        // flow_data: {
        //   type: "subscription_update_confirm",
        //   subscription_update_confirm: {
        //     items: [{
        //       price: "price_1Q4KXoGSOkYdeBqyJ0plwKQO",
        //       id: "sub_1Q5Nh6GSOkYdeBqy8FkV50Ah",
              
        //     }],
        //     subscription: "sub_1Q5Nh6GSOkYdeBqy8FkV50Ah"
        //   },
        //   //subscription_update: "sub_1Q5Nh6GSOkYdeBqy8FkV50Ah"
        // }
    });
    // Create a Stripe Checkout session for a subscription
    console.log(JSON.stringify(session));

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}