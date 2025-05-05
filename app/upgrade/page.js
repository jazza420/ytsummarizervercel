"use client";

import React, { useState, useEffect, useRef  } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { SessionProvider } from 'next-auth/react';
import { loadStripe, Stripe, StripeError } from '@stripe/stripe-js';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


export default function UpgradePage() {
  //const [dashboardState, setDashboardState] = useState("view");
  return (
    <SessionProvider>
        <Upgrade/>
    </SessionProvider>
  );
}





function Upgrade() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    fetchUserData();
  }, [session]);


  const fetchUserData = async () => {
    if (session) {
        fetch("/api/get-user-credits")
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              console.error(data.message);
            } else {
              setUserData(data);
              buyPlan('price_1QE9U3GSOkYdeBqyscUXkjim');
            }
          });
          console.log(JSON.stringify(session.user, null, 2));
      }
  }


  const manageSub = async (subscriptionId, stripePriceId) => {
    const stripe = await stripePromise;
  
    const response = await fetch('/api/show-stripe-portal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customerID: userData.stripeCustomerId }),
    });
  
    const session = await response.json();
    //console.log(JSON.stringify(session));
    if (!session.error) {
      //if(stripePriceId) window.location.href = session.url+`/subscriptions/${subscriptionId}/preview/${stripePriceId}`;
      window.location.href = session.url;
    }
    // Redirect to Stripe Checkout
    //const result = await stripe.red({ sessionId: session.id });
  
    // if (result.error) {
    //   console.error(result.error.message);
    // }
  }


    const buyPlan = async (plan) => {
    
        const stripe = await stripePromise;

        // if(userData?.subscriptionStatus && userData.subscriptionStatus=="active") {
        //   manageSub(userData.subscriptionId, plan);
        //   return;
        // }

        const response = await fetch('/api/create-checkout-session-subscription', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ planId: plan, customer: userData?.stripeCustomerId }),
        });

        const session = await response.json();

        // Redirect to Stripe Checkout
        const result = await stripe?.redirectToCheckout({ sessionId: session.id });

        if (result?.error) {
            console.error(result.error.message);
        }
    
    }

    return <div/>;
}