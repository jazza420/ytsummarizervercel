
"use client";

import styles from './creditspage.module.css'
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);



import { useState, useEffect, useRef  } from 'react';


export default function CreditsPage() {
  useEffect(() => {})
  return (
    // <div className={styles.container}>
    //   <header className={styles.header}>
    //     <div className={styles.logo}>VoiceAI</div>
    //   </header>

      // <main>
        <section className={styles.creditPackages}>
          <h2>Get More Credits</h2>
          {/* <h4>1 Credit = 1 Video</h4> */}
          <div className={styles.packageGrid}>
            <CreditPackage
              credits={50}
              price={3.99}
              amount={399}
              buttonText="Buy 50 Credits"
            />
            <CreditPackage
              credits={150}
              price={9.99}
              amount={999}
              buttonText="Buy 150 Credits"
            />
            <CreditPackage
              credits={300}
              price={19.99}
              amount={1999}
              buttonText="Buy 300 Credits"
            />
            <CreditPackage
              credits={1000}
              price={49.99}
              amount={4999}
              buttonText="Buy 1000 Credits"
            />
            
          </div>
          
        </section>
      // </main>

    //   <footer className={styles.footer}>
    //     <div className={styles.copyright}>
    //       © 2024 VoiceAI. All rights reserved.
    //     </div>
    //   </footer>
    // </div>
  )
}

// interface CreditPackageProps {
//   credits: number
//   price: number
//   buttonText: string
// }

function CreditPackage({ credits, price, amount, buttonText }) {
  const handleClick = async () => {
    const stripe = await stripePromise;

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    const session = await response.json();

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className={styles.creditPackage}>
      <h3>{credits} Credits</h3>
      <p>Only ${price.toFixed(2)} USD</p>
      <button className={styles.buyButton} role="link" onClick={handleClick}>{buttonText}</button>
    </div>
  )
}




// const CheckoutButton = ({ amount }) => {
//   const handleClick = async () => {
//     const stripe = await stripePromise;

//     const response = await fetch('/api/create-checkout-session', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ amount }),
//     });

//     const session = await response.json();

//     // Redirect to Stripe Checkout
//     const result = await stripe.redirectToCheckout({ sessionId: session.id });

//     if (result.error) {
//       console.error(result.error.message);
//     }
//   };

//   return (
//     <button role="link" onClick={handleClick}>
//       Checkout
//     </button>
//   );
// };