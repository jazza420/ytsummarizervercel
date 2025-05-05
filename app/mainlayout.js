// app/layout.js

"use client";

import Link from 'next/link';
import Head from 'next/head';
import styles from './main.module.css';
// import { SessionProvider } from 'next-auth/react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import PricingPage from './pricingpage2';
// import StripeContainer from './checkout-form';
// import CheckoutButton from './checkout-button';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCreditCard, faPlusCircle, faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import "./scrollbar.css"

export default function MainLayout({ children, is_dashboard=false, onCreditsButtonClicked=null }) {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  
  

  useEffect(() => {
    // if(document)
    //   document.body.style.zoom = "86%";
    fetchUserData();


  }, [session]);
  
  useEffect(() => {
  }, [session]);

  const fetchUserData = async () => {
    if (session) {
        fetch("/api/get-user")
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              console.error(data.message);
            } else {
              setUserData(data);
            }
          });
          console.log(JSON.stringify(session, null, 2));
      }
  }


  const getTotalCredits = () => {
    return /*userData.credits+*/(userData.freeCredits ? userData.freeCredits:0)+(userData.proPlan?.credits ? userData.proPlan.credits:0)+(userData.creatorPlan?.credits ? userData.creatorPlan.credits:0);
  }

  
  return (
    // <SessionProvider>
    <div className={styles.container}>
      <Head>
        <title>VidSummarizer</title>
        <meta name="description" content="Summarize Youtube videos with AI" />
        <link rel="icon" href="logo.png" />
        <link rel="stylesheet" href="scrollbar.css"/>
      </Head>

      <header className={styles.header}>
      {/* <img  src="/logo.png" width="36"/> */}
        <Link href="/" ><div className={styles.logo}><div className={styles.logoTitle}>VidSummarizer</div><div className={styles.beta}>Beta</div></div></Link>
        <div className='flex flex-row gap-4'>
        <div>Settings</div>
        <div>Billing</div>
        </div>
        <nav>
          
          <ul>

            
            {session && 
              <>
              {userData&&is_dashboard &&<li><p onClick={()=>onCreditsButtonClicked()}>{getTotalCredits()} Credits</p></li>}
              
              {/* {userData&&is_dashboard &&<li><Link href="/creditspage">{userData.credits} Credits</Link></li>} */}
              {!is_dashboard &&<li><Link href="/dashboard">Dashboard</Link></li>}
              <li><p onClick={() => signOut({callbackUrl:'/'})}>Sign Out</p></li>
              <li><img src={session.user.image} className={styles.profileImage} width="34"></img></li>
              </>
            }

            {!session && status!="loading" && (
              <>
              <li><Link href="/#features">Features</Link></li>
              <li><Link href="/#pricing">Pricing</Link></li>
              <li><button className={styles.gradientButton} onClick={() => signIn(undefined, {callbackUrl:'/dashboard'})}>Sign In</button></li>
              </>
            )}

            {/*  */}
            {/*  */}
            
            
            {/* <li><Link href="/"><button className={styles.gradientButton}>Contact</button></Link></li> */}
            {/* {session && userData && (
              <>
              
              <li><Link href="/creditspage">{userData.credits} credits</Link></li>
              </>
            )} */}
            {/* {session && session.user.image && (
              <li><img src={session.user.image} className={styles.profileImage} width="34"></img></li>
            )}
            {!session && status!="loading" && (
              <li><button className={styles.gradientButton} onClick={() => signIn(undefined, {callbackUrl:'/dashboard'})}>Sign In</button></li>
            )} */}

          </ul>
        </nav>
      </header>

      {/* {status}
      {!session && status!="loading" && (
        <>
          <p>Please sign in to continue.</p>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )} */}

      <div class="flex items-center justify-center">
        <div class="w-1/2 p-8 mt-10 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Billing</h2>
          <PricingPage user={userData} loggedIn={true}  />
        </div>
      </div>


      {/* {children} */}
      
      {/* <div className={styles.mainPage}>
      {is_dashboard && 
        <div className={styles.sideBar}>
          <div className={`${styles.sideBarIcon} ${styles.border}`}><FontAwesomeIcon icon={faPlusCircle} /> {!isPortrait && <div  className={styles.sideBarIconText}>Create</div>}</div>
          <div className={`${styles.sideBarIcon} ${styles.border} ${styles.border2}`}><FontAwesomeIcon icon={faPhotoVideo} className={styles.sideBarIconSelected}/> {!isPortrait && <div  className={styles.sideBarIconText}>View</div>}</div>
          <div className={styles.sideBarIcon}><FontAwesomeIcon icon={faCreditCard} /> {!isPortrait && <div  className={styles.sideBarIconText}>Billing</div>} </div>
        </div>}
        
        <main className={styles.main2}>{children}</main>
      </div> */}



      <footer className={styles.footer}>
        
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4>VidSummarizer.app</h4>
            <p>Summarize Youtube videos with AI</p>
          </div>
          <div className={styles.footerSection}>
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/#features">Features</Link></li>
              <li><Link href="/#pricing">Pricing</Link></li>
              {/* <li><Link href="/contact">Contact</Link></li> */}
              <li><Link href="/#faq">FAQ</Link></li>
              <li><Link href="/privacypolicy">Privacy Policy</Link></li>
              <li><Link href="/termsofservice">Terms of Service</Link></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4>Contact</h4>
            <ul>
            <li>Email: info@VidSummarizer.app</li>
            <li>Discord: jazza3050</li>
            </ul>
          </div>
        </div>
        <div className={styles.copyright}>
          © 2024 VidSummarizer.app
        </div>
        
      </footer>
    </div>
    // </SessionProvider>
  );
}

