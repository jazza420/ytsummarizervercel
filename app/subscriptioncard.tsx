"use client";

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
//import Button from '../ui/Button';
//import { useAuth } from '../../context/AuthContext';

 
export default function SubscriptionCard() {
  // const { user, isAuthenticated } = useAuth();
  // const { plan, subscribeToPlan, cancelSubscription, isProcessing } = null;
  const [isConfirmingCancel, setIsConfirmingCancel] = useState(false);
  const user = {
    isSubscribed: false,
    subscriptionEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Example date
  };

  const plan = {
    id: 'basic',
    name: 'Basic Plan',
    price: 9.99,
    interval: 'month',
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3',
    ],
  };
  
  // const handleSubscribe = async () => {
  //   try {
  //     await subscribeToPlan(plan.id);
  //   } catch (error) {
  //     console.error('Subscription error:', error);
  //     // In a real app, we would show a proper error message
  //   }
  // };
  
  // const handleCancelConfirm = async () => {
  //   try {
  //     await cancelSubscription();
  //     setIsConfirmingCancel(false);
  //   } catch (error) {
  //     console.error('Cancellation error:', error);
  //     // In a real app, we would show a proper error message
  //   }
  // };
  
  // if (!isAuthenticated) {
  //   return (
  //     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
  //       <p className="text-gray-600">Please log in to manage your subscription.</p>
  //     </div>
  //   );
  // }
  
  return (
    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-semibold ">{plan.name}</h3>
        <div className="mt-2 flex items-baseline">
          <span className="text-3xl font-bold tracking-tight ">${plan.price}</span>
          <span className="ml-1 text-sm font-semibold ">/{plan.interval}</span>
        </div>
      </div>
      
      <div className="px-6 py-5">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-blue-500" />
              </div>
              <p className="ml-3 text-sm ">{feature}</p>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="px-6 pb-6">
        {user?.isSubscribed ? (
          isConfirmingCancel ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Are you sure you want to cancel your subscription?</p>
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => setIsConfirmingCancel(false)}
                  // disabled={isProcessing}
                >
                  Keep Subscription
                </Button>
                <Button 
                  //variant="primary" 
                  // onClick={handleCancelConfirm}
                  // isLoading={isProcessing}
                >
                  Confirm Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-green-600 font-medium">You&apos;re currently subscribed!</p>
              {user.subscriptionEndsAt && (
                <p className="text-xs text-gray-500">
                  Renews on {new Date(user.subscriptionEndsAt).toLocaleDateString()}
                </p>
              )}
              <Button 
                variant="outline" 
                onClick={() => setIsConfirmingCancel(false)}
              >
                Manage Subscription
              </Button>
              <div>
                <button 
                  onClick={() => setIsConfirmingCancel(true)}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Cancel subscription
                </button>
              </div>
            </div>
          )
        ) : (
          <Button 
            // onClick={handleSubscribe} 
            //fullWidth 
            // isLoading={isProcessing}
          >
            Subscribe
          </Button>
        )}
      </div>
    </div>
  );
};

