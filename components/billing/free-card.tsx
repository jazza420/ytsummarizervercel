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

interface FreeCardProps {
  onSubscribe: () => void;
}

export function FreeCard({ onSubscribe }:  {onSubscribe:(() => void) | null}) {
  const benefits = [
    "Basic "+process.env.NEXT_PUBLIC_APPNAME+" extension features",
    "5 summaries per day",
  ];

  return (
    <Card className="border-2  transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle>Free Plan</CardTitle>
        <div className="flex items-baseline mt-2">
          <span className="text-3xl font-bold">Free</span>
          <span className="text-muted-foreground ml-1">/monthly</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 mt-4 mb-9">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {onSubscribe&& <Button 
          className="w-full" 
          onClick={onSubscribe}
          size="lg"
          variant="outline"
        >
          Get Started
        </Button>}
      </CardFooter>
    </Card>
  );
}