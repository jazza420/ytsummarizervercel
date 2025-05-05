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
import { Check, AlertCircle } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SubscriptionManagementProps {
  onCancel: () => void;
  nextBillingDate: Date;
}

export function SubscriptionManagement({ onCancel, nextBillingDate }: SubscriptionManagementProps) {
  //const nextBillingDate = new Date();
  // nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
  
  const formattedDate = nextBillingDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="border-2 border-blue-200 dark:border-blue-800 transition-all">
      <CardHeader>
        <CardTitle>Premium Plan</CardTitle>
        <CardDescription>
          Your subscription is active
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-1">Subscription Status</h3>
          <div className="flex items-center">
            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm px-2.5 py-0.5 rounded-full flex items-center">
              <Check className="h-3.5 w-3.5 mr-1" />
              Active
            </span>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-1">Billing Period</h3>
          <p className="text-muted-foreground">Monthly</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-1">Next Billing Date</h3>
          <p className="text-muted-foreground">{formattedDate}</p>
        </div>
        
        {/* <div>
          <h3 className="text-sm font-medium mb-1">Payment Method</h3>
          <div className="flex items-center">
            <div className="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded mr-2"></div>
            <p className="text-muted-foreground">•••• •••• •••• 4242</p>
          </div>
        </div> */}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        {/* <Button className="w-full" variant="outline">
          Update Payment Method
        </Button> */}
        <Button className="w-full" variant="outline" onClick={onCancel}>
          Manage Subscription
        </Button>
        {/* <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="w-full" variant="outline">
              Manage Subscription
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel Subscription?</AlertDialogTitle>
              <AlertDialogDescription>
                Your subscription will remain active until the end of your current billing period on {formattedDate}. After that date, you will lose access to premium features.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
              <AlertDialogAction onClick={onCancel}>
                Confirm Cancellation
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog> */}
      </CardFooter>
    </Card>
  );
}