'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import styles from './pricingpage2.module.css';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { signIn} from 'next-auth/react';

import { loadStripe, Stripe, StripeError } from '@stripe/stripe-js';
import Link from 'next/link';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);




export interface PricingTierFrequency {
  id: string;
  value: string;
  label: string;
  priceSuffix: string;
}

export interface PricingTier {
  name: string;
  id: string;
  href: string;
  discountPrice: string | Record<string, string>;
  price: string | Record<string, string>;
  description: string | React.ReactNode;
  features: string[];
  featured?: boolean;
  highlighted?: boolean;
  cta: string;
  soldOut?: boolean;
  planID: string;
}

export const frequencies: PricingTierFrequency[] = [
  { id: '1', value: '1', label: 'Monthly', priceSuffix: '/month' },
  { id: '2', value: '2', label: 'Annually', priceSuffix: '/year' },
];

export const tiers: PricingTier[] = [
  // {
  //   name: 'Free',
  //   id: '0',
  //   href: '/dashboard',
  //   price: { '1': '$0', '2': '$0' },
  //   discountPrice: { '1': '', '2': '' },
  //   description: 'Give it a try. No credit card needed.',
  //   features: [
  //     "2 free audiobooks per week (up to 20 minutes long)",
  //     "Download for free",
  //     "Multiple free voices"
  //   ],
  //   featured: false,
  //   highlighted: true,
  //   soldOut: false,
  //   cta: `Current`,
  //   planID: "free"
  // },
  {
    name: 'Pro',
    id: '1',
    href: '/subscribe',
    price: { '1': '$4.99', '2': '$49.99' },
    discountPrice: { '1': '', '2': '' },
    description: `If you're more serious`,
    features: [
      `500 credits (36 hours of audio)`,
      `Up to 6 hour long audiobooks`,
      `Higher queue priority`,
      `Concurrent generations`,
    ],
    featured: false,
    highlighted: true,
    soldOut: false,
    cta: `Get started`,
    planID: "price_1QE9U3GSOkYdeBqyscUXkjim"
    //testingplanID: "price_1PxVJNGSOkYdeBqy3NqFj5Sg"
  },
  // {
  //   name: 'Creator',
  //   id: '2',
  //   href: '/contact-us',
  //   price: { '1': '$14.99', '2': '$179.88' },
  //   discountPrice: { '1': '', '2': '' },
  //   description: `Pump out the content with 6 videos per day`,
  //   features: [
  //       `180 Credits`,
  //       `Highest queue priority`,
  //       `Unlimited concurrent generations`,
  //   ],
  //   featured: false,
  //   highlighted: true,
  //   soldOut: false,
  //   cta: `Get started`,
  //   planID: "price_1Q4KXoGSOkYdeBqyJ0plwKQO"
  // },
];

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn('w-6 h-6', className)}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
};



// const buyPlan = async ({ plan }: { plan: string }) => {
  
//     const stripe = await stripePromise;
  
//     const response = await fetch('/api/create-checkout-session-subscription', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ planId: plan, customer: "cus_QwJy9MNyPmu4kW" }),
//     });
  
//     const session = await response.json();
  
//     // Redirect to Stripe Checkout
//     const result = await stripe?.redirectToCheckout({ sessionId: session.id });
  
//     if (result?.error) {
//       console.error(result.error.message);
//     }
    
//   }


export default function PricingPage({currentPlan, loggedIn, user, buyPlan, manageSub}: {currentPlan: string | null, loggedIn: boolean, user: any, buyPlan: (plan: string) => void, manageSub: (sub: string | null, plan: string | null) => void}) {
  const [frequency, setFrequency] = useState(frequencies[0]);



  const bannerText = '';

  return (
    <>

    <div
      className={cn('flex flex-col w-full')}
    >

      {/* <div className="w-full flex flex-col items-center">
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center"> */}
          
          
          
          
          {/* <div className="lg:w-auto  max-w-4xl ">
            <h1 className="text-black dark:text-white text-2xl font-semibold max-w-xs sm:max-w-none md:text-2xl !leading-tight">
              Choose a Plan
            </h1>
          </div> */}

         


          {bannerText ? (
            <div className="w-full lg:w-auto flex justify-center my-4">
              <p className="w-full px-4 py-3 text-xs bg-sky-100 text-black dark:bg-sky-300/30 dark:text-white/80 rounded-xl">
                {bannerText} 
              </p>
            </div>
          ) : null}

          {/* {frequencies.length > 1 ? (
            <div className="mt-16 flex justify-center">
              <RadioGroup
                defaultValue={frequency.value}
                onValueChange={(value: string) => {
                  setFrequency(frequencies.find((f) => f.value === value)!);
                }}
                className="grid gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 bg-white dark:bg-black ring-1 ring-inset ring-gray-200/30 dark:ring-gray-800"
                style={{
                  gridTemplateColumns: `repeat(${frequencies.length}, minmax(0, 1fr))`,
                }}
              >
                <Label className="sr-only">Payment frequency</Label>
                {frequencies.map((option) => (
                  <Label
                    className={cn(
                      frequency.value === option.value
                        ? 'bg-sky-500/90 text-white dark:bg-sky-900/70 dark:text-white/70'
                        : 'bg-transparent text-gray-500 hover:bg-sky-500/10',
                      'cursor-pointer rounded-full px-2.5 py-2 transition-all',
                    )}
                    key={option.value}
                    htmlFor={option.value}
                  >
                    {option.label}

                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      className="hidden"
                    />
                  </Label>
                ))}
              </RadioGroup>
            </div>
          ) : (
            <div className="mt-12" aria-hidden="true"></div>
          )} */}

          <div
          //   className={cn(
          //     'isolate mx-auto mt-4 mb-28 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none',
          //     tiers.length === 2 ? 'lg:grid-cols-2' : '',
          //     tiers.length === 3 ? 'lg:grid-cols-3' : '',
          //   )
          // }
          >
            {tiers.map((tier) => { 

              const subbed = ((tier.name=="Pro" && user?.proPlan && user?.proPlan.subscriptionStatus=="active") || (tier.name=="Creator" && user?.creatorPlan && user?.creatorPlan.subscriptionStatus=="active"));
              
              const remaining = (user?.proPlan?.cancelled?"cancels in " : "renews in ")+ (Math.floor((new Date(user?.proPlan?.stripeCurrentPeriodEnd).getTime() - new Date().getTime())/1000/86400))+" days" 

              return(
              <div
                key={tier.id}
                className={cn(
                  tier.featured
                    ? '!bg-gray-900 ring-gray-900 dark:!bg-gray-100 dark:ring-gray-100'
                    : 'bg-white dark:bg-neutral-900 ring-neutral-900 ',
                  'max-w-xs ring-1 rounded-md p-8 xl:p-10',
                  !tier.highlighted ? styles.fancyGlassContrast : '',
                )}
              >
                <h3
                  id={tier.id}
                  className={cn(
                    tier.featured ? 'text-white dark:text-black' : 'text-black dark:text-white',
                    'text-1xl  tracking-tight',
                  )}
                >
                  {tier.name} Plan
                </h3>
                {/* <p
                  className={cn(
                    tier.featured
                      ? 'text-gray-300 dark:text-gray-500'
                      : 'text-gray-600 dark:text-gray-400',
                    'mt-4 text-sm leading-6',
                  )}
                >
                  {tier.description}
                </p> */}
                <p className="mt-3 flex items-baseline gap-x-1">
                  <span
                    className={cn(
                      tier.featured ? 'text-white dark:text-black' : 'text-black dark:text-white',
                      'text-3xl font-bold tracking-tight',
                    //   tier.discountPrice && tier.discountPrice[frequency.value]
                    //     ? 'line-through'
                    //     : '',
                    )}
                  >
                    {typeof tier.price === 'string'
                      ? tier.price
                      : tier.price[frequency.value]}
                  </span>

                  <span
                    className={cn(
                      tier.featured ? 'text-white dark:text-black' : 'text-black dark:text-white',
                    )}
                  >
                    {typeof tier.discountPrice === 'string'
                      ? tier.discountPrice
                      : tier.discountPrice[frequency.value]}
                  </span>

                  {typeof tier.price !== 'string' ? (
                    <span
                      className={cn(
                        tier.featured
                          ? 'text-gray-300 dark:text-gray-500'
                          : 'dark:text-gray-400 text-gray-600',
                        'text-sm font-semibold leading-6',
                      )}
                    >
                      {frequency.priceSuffix}
                    </span>
                  ) : null}
                </p>


                <ul
                  className={cn(
                    tier.featured
                      ? 'text-gray-300 dark:text-gray-500'
                      : 'text-gray-700 dark:text-gray-400',
                    'mt-8 space-y-3 text-sm leading-6', // xl:mt-10
                  )}
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className={cn(
                          tier.featured ? 'text-white dark:text-black' : '',
                          tier.highlighted
                            ? 'text-sky-500'
                            : 'text-gray-500',

                          'h-6 w-5 flex-none',
                        )}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>


                {(!loggedIn || (loggedIn&&user&&tier.name!='Free')) && <a
                //   href="/dashboard"
                  aria-describedby={tier.id}
                  className={cn(
                    'flex mt-6 shadow-sm',
                    // tier.soldOut || currentPlan===tier.planID || (tier.name==='Free' && currentPlan)  ? 'pointer-events-none' : '',
                  )}
                >
                  <Button
                    size="lg"
                    onClick={ async () => {if(loggedIn) buyPlan(tier.planID); else signIn(undefined, {callbackUrl:'/dashboard'})} }
                    disabled={subbed}
                    // disabled={(tier.soldOut || currentPlan===tier.planID || (tier.name==='Free' && currentPlan))?true:false } 
                    className={cn(
                      'w-full text-black dark:text-white',
                      !tier.highlighted && !tier.featured
                        ? 'bg-gray-100 dark:bg-gray-600'
                        : 'bg-sky-300 hover:bg-sky-400 dark:bg-sky-600 dark:hover:bg-sky-700',
                        subbed? 'bg-white dark:bg-neutral-900 hover:bg-gray-200 dark:hover:bg-black' : 'hover:opacity-80 transition-opacity',
                    )}
                    variant={tier.highlighted ? 'default' : 'outline'}
                  >
                    {/* {tier.soldOut ? 'Sold out' : tier.cta} */}
                    {!loggedIn && 'Get Started'}
                    {/* {currentPlan&& ((currentPlan===tier.planID) ? 'Subscribed' : 'Subscribe')} */}
                    {loggedIn && (subbed ?"Subscribed":"Subscribe")}

                  </Button>
                </a>}
                <p className={cn(
                    true
                      ? 'text-gray-300 dark:text-gray-500'
                      : 'text-gray-700 dark:text-gray-400',
                    'mt-2 text-sm leading-6 ', //w-full flex flex-col items-center
                  )}>
                {(tier.name=="Pro" && user?.proPlan && user?.proPlan.subscriptionStatus=="active") && (<> {remaining} <span style={{textDecoration:"underline", cursor:"pointer", fontWeight:"bold"}} onClick={()=>manageSub(null, null)}>manage</span> </>)} 
                {/* {(tier.name=="Creator" && user?.creatorPlan && user?.creatorPlan.subscriptionStatus=="active") && ((user.creatorPlan.cancelled?"cancels in " : "renews in ")+ (Math.floor((new Date(user?.creatorPlan.stripeCurrentPeriodEnd).getTime() - new Date().getTime())/1000/86400))+" days")} */}
                </p>





              </div>
            )})}
          </div>
        {/* </div>
      </div> */}
          {/* <div className="w-full lg:w-auto mx-auto max-w-4xl lg:text-center">
            <h1 className="text-black dark:text-white text-4xl font-semibold max-w-xs sm:max-w-none md:text-4xl !leading-tight">
              Current Plan: Pro & Creator(Cancelling)
            </h1>
          </div>
          <div >
            <h1 >
              Manage subscription
            </h1>
          </div> */}

    </div>
    </>
  );
}