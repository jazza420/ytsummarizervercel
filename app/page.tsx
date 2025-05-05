"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useSession, signIn, signOut } from 'next-auth/react';



export default function Home() {

  const { data: session, status } = useSession(); 

  return (
    <div className="flex flex-col gap-20 items-center justify-center">
      {/* Hero section */}
      <section className="pt-20 pb-16 bg-blue-50 dark:bg-blue-950/20 flex  w-full justify-center items-center">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl mx-auto">
            Enhance your browsing experience with ExtensionPro
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            The ultimate browser extension that supercharges your productivity and protects your privacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            {/* {!session && status !== "loading" && (
              <Button size="lg" onClick={() => signIn(undefined, {callbackUrl:'/billing'})}>
                Get Started
              </Button>
            )}
            {session && (
              <Button size="lg" asChild>
                <Link href="/billing">Get Started</Link>
              </Button>
            )} */}
            <Button size="lg" asChild>
                <Link href="/billing">Download for free</Link>
              </Button>
            {/* <Button size="lg" variant="outline" asChild>
              <Link href="/billing">View Pricing</Link>
            </Button> */}
          </div>
          <div className="mt-16 w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl">
            {/* <Image 
              src="https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg" 
              alt="Browser Extension Demo" 
              width={1200} 
              height={700} 
              className="w-full h-auto"
            /> */}
          </div>
        </div>
      </section>


      {/* Features section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Powerful Features
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Designed to enhance your browsing experience with the tools you need
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Privacy Protection',
                description: 'Block trackers and protect your personal data while browsing the web'
              },
              {
                title: 'Productivity Tools',
                description: 'Save time with shortcuts and automation for common browsing tasks'
              },
              {
                title: 'Custom Themes',
                description: 'Personalize your browsing experience with beautiful themes and layouts'
              },
              {
                title: 'Smart Bookmarking',
                description: 'Organize your favorite sites with intelligent categorization'
              },
              {
                title: 'Cross-Browser Sync',
                description: 'Keep your settings synchronized across all your devices'
              },
              {
                title: 'Performance Boost',
                description: 'Optimize page loading times and reduce browser resource usage'
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="p-6 rounded-lg border bg-card transition-all hover:shadow-md"
              >
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action section */}
      <section className="py-16 bg-blue-600 text-white w-full p-3">
        {/* <div className="container"> */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Ready to get started?</h2>
              <p className="mt-4">
                Join thousands of users who&apos;ve enhanced their browsing experience
              </p>
            </div>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/billing">Subscribe Now</Link>
            </Button>
          </div>
        {/* </div> */}
      </section>
    </div>
  );
}