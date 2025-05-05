"use client";

import Head from 'next/head'
import Link from 'next/link';
import styles from './main.module.css'

import { useEffect, useState, useRef  } from 'react';
import MainLayout from './mainlayout';
// import AIImage from './ai-generated-image'
// import AITTS from './ai-tts'
import { SessionProvider } from 'next-auth/react';
import { useSession, signIn, signOut } from 'next-auth/react';
//import { auth, signIn, signOut } from "@/auth";
import FAQ from './faq'
// import Pricing from './pricing'
// import CreditsPage from './credits';
import PricingPage from './pricingpage2';
import { Button } from "@/components/ui/button"
export default function HomePage() {
  return (
    <SessionProvider>
        <Home/>
    </SessionProvider>
  );
}



function Home() {
  const [message, setMessage] = useState('');
  //const [loggedIn, setLoggedIn] = useState(false);
  // const [voice, setVoice] = useState('rogan');
  //const [authentication, setIsAuthenticated] = useState(false);
  const prompt = useRef("");  
  
  const { data: session, status } = useSession();
  var done = false;

  let stopScrolling = false;

  let prevScrollValue = -1;

  useEffect(() => {
    console.log("used effect")
    // const fetchData = async () => {
    //   const response = await fetch('/api/generateimage');
    //   const data = await response.json();
    //   setMessage(data.message);
    // };
    //fetchData();
    
    // const fetchData2 = async () => { 
    //   const response = await fetch('/api/generate-image', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ desc: 'Your image description here' }),
        
    //   });
    //   const data = await response.json();
    //   setMessage(JSON.parse(data.id).id.toString());
    // }

    // if(!done)
    //   fetchData2();
    // else console.log("already done");
    // done = true;

    // const checkAuthentication = async () => {
    //   'use server';
    //   const session = await auth();
    //   if (session) {
    //     setIsAuthenticated(true);
    //   }
    //   setIsLoading(false);
    // };

    // checkAuthentication();
    const scrollContainer = document.getElementById("scrollContainer");
    if(scrollContainer==null) return;

    // let scrollAmount = 0;
    
    function slowScroll() {
      if(prevScrollValue != -1 && prevScrollValue != scrollContainer.scrollLeft) return
      scrollContainer.scrollLeft += 1; // Move the content by 1px per frame

      // Check if we've reached the end of the scrollable content
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollLeft -=1; // Reset to the start
      }

      prevScrollValue = scrollContainer.scrollLeft;

      //console.log(scrollContainer.scrollLeft)
      // scrollElement.scrollLeft += 25;
  
      //console.log(scrollContainer.innerHTML);
  
      // Continue the scrolling
      //requestAnimationFrame(slowScroll);

      setTimeout(slowScroll, 30); 
    }

    //  // Define a common event handler
    //  const interactionHandler = (event) => {
    //   console.log(`User interacted with the section! Event type: ${event.type}`);
    //   // Place any additional logic you want here
    // };

    // // List of events to monitor for interaction
    // const interactionEvents = ['click', 'mouseenter', 'focus', 'scroll', 'input', 'keydown'];

    // // Add event listeners for each type of interaction
    // interactionEvents.forEach(eventType => {
    //   scrollContainer.addEventListener(eventType, interactionHandler);
    // });



  
    // Start the slow scrolling
    
    setTimeout(slowScroll, 3000); 
  }, []);

  const handleClick = () => {
    //setLoggedIn(true);
    //setVoice('musk');
  };



  //let prompt = "";

  const genTTS = () => {
    setMessage(prompt.current);
  }

  const handleInputChange = (input) => {

    console.log(input.target.value);
    prompt.current = input.target.value;
  };

  return ( 
    <MainLayout>
        <section className={styles.hero}>
          <h1>Generate Full Length Audiobooks with AI </h1>
          <p style={{marginBottom:"0.9rem"}}>Fully automatic content creation.</p>
          {/* {session&&status!="loading"&&<button className={styles.gradientButton}> <Link href="/dashboard">Go to Dashboard</Link></button>} */}
          {session&&status!="loading"&&<Link href="/dashboard"><Button size="lg">Go To Dashboard</Button></Link>}
          {/* {!session&&status!="loading"&&<><button className={styles.gradientButton} onClick={() => signIn(undefined, {callbackUrl:'/dashboard'})}>Get Started</button></>} */}
          {!session&&status!="loading"&&<><Button size="lg"  onClick={() => signIn(undefined, {callbackUrl:'/dashboard'})}>Try it out</Button></>}          
          
        </section>


        <section id="features" className={styles.features}>
          <h2 className={styles.h2}>Features</h2>
          <div className={styles.featureGrid}>
            {/* <div className={styles.feature}>
              <h3>Multiple Voices</h3>
              <p>Choose from a wide range of AI-generated voices</p>
            </div> */}
            <div className={styles.feature}>
              <h3>Choose any topic</h3>
              <p>Choose from a range of different topics or pick a custom one</p>
            </div>
            {/* <div className={styles.feature}>
              <h3>Unique Videos Every time</h3>
              <p>Get a different video every time for the same topic</p>
            </div> */}
            <div className={styles.feature}>
              <h3>No effort required</h3>
              <p>Create engaging audiobooks on autopilot</p>
            </div>

            <div className={styles.feature}>
              <h3>Multiple Voices</h3>
              <p>Choose from a wide range of high quality AI-generated voices</p>
            </div>
            {/* <div className={styles.feature}>
              <h3>Choose any topic</h3>
              <p>Choose from a range of different topics or pick a custom one</p>
            </div>
            <div className={styles.feature}>
              <h3>Real-time Preview</h3>
              <p>Listen to your text as you type</p>
            </div> */}
            <div className={styles.feature}>
              <h3>Unbeatable prices</h3>
              <p>Pay for what you need, far cheaper than the competition</p>
            </div>
          </div>
        </section>







        <section className={styles.features}>
            <h2 className={styles.h2}>Voices Available </h2>  

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 items-center align-center mt-4'>
              <div className='flex flex-col items-center'>
                <h3>Adam</h3>
                <audio controls>
                  <source src="am_adam.wav" type="audio/mpeg"/>
                </audio>
              </div>
              <div className='flex flex-col items-center'>
                <h3>Echo</h3>
                <audio controls>
                  <source src="am_echo.wav" type="audio/mpeg"/>
                </audio>
              </div>
              <div className='flex flex-col items-center'>
                <h3>Eric</h3>
                <audio controls>
                  <source src="am_eric.wav" type="audio/mpeg"/>
                </audio>
              </div>
              <div className='flex flex-col items-center'>
                <h3>Fenrir</h3>
                <audio controls>
                  <source src="am_fenrir.wav" type="audio/mpeg"/>
                </audio>
              </div>
              <div className='flex flex-col items-center'>
                <h3>George</h3>
                <audio controls>
                  <source src="bm_george.wav" type="audio/mpeg"/>
                </audio>
              </div>
              <div className='flex flex-col items-center'>
                <h3>Adam</h3>
                <audio controls>
                  <source src="am_adam.wav" type="audio/mpeg"/>
                </audio>
              </div>
              <div className='flex flex-col items-center'>
                <h3>Echo</h3>
                <audio controls>
                  <source src="am_echo.wav" type="audio/mpeg"/>
                </audio>
              </div>
              <div className='flex flex-col items-center'>
                <h3>Eric</h3>
                <audio controls>
                  <source src="am_eric.wav" type="audio/mpeg"/>
                </audio>
              </div>
              <div className='flex flex-col items-center'>
                <h3>Fenrir</h3>
                <audio controls>
                  <source src="am_fenrir.wav" type="audio/mpeg"/>
                </audio>
              </div>
              <div className='flex flex-col items-center'>
                <h3>George</h3>
                <audio controls>
                  <source src="bm_george.wav" type="audio/mpeg"/>
                </audio>
              </div>
            </div>
          
        </section>








        <section id="howitworks" className={styles.cta}>
          <h2 className={styles.h2}>How does it work?</h2>  
          <p>Step 1: Simply choose any topic</p>
          <p>Step 2: The AI automatically generates the script and audio for your audiobook.</p>
          {/* <p>Step 3: Post the video on TikTok, Youtube, Instagram etc.</p> */}
        </section>

        <section id="faq">
            <FAQ/>
        </section>

        {/* <section className={styles.cta}>
          {!session && status!="loading"&&
            <>
              <h2 className={styles.h2}>Ready to create your first video?</h2>
              <p style={{marginBottom:"0.6rem"}}>Get 2 free videos per week</p>
              <button className={styles.gradientButton} onClick={() => signIn(undefined, {callbackUrl:'/dashboard'})}>Get Started</button>
            </>
          }
        </section> */}
        
          <section id="pricing" className={styles.cta}>
              {/* {!session && <Pricing/> } */}
              {/* {session && <CreditsPage/> } */}
              {/* <Pricing/> */}
              {/* {status && status != "loading" && */}
                
              
              <PricingPage /*loggedIn={session&&status!="loading"}*//>
          </section>
        


    </MainLayout>       
  )
}