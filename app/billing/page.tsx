"use client"

import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';
import { SubscriptionCard } from '@/components/billing/subscription-card';
import { SubscriptionManagement } from '@/components/billing/subscription-management';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { loadStripe, Stripe, StripeError } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
import styles from '../spinner.module.css';

export default function BillingPage() {
  // State to track subscription status
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  
  const handleSubscribe = () => {
    // In a real app, this would trigger a payment flow
    //setIsSubscribed(true);

    buyPlan({ plan: "price_1QE9U3GSOkYdeBqyscUXkjim" });
  };

  const handleCancelSubscription = () => {
    // In a real app, this would trigger cancellation flow
    //setIsSubscribed(false);
  };



  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<any>(null);
  
  

  useEffect(() => {
    fetchUserData();
  }, [session]);
  


  const fetchUserData = async () => {
    if (session) {
      if (session.user) {
        fetch("/api/get-user")
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              console.error(data.message);
            } else {
              setUserData(data);
              setIsSubscribed(data?.proPlan && data?.proPlan.subscriptionStatus=="active")
              //   set
            }
          });
          console.log(JSON.stringify(session, null, 2));
      }
    }
  }




  const buyPlan = async ({ plan }: { plan: string }) => {

    const stripe = await stripePromise;

    const response = await fetch('/api/create-checkout-session-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ planId: plan, customer: userData?.stripeCustomerId}),
    });

    const session = await response.json();

    // Redirect to Stripe Checkout
    const result = await stripe?.redirectToCheckout({ sessionId: session.id });

    if (result?.error) {
      console.error(result.error.message);
    }
    
  }




  const manageSub = async () => {
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




  return (
    <div className="container py-10">
      <div className="mb-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Billing</h1>
        <p className="text-muted-foreground">
          Manage your subscription and payment details.
        </p>
      </div>
      {(!session && status !="loading") && (
        <>
        <div className="mb-8 max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Sign in to manage your subscription</CardTitle>
              <CardDescription>
                Please sign in to view and manage your subscription details.
              </CardDescription>
            </CardHeader>
            <CardContent>
            <Button size="sm" onClick={() => signIn(undefined, {callbackUrl:'/billing'})}>Sign In</Button>
            </CardContent>
          </Card>
          
          </div>
        </>
      )}
      {/* {status} */}
      {((!session && status == "loading") || (session && !userData)) && (
        <div className={styles.spinnerContainer} style={{marginTop:"3rem"}}>
          <div className={styles.spinner2}></div>
        </div>
       
      )}
      
      <div className="max-w-3xl mx-auto">
        {/* {status} */}

        {(session && userData)&&
          <>

            <h2 className="text-2xl font-semibold mb-6">
              {isSubscribed ? "Your Current Plan" : "Choose a Plan"}
            </h2>

            {isSubscribed ? (
              <SubscriptionManagement onCancel={manageSub} nextBillingDate={new Date(userData?.proPlan?.stripeCurrentPeriodEnd)} />
            ) : (
              <SubscriptionCard onSubscribe={handleSubscribe} />
            )}

            {/* <div className="mt-12">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>
                    View your recent payment transactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubscribed ? (
                    <div className="border rounded-md divide-y">
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">Premium Plan</p>
                          <p className="text-sm text-muted-foreground">May 15, 2025</p>
                        </div>
                        <p className="font-medium">$9.99</p>
                      </div>
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">Premium Plan</p>
                          <p className="text-sm text-muted-foreground">Apr 15, 2025</p>
                        </div>
                        <p className="font-medium">$9.99</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <p>No payment history available.</p>
                      <p className="text-sm mt-2">Subscribe to a plan to view your payment history.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div> */}
          </>
        }
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">How does billing work?</h3>
              <p className="text-muted-foreground">
                Your subscription is billed monthly. You can cancel at any time, and your subscription will remain active until the end of the current billing period.
              </p>
            </div>
            {/* <div>
              <h3 className="font-medium mb-2">Can I get a refund?</h3>
              <p className="text-muted-foreground">
                We offer a 14-day money-back guarantee. If you're not satisfied with our service, contact support for a full refund.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">How do I update my payment method?</h3>
              <p className="text-muted-foreground">
                You can update your payment method in the account settings. Navigate to Account &gt; Payment Methods.
              </p>
            </div> */}
          </div>
        </div>
      </div>
  
    </div>
  );
}