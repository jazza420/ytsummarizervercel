"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useSession, signIn, signOut } from 'next-auth/react';
import { SubscriptionCard } from '@/components/billing/subscription-card';
import { FreeCard } from '@/components/billing/free-card';


export default function Home() {

  const { data: session, status } = useSession(); 

  return (
    <div className="flex flex-col gap-20 items-center justify-center">
      {/* Hero section */}
      <section className="pt-20 pb-16 bg-blue-50 dark:bg-blue-950/20 flex  w-full justify-center items-center">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl mx-auto">
            {/* Enhance your browsing experience with VidSkip */}
            Easily summarize youtube videos with AI
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            VidSkip is a browser extension that uses AI to summarize YouTube videos, 
            making it easier for you to get the information you need quickly and efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            {/* {!session && status !== "loading" && (
              <Button size="lg" onClick={() => signIn(undefined, {callbackUrl:'/billing'})}>
                Get Started
              </Button>
            )}*/}
            {session && (
              <Button size="lg" asChild>
                <Link href="/billing">Dashboard</Link>
              </Button>
            )} 
            <Button size="lg" asChild>
                <Link href="/billing">Download for free</Link>
              </Button>
            {/* <Button size="lg" variant="outline" asChild>
              <Link href="/billing">View Pricing</Link>
            </Button> */}
          </div>
          <div className="mt-16 w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-xl">
            <Image 
              src="/demo.png" 
              alt="Browser Extension Demo" 
              width={800} 
              height={600} 
              className="w-full h-auto"
            />
             {/* <video controls>
                <source src="/demo.mkv" type="video/mp4" />
              </video> */}
          </div>
        </div>
      </section>


      {/* Features section */}
      <section className="py-20" id="features">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Powerful Features
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              VidSkip offers a range of features to enhance your YouTube experience, 
              making it easier to find the content you want and save time while browsing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'AI-Powered Summaries',
                description: 'Get concise summaries of YouTube videos using advanced AI algorithms.',
              },
              {
                title: 'Customizable Settings',
                description: 'Adjust the summary length and style to fit your preferences.',
              },
              {
                title: 'Seamless Integration',
                description: 'Easily integrate with your existing YouTube experience without any hassle.',
              },
              {
                title: 'Multi-Language Support',
                description: 'Summarize videos in multiple languages, making it accessible for everyone.',
              },
              {
                title: 'User-Friendly Interface',
                description: 'Enjoy a clean and intuitive interface that makes summarizing videos a breeze.',
              },
              {
                title: 'Powered by GPT-4',
                description: 'Utilizing the latest advancements in AI technology to provide accurate and relevant summaries.',
              },
              {
                'title': 'Unlimited Access',
                'description': 'Get unlimited access to all features and updates with a single subscription.',
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

      <section className="py-20 mb-20" id="demo">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Demo Video
            </h2> 
          </div>
          <div className="mt-16 w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl">
             <video controls>
                <source src="/demo.mkv" type="video/mp4" />
              </video>
          </div>
        </div>
      </section>

      <section className="py-20 mb-48" id="pricing">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Pricing
            </h2> 
            <p className="mt-4 text-lg text-muted-foreground">
              Choose a plan that fits your needs. No hidden fees, no surprises.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/*<div className="p-6 rounded-lg border bg-card transition-all hover:shadow-md">
               <h3 className="text-xl font-medium mb-2">Free Plan</h3>
              <div className="flex items-baseline mt-2">      

                <span className="text-3xl font-bold">Free</span>
                <span className="text-muted-foreground ml-1">/monthly</span>
              </div>    

              <p className="text-muted-foreground mt-4">Limited features with ads</p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Basic AI Summaries</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Limited Video Length</span>
                </li>
                <li className="flex items-start"> 
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Ads</span>
                </li>
              </ul>
              <Button
                className="w-full mt-4"     

                variant="outline"
                size="lg"     

                    
                onClick={() => signIn(undefined, {callbackUrl:'/billing'})}
              >
                Get Started
              </Button>
            </div>    */}
            <FreeCard onSubscribe={null}/>
            {/* {session ? <FreeCard onSubscribe={null}/> : <FreeCard onSubscribe={() => {signIn(undefined, {callbackUrl:'/billing'})}}/>} */}
            <SubscriptionCard onSubscribe={session?()=>{window.location.href='/billing'}:() => {signIn(undefined, {callbackUrl:'/billing'})}}/> 

          </div>
        </div>
      </section>


      {/* Call to action section */}
      
    </div>
  );
}


//<section className="py-16 bg-blue-600 text-white w-full p-3">
//  {/* <div className="container"> */}
//    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
//      <div>
//        <h2 className="text-3xl md:text-4xl font-bold">Ready to get started?</h2>
//        <p className="mt-4">
//          Join thousands of users who are already saving time and enhancing their YouTube experience with VidSkip.
//        </p>
//      </div>
//      <Button size="lg" variant="secondary" asChild>
//        <Link href="/billing">Subscribe Now</Link>
//      </Button>
//    </div>
//  {/* </div> */}
//</section>