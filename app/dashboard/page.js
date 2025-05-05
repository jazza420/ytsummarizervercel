"use client";

import React, { useState, useEffect, useRef  } from 'react';
import { SessionProvider } from 'next-auth/react';
import MainLayout from '../mainlayout';
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from '../main.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faPlusCircle, faPhotoVideo, faChevronDown, faAngleDown, faCaretDown, faPlay, faLineChart, faRemove, faExclamationCircle, faArrowLeft, faRefresh, faCopy, faQuestionCircle, faCheckCircle, faDownload, faFilm, faCog, faThumbsUp, faThumbsDown, faPlayCircle, faCirclePlay, faTrash, faRandom} from '@fortawesome/free-solid-svg-icons';
// import CreditsPage from '../credits'
import Popup from '../popup'
import PricingPage from '../pricingpage2';
import ThemeProvider from '../themesprovider';
import Link from 'next/link';
import TikTok from '../tiktok/page'
import {redirectToTikTokAuth} from '../tiktok/redirect'
import Component from '../test';
// import {CreditsPage3} from '@/components/component/credits-page3'
import {VideoList} from '@/components/component/video-list'
import styles2 from '../pricingpage2.module.css';
import { cn } from '@/lib/utils';
import RefreshIcon from '@mui/icons-material/Refresh';
import { loadStripe, Stripe, StripeError } from '@stripe/stripe-js';
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
import BillingFAQ from '../billingfaq'
import SubInfo from '../subscriptionInfo'
import {allTopics, didYouKnowTopics, historyTopics, mysteryTopics, top5Topics, urbanLegendsTopics} from "../topics"
// import TikTokUploadTest from '../tiktok-upload'
import BookViewer from '../bookviewer'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {  LucideAudioWaveform, PlayCircleIcon, WandSparkles } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { CircleAlert, AudioLines, BookHeadphones} from 'lucide-react'
import { ItemText } from '@radix-ui/react-select';
import SubscriptionCard from '../subscriptioncard';
import { Sub } from '@radix-ui/react-dropdown-menu';


export default function DashboardPage() {
  //const [dashboardState, setDashboardState] = useState("view");
  return (
    <SessionProvider>
    <MainLayout is_dashboard={true} onCreditsButtonClicked={ () => {
        localStorage.setItem('dashboard_state', "billing");
        window.location.href = '/dashboard';
      }
      }>
        <Dashboard/>
    </MainLayout>
    </SessionProvider>
  );
}


function randomInt(max) {
  return Math.floor(Math.random()*(max)-0.0001)
}

function pickRandom(choices) {
  return choices[randomInt(choices.length)]
}


function Dashboard() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [isPortrait, setIsPortrait] = useState(true);
  
  const [createState, setCreateState] = useState("ready");
  const [popup, setPopup] = useState(null);
  // const myRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const [update, setUpdate] = useState(0);
  
  
  const getInitialState = () => {
    const savedState = localStorage.getItem('dashboard_state');
    return savedState ? savedState : 'create'; // 'default' is the fallback state if nothing is saved
  };

  const [dashboardState, setDashboardState] = useState(null);//useState(start_state);

  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    setRefreshKey(refreshKey + 1);
    fetchUserData();
  };


  useEffect(() => {
    if(dashboardState == null) {
      setDashboardState(getInitialState())
    }
    if(dashboardState && dashboardState != "billing" && dashboardState != "settings")
      localStorage.setItem('dashboard_state', dashboardState);
  }, [dashboardState]);

  // useEffect(() => {
  // }, [session]);

  useEffect(() => {
    fetchUserData();
  }, [session]);

  useEffect(( )=> {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);

    };
  }, [])

  const fetchUserData = async () => {
    if (session) {
        fetch("/api/get-user-credits")
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              console.error(data.message);
            } else {
              setUserData(data);
            }
          });
          console.log(JSON.stringify(session.user, null, 2));
      }
  }


  const manageSub = async (subscriptionId, stripePriceId) => {
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


const buyPlan = async (plan) => {
  
  const stripe = await stripePromise;

  // if(userData?.subscriptionStatus && userData.subscriptionStatus=="active") {
  //   manageSub(userData.subscriptionId, plan);
  //   return;
  // }

  const response = await fetch('/api/create-checkout-session-subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ planId: plan, customer: userData?.stripeCustomerId }),
  });

  const session = await response.json();

  // Redirect to Stripe Checkout
  const result = await stripe?.redirectToCheckout({ sessionId: session.id });

  if (result?.error) {
    console.error(result.error.message);
  }
  
}



  const getTotalCredits = () => {
    if (userData==null) return 0;
    return (userData.freeCredits ? userData.freeCredits:0)+(userData.proPlan?.credits ? userData.proPlan.credits:0)+(userData.creatorPlan?.credits ? userData.creatorPlan.credits:0);
  }

  const getAvailableCredits = () => {
    if (userData==null) return 0;
    return (userData.freeCredits ? userData.freeCredits:0)+(userData.proPlan?.credits ? 60:0)+(userData.creatorPlan?.credits ? 180:0);
  }


  const currentPlan = ((userData?.proPlan?.subscriptionStatus=="active") ? "Pro ":"") + " "+ ((userData?.creatorPlan?.subscriptionStatus=="active") ? (userData?.proPlan?.subscriptionStatus=="active" ? " & Creator" : "Creator"):"")



  return (
    <>  
    {popup && <Popup title={popup[0]} message={popup[1]} onClose={()=>setPopup(null)} buttons={popup[2]}/>}
    {/* <div
      className={cn('flex', styles2.fancyOverlay)}
    > */}
    <div className={styles.mainPage}>
    {(session && status!="loading" && userData) && (
      <div className={styles.sideBar}>
        <div>
          <div className={`${styles.sideBarIcon} ${styles.border} ${dashboardState == "create" ?styles.border2:""}`} onClick={()=>setDashboardState("create")}>
            <WandSparkles className="h-4 w-4" />
            {/* <FontAwesomeIcon icon={faPlusCircle} className={dashboardState == "create" ? styles.sideBarIconSelected: ""}/>  */}
            {!isPortrait && <div  className={styles.sideBarIconText}>Create</div>}
          </div>
          <div className={`${styles.sideBarIcon} ${styles.border} ${dashboardState == "view" ?styles.border2:""}`} onClick={()=>{setChosenVideo(null); setVideosPageNo(0); setDashboardState("view");}}>
            {/* <FontAwesomeIcon icon={faLineChart} className={dashboardState == "view" ? styles.sideBarIconSelected: ""}/>  */}
            <BookHeadphones className="h-4 w-4" />
            {!isPortrait && <div  className={styles.sideBarIconText}>My Audiobooks</div>}
          </div>
          
          <div className={`${styles.sideBarIcon} ${dashboardState == "billing" ?styles.border2:""}`} onClick={()=>setDashboardState("billing")}  >
            <FontAwesomeIcon icon={faCreditCard} className={dashboardState == "billing" ? styles.sideBarIconSelected: ""}/> 
            {!isPortrait && <div  className={styles.sideBarIconText}>Billing</div>} 
          </div>
          
          {/* <div className={`${styles.sideBarIcon} ${dashboardState == "settings" ?styles.border2:""}`} onClick={()=>setDashboardState("settings")}  >
          <FontAwesomeIcon icon={faCog} className={dashboardState == "settings" ? styles.sideBarIconSelected: ""}/> 
          {!isPortrait && <div  className={styles.sideBarIconText}>Settings</div>} 
          </div> */}




        </div>
        <div>
          {/* <div style={{marginLeft:"1.5rem"}}>50 credits</div>
        <div className={`${styles.sideBarIcon} ${dashboardState == "billing" ?styles.border2:""}`}  >
          <FontAwesomeIcon icon={faCreditCard} className={dashboardState == "billing" ? styles.sideBarIconSelected: ""}/> 
          {!isPortrait && <div  className={styles.sideBarIconText}>Sign Out</div>} 
        </div> */}
        </div>
      </div>)}
      
      <div className={styles.main2}>
        {/* <TikTok/> */}
        {(session && status!="loading" && userData) ? (
          <>
          
          {true && (
            <div>
              {/* <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
              <PricingPage/>
              </ThemeProvider> */}
              {/* <CreditsPage3/> */}
              {/* <CreditsPage/> */}
              {/* <div style={{padding:"5rem", paddingTop:"0.0rem"}}> */}
              {}
              {/* <h1 style={{fontSize:"2rem"}}>Current Plan: {(userData?.subscriptionStatus=="active") ? (userData?.stripePriceId === "price_1PxVJNGSOkYdeBqy3NqFj5Sg" ? "Pro" :"Creator") : "Free"} </h1> */}
              
              
              
              {/* <div style={{backgroundColor:"#181818", padding:"1rem"}}>
                <h1 style={{fontSize:"2rem"}}>Current Plan:  </h1>
                
                {(userData?.stripeCustomerId) && <button onClick={manageSub}>Manage subscriptions</button>}
              </div> */}
              {/* currentPlan={(userData?.stripePriceId&& userData?.subscriptionStatus=="active") ? userData?.stripePriceId : "free"}  */}
              {/* <SubInfo creditsRemaining={getTotalCredits()} creditsAvailable={getAvailableCredits()} currentSubscription={currentPlan} manageSub={manageSub} /> */}
             
                {/* <SubscriptionCard/> */}
              

              <PricingPage user={userData} buyPlan={buyPlan} loggedIn={true} manageSub={manageSub} />

              {/* <BillingFAQ/> */}

              {/* <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
              <stripe-pricing-table pricing-table-id=""
              publishable-key="pk_test_51PkSZNGSOkYdeBqyX93J969dpRdbhjJST85To35nhJ4Aomm3vi0WR5fkEq80Rdwu0Hfu6w6EBbosWBTXVZPp9AS700MDPiZatb"    customer-session-client-secret="">
              </stripe-pricing-table> */}

              </div>
              
            //  </div>
          )}

          </>
        ):
        <div style={{display: "flex", flexGrow:"1", flexDirection:"column", justifyContent:"center",  width:"100%"}}>
          <div className={styles.spinnerContainer} >
            <div className={styles.spinner} style={{width:"3rem", height:"3rem"}}></div>
          </div>
        </div>
        }

        
      </div>
    </div>
    {/* </div> */}
    </>   
  )
}

