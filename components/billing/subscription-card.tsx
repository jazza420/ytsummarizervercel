"use client";

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

interface SubscriptionCardProps {
  onSubscribe: () => void;
}

export function SubscriptionCard({ onSubscribe }: SubscriptionCardProps) {
  const benefits = [
    "All "+process.env.NEXT_PUBLIC_APPNAME+" extension features",
    "Faster response times",
    "Unlimited usage"
  ];

  return (
    <Card className="border-2 border-blue-200 dark:border-blue-800 transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle>Premium Plan</CardTitle>
        <div className="flex items-baseline mt-2">
          <span className="text-3xl font-bold">$4.99</span>
          <span className="text-muted-foreground ml-1">/monthly</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 mt-4">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={onSubscribe}
          size="lg"
        >
          Subscribe
        </Button>
      </CardFooter>
    </Card>
  );
}