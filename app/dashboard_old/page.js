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
// const topics = [
//   "Custom Topic",
//   "Random Topic",
//   "Interesting History",
//   "Mystery",
//   "Creepy Reddit Story",
//   "Interesting & Unique Facts",
//   "Life Pro Tips",
//   "Random Animal",
//   "Top 5 Video",
//   "Did You Know?",
//   "Urban Legend",
//   "Health and Wellness",
//   "Space",
//   "Cats"
// ];

// const characterNames = ["Elon", "Joe Rogan", "Neil De Grasse Tyson", "Kanye", "David Goggins", "Ben Shapiro", "Donald Trump", "Dr Phil", "Mr Beast"]
// const characters = ["elon", "rogan", "neil", "kanye", "goggins", "shapiro", "trump", "dr_phil", "mr_beast"]
// const characterThumbs = ["elon.png", "rogan.png", "neil.png", "kanye.png", "goggins.png", "shapiro.png", "trump.png", "dr_phil.png", "mr_beast.png"]
// const gameplayThumbs = ["minecraft.png", "subway.jpg", "gta.png"]
// const gameplays = ["minecraft", "subway", "gta"]


const voices = ["David", "Alloy", "Aoede", "Bella", "Jessica", "Kore", "Nicole", "Nova", "River", "Sarah", "Sky", "Adam", "Echo", "Eric", "Fenrir", "Liam", "Michael", "Onyx", "Puck", "Alice", "Emma", "Isabella", "Lily", "Daniel", "Fable", "George", "Lewis"]

const voicesID = ["david", "af_alloy", "af_aoede", "af_bella", "af_jessica", "af_kore", "af_nicole", "af_nova", "af_river", "af_sarah", "af_sky", "am_adam", "am_echo", "am_eric", "am_fenrir", "am_liam", "am_michael", "am_onyx", "am_puck", "bf_alice", "bf_emma", "bf_isabella", "bf_lily", "bm_daniel", "bm_fable", "bm_george", "bm_lewis"];


// const voices = ["Adam", "Luna", "Gus", "Mike", "Neil", "David", "Elon", "Asteria", "Orpheus", "Angus", "Arcas", "Athena", "Helios", "Hera", "Orion", "Perseus", "Stella", "Zeus"];
// const voicesID = ["eleven4.wav", "model=aura-luna-en", "gus.wav", "mike.wav", "tyson.wav", "attenb.wav", "elon2.wav", "model=aura-asteria-en", "model=aura-orpheus-en", "model=aura-angus-en", "model=aura-arcas-en", "model=aura-athena-en","model=aura-helios-en","model=aura-hera-en","model=aura-orion-en","model=aura-perseus-en","model=aura-stella-en","model=aura-zeus-en"] 

const tts_books_samples = ["eleven3.wav", "luna.mp3", "gus.wav", "mike.wav", "tyson.wav", "attenb.wav", "elon2.wav"]


// const music = ["Track 1", "Track 2", "Track 3", "Track 4", "Track 5", "Track 6", "Track 7"];
// const music_files = ["13.mp3", "crystalcastle.mp3", "cornfieldchase2.mp3",  "HauntingEchoes.wav", "snowfall.mp3", "poolroom.mp3", "LifeProTips.mp3"]

const lengthOptionsMinutes = [10, 20, 30, 60, 120, 180, 240, 300]
const lengthOptions = ["10 minutes", "20 minutes", "30 minutes", "1 hour", "2 hours", "3 hours", "4 hours", "5 hours"]


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
  const prompt = useRef("");
  const [isPortrait, setIsPortrait] = useState(true);
  
  const [createState, setCreateState] = useState("ready");
  const [popup, setPopup] = useState(null);
  const [chosenVideo, setChosenVideo] = useState(null);
  const [videosPageNo, setVideosPageNo] = useState(0);
  // const myRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [moreOptions, setMoreOptions] = useState(false);
  const [videoLength, setVideoLength] = useState("10 minutes");
  const [topic, setTopic] = useState("Julius Caesar");
  const [imageStyle, setImageStyle] = useState("Cinematic");
  const [topicSelectBoxValue, setTopicSelectBoxValue] = useState("Select Topic");
  const [characterSelectBoxValue, setCharacterSelectBoxValue] = useState("Rogan");
  const [voiceSelectBoxValue, setVoiceSelectBoxValue] = useState("Adam");
  const [musicSelectBoxValue, setMusicSelectBoxValue] = useState("Track 1");
  const [update, setUpdate] = useState(0);
  const [videoScript, setVideoScript] = useState("Hello World")
  const [selectedCharacter, setSelectedCharacter] = useState(0);
  const [selectedGameplay, setSelectedGameplay] = useState(0);
  const [tiktokFormat, setTikTokFormat] = useState(false)
  const [audio, setAudio] = useState(null);
  
  const getInitialState = () => {
    const savedState = localStorage.getItem('dashboard_state');
    return savedState ? savedState : 'create'; // 'default' is the fallback state if nothing is saved
  };

  const [dashboardState, setDashboardState] = useState(null);//useState(start_state);

  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };

  // const [inputValue, setInputValue] = useState("");
  // const [suggestions, setSuggestions] = useState([]);
  // const [isFocused, setIsFocused] = useState(false);



  const pageSize = 5;

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setInputValue(value);

  //   if (value) {
  //     // const filteredSuggestions = fruits.filter((fruit) =>
  //     //   fruit.toLowerCase().startsWith(value.toLowerCase())
  //     // );
  //     setSuggestions([]);
  //   } else {
  //     setSuggestions(fruits); // Show all suggestions if the input is empty
  //   }
  // };

  // const handleSuggestionClick = (suggestion) => {
  //   setInputValue(suggestion);
  //   setSuggestions([]);
  // };

  // const handleFocus = () => {
  //   setIsFocused(true);
  //   setSuggestions(fruits); // Show all suggestions when the input is focused
  // };

  // const handleBlur = () => {
  //   setTimeout(() => {
  //     setIsFocused(false);
  //     setSuggestions([]); // Hide suggestions when the input loses focus
  //   }, 300); // Delay to allow click event to register
  // };


  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    setRefreshKey(refreshKey + 1);
    fetchUserData();
  };


  useEffect(() => {
    if(dashboardState == null) {
      setDashboardState(getInitialState())
      setAudio(new Audio()) 
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

  const chooseVideo = (video) => {
    setChosenVideo(video);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  const generateAudio = async (book_id, voice) => {
    try {
      const response = await fetch('/api/generate-audio', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ book_id, voice})
      });

      const data = await response.json();
      console.log(JSON.stringify(data));

      if(response.status == 200) {
        // setPopup(["Success", data.message, null ]);
      } else {
        setPopup(["Failed", data.message, null ]);
      }

      await fetchUserData();
    } catch (error) {
      setPopup(["Error", "Sorry but something went wrong. Try again later."+error]);
    }
  }



  const createVideo = async () => {
    //if(topicSelectBoxValue=="Select Topic" || (topicSelectBoxValue=="Custom Topic" && prompt.current == "")) return;
    if(videoScript == "") return;
    setCreateState("loading");
    try {
      // let topic = topicSelectBoxValue=="Custom Topic" ? prompt.current : topicSelectBoxValue;
      
      
      // if(topic == "Random Topic") {
      //   topic = pickRandom(pickRandom(allTopics))
      // }

      // const response = await fetch('/api/create-booksbook', {
      //     method: 'POST',
      //     headers: {
      //     'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({ topic: topic, voice: voicesID[voices.indexOf(voiceSelectBoxValue)], length: videoLength, music: music_files[music.indexOf(musicSelectBoxValue)]})
      // });
    
      const response = await fetch('/api/generate-audiobook', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({ topic: topic, voice: voicesID[voices.indexOf(voiceSelectBoxValue)], length: lengthOptionsMinutes[lengthOptions.indexOf(videoLength)]})
      });


      const data = await response.json();
      console.log(JSON.stringify(data));
      
      if(response.status == 200) {
        setPopup(["Success", data.message, [["Go To Audiobook", ()=>{setPopup(null); setChosenVideo(data.id); setDashboardState("view")}]] ]);
      } else {
        setPopup(["Failed", data.message, response.status == 403 ?  [["Upgrade Plan", ()=>{setPopup(null); setDashboardState("billing")}]] : null ]);
      }

      await fetchUserData();
    } catch (error) {
      setPopup(["Error", "Sorry but something went wrong. Try again later."+error]);
    }
    setCreateState("ready");
  }

  const handleInputChange = (input) => {

    console.log(input.target.value);
    prompt.current = input.target.value;

  };


  const handleLengthChange = (value) => {
    if (lengthOptions.indexOf(value)>1 && !(userData?.proPlan?.subscriptionStatus=="active") ) {
      // window.alert("Sorry only 10 minutes is available on the free plan");
      setPopup(["", "Sorry a maximum of 20 minutes is available on the free plan",  [["Upgrade Plan", ()=>{setPopup(null); setDashboardState("billing")}]]]);
      return
    }
    setVideoLength(value);
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





  const uploadTikTok = async (video_link, title, privacy_level, disable_comment, brand_content_toggle, brand_organic_toggle) => {
    const response = await fetch('/api/tiktok-video-upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ video_link: video_link, title: title, privacy_level: privacy_level, disable_comment: disable_comment, brand_content_toggle: brand_content_toggle, brand_organic_toggle: brand_organic_toggle }),
    });

    if(response.status == 200) {
      const data = await response.json();
      console.log(JSON.stringify(data));
      setPopup(["Success", data.message, null ]);
      //redirectToTikTokAuth();
    } else {
      redirectToTikTokAuth();
      //setPopup(["Failed", data.message, null ]);
    }
  }







  









  // const goToCreatePage = (topic, voice="Adam", music_choice=null, length=25, moreOptions=false) => {
  //   setDashboardState("create");
  //   const defaultTopic = topics.includes(topic);
  //   setTopicSelectBoxValue(defaultTopic?topic:"Custom Topic")
  //   if(!defaultTopic) prompt.current = topic;

  //   if(music_choice&&music_choice!="default") {
  //     let mid = music_files.indexOf(music_choice);
  //     setMusicSelectBoxValue(music[mid?mid:0]);
  //   } else {
  //     setMusicSelectBoxValue("Auto");
  //   }

  //   setVoiceSelectBoxValue(voice);
  //   setVideoLength(length);
  //   setMoreOptions(moreOptions);

  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // }


  const getRandomTopic = () => {
    prompt.current = pickRandom(pickRandom(allTopics));//historyTopics[Math.floor(Math.random()*(historyTopics.length)-0.0001)];
    setUpdate(update+1);
  }

  const getTotalCredits = () => {
    if (userData==null) return 0;
    return (userData.freeCredits ? userData.freeCredits:0)+(userData.proPlan?.credits ? userData.proPlan.credits:0)+(userData.creatorPlan?.credits ? userData.creatorPlan.credits:0);
  }

  const getAvailableCredits = () => {
    if (userData==null) return 0;
    return (userData.freeCredits ? userData.freeCredits:0)+(userData.proPlan?.credits ? 60:0)+(userData.creatorPlan?.credits ? 180:0);
  }





  // let currentPlan = '';
  // if(userData?.subscriptionId) {
  //   if(userData.subscriptionId === )
  // }
  
  const videos = [];
  const generatingVideos = [];
  const videoList = [];
  let currentVideo = null;
  let latestVideo = null;
  
  if(userData && userData.books) {
    // if (chosenVideo == null) {
      userData.books.forEach((item, index) => {
        //if(chosenVideo == null) setChosenVideo(item.id)

        latestVideo = item.id;

        // let formattedDate = new Date(item.createdAt).toLocaleDateString('en-US', {
        //   month: '2-digit',
        //   year: '2-digit'
        // }).replace('/', '-').replace('/', '-');

        

        // let script = "";

        // if(item.script) {
        //   var lines = item.script.replace(/\*\*/g, '').split("\n");
        //   // console.log(lines)
        //   lines.forEach( (item2, index2) => {
        //     // console.log(item2.replace(/"/g, "") + "\r\n")
        //     if(item2.toLowerCase().startsWith("narrator:"))
        //       script += item2.replace(/"/g, "").replace(/Narrator: /g, "") + "\r\n"; 

        //   })
        // }

        // script = item.script;

        const book = {
          id: item.id,
          title: item.title, 
          chapters: item.chapters,
          status: item.status,
          length: item.length,
          voice: item.voice,
          audioStatus: item.audioStatus,
          audioLink: item.audiolink,
          status: item.status,
          createdDate: new Date(item.createdAt),
          thumb: item.thumb,
          audioCreated: new Date(item.audioCreated),
          about: item.about,
          audioStatus: item.audioStatus
        }

        if(book.id)
          videoList.push(book);

        if((index < userData.books.length-(pageSize*(videosPageNo+1)) || index >= userData.books.length-(pageSize*(videosPageNo))) && item.id!=chosenVideo) return;

        // console.log(item);
        // if(index == userData.books.length-1) {
        //   currentVideo = <VideoCard /*key={video.script}*/ refresh={refresh} key={video.video} video={video} chooseVideo={setChosenVideo}/>
        // }
        if(book.id==chosenVideo) {
          //videos.push(
            // <VideoCard /*key={video.script}*/ refresh={refresh} key={video.video} video={video} chooseVideo={setChosenVideo}/>
            
          //); 
          currentVideo = <BookViewer /*key={video.script}*/ refresh={refresh} key={book.id}  book={book} chooseVideo={chooseVideo} uploadTiktok={uploadTikTok} isPortrait={isPortrait} goToCreatePage={null} setPopup={setPopup} generateAudio={generateAudio}/>
        }
        //
        // if(book.id) {
        //   if(video.video)
        //     videos.push(
        //       <CreatedVideoItem key={index} video={video} chooseVideo={chooseVideo}/>
        //     );
        //   else
        //     generatingVideos.push(
        //       <CreatedVideoItem key={index} video={video} chooseVideo={chooseVideo}/>
        //     );
        // }
        
        
        // videos.push(
        //   <div  key={item.id}>
        //     <p>{item.title}</p>
        //     <video controls width="250">
        //       <source src={`https://videos24238746.s3.amazonaws.com/${formattedDate}/${item.id}/final_output${item.id.substring(0,7)}.mp4`} type="video/mp4" />
        //     </video>
        //   </div>
        // );
    });
    videos.reverse();
    videoList.reverse();
    // }
    // else {
    //   userData.books.forEach((item, index) => {})
    //   videos.push(
    //     <VideoCard video={chosenVideo} chooseVideo={chooseVideo} />
    //   );
    // }
  }

  const currentPlan = ((userData?.proPlan?.subscriptionStatus=="active") ? "Pro ":"") + " "+ ((userData?.creatorPlan?.subscriptionStatus=="active") ? (userData?.proPlan?.subscriptionStatus=="active" ? " & Creator" : "Creator"):"")

  // const characterButtons = []
  // characterThumbs.forEach((item, index) => {
  //   characterButtons.push(<div class={`overflow-hidden rounded-lg cursor-pointer ${selectedCharacter==index?"border-4 border-white":""}`}>
  //     <img src={item} alt="Image 1" class="w-full h-full object-cover" onClick={()=>{setSelectedCharacter(index)}}/>
  //   </div>)
  // });

  // const gameplayButtons = []
  // gameplayThumbs.forEach((item, index) => {
  //   gameplayButtons.push(<div class={`overflow-hidden rounded-lg cursor-pointer ${selectedGameplay==index?"border-4 border-white":""}`}>
  //     <img src={item} alt="Image 1"  class="w-full h-full object-cover" onClick={()=>{setSelectedGameplay(index)}}/>
  //   </div>)
  // });


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
          {dashboardState=="create" && (

              <div className={styles.createVideoPage}>

                {/* <h4 className={styles.h5}>customize your desired short</h4> */}

                <div className={styles.createVideo}>
                  <h2 className={styles.h2} style={{marginBottom:"0.3rem"}}>Create an Audiobook</h2>
                  {/* <p>Welcome, {session.user.name}!</p>  */}
                  {/* <p style={{marginTop:"0.3rem", marginBottom:"0.4rem"}}>Which character do you want?</p> */}
                  {/* <p style={{marginTop:"1rem", marginBottom:"0rem"}}>Choose a topic that you would like to generate a video of</p> */}
                  {/* <input onChangeCapture={handleInputChange} className={styles.inputBox} value={inputValue}
                    onChange={handleChange}  onFocus={handleFocus} onBlur={handleBlur} style={{ cursor: "pointer" }}/> 
                  {isFocused && suggestions.length > 0 && (
                    <ul style={{ border: "1px solid #ccc", listStyleType: "none", padding: 0, margin: 0 }}>
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          style={{ padding: "8px", cursor: "pointer" }}
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )} */}
                  {/* <br/> */}
                  {/* <p>Choose a custom topic</p> */}
                  {/* 
                  <p>Choose a voice</p>
                  <input onChangeCapture={handleInputChange} className={styles.inputBox}></input>

                  <p>Video length</p>
                  <input onChangeCapture={handleInputChange} className={styles.inputBox}></input> */}
                  {/* <div className={styles.dropdown}>
                    <button onClick={toggleDropdown} className={styles.dropdownbutton}>

                        Custom Topic <FontAwesomeIcon icon={faCaretDown} style={{marginLeft: "5rem"}}/> 

                    </button>
                    {isOpen && (
                      <ul className={styles.dropdownmenu}>
                        <li className={styles.dropdownitem} onClick={toggleDropdown}>Option 1</li>
                        <li className={styles.dropdownitem} onClick={toggleDropdown}>Option 2</li>
                        <li className={styles.dropdownitem} onClick={toggleDropdown}>Option 3</li>
                      </ul>
                    )}
                  </div> */}
                  <div className="space-y-5">
                    {/* <Label htmlFor="readonly-textarea3">
                      <div className="flex flex-row gap-1">Suggested Caption 

                        <div className={styles.tooltip}> <CircleAlert className="h-4 w-4" /> <span>Suggested auto generated caption</span></div>

                        <div className={styles.tooltip}> <Copy onClick={() => {navigator.clipboard.writeText(video.description) }} className=" h-4 w-4 cursor-pointer" /> <span>Copy Caption</span></div> 
                        
                      </div>
                    </Label> */}

                    {/* <input key={update} onChangeCapture={handleInputChange} placeholder="Enter your custom topic or click randomize" className={styles.inputBox} defaultValue={prompt.current}></input> */}
                    {/* <p style={{marginTop:"0.3rem", marginBottom:"0.4rem"}}>Which character do you want?</p> */}
                    {/* <div className="space-y-2">
                    <Label>Which character do you want?</Label>
                    <div class="grid grid-cols-5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                    {characterButtons}
                    </div>
                    </div> */}

                    {/* <div className="space-y-2">
                    <Label>Choose a Title</Label>
                    <Input
                      // id="readonly-textarea3"
                      onChange={(e) => setTopic(e.target.value)}
                      value={topic}
                      // className="resize-none text-muted-foreground"
                      // rows={3}
                      
                    /> 
                    </div> */}
                    
                    <div className="space-y-2">
                    <Label>What would you like your audiobook to be about?</Label>
                    <Input
                      // id="readonly-textarea3"
                      onChange={(e) => setTopic(e.target.value)}
                      value={topic}
                      // className="resize-none text-muted-foreground"
                      // rows={3}
                      
                    />
                    </div>
                    
                    <div className="space-y-2">
                    <Label>How long would you like it to be?</Label>
                    <Select value={videoLength}  onValueChange={handleLengthChange}>
                      <SelectTrigger id="length" >
                        <SelectValue placeholder="Choose A Length" />
                      </SelectTrigger>
                      <SelectContent >
                        {lengthOptions.map((option) => (
                          <SelectItem key={option} value={option}  >
                            <div  className='flex flex-row items-center gap-1 '>{option} </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>          
                    </div>  



                    <div className="space-y-2 ">
                      <Label>Which voice would you like?</Label>
                      
                      <div  className="flex flex-row items-center  gap-2 ">
                        
                        <Select value={voiceSelectBoxValue}  onValueChange={setVoiceSelectBoxValue}>
                          <SelectTrigger id="voice" >
                            <SelectValue placeholder="Choose A Voice.." />
                          </SelectTrigger>
                          <SelectContent >
                            {voices.map((option) => (
                              <SelectItem key={option} value={option}  >
                                <div  className='flex flex-row items-center gap-1 '>{option} </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <AudioLines onClick={()=>{
                          audio.src = voicesID[voices.indexOf(voiceSelectBoxValue)]+".wav";
                          audio.play();
                          audio.volume=0.4;
                        }}/> 
                      </div>
                        
                           
                    </div>  


                    <div className="space-y-2 ">
                      {/* <div className="flex items-center space-x-3 justify-start">
                      <Label htmlFor="tiktok-format">Use TikTok Format</Label>
                      <Switch
                        id="tiktok-format"
                        checked={tiktokFormat}
                        onCheckedChange={(checked) => {
                          setTikTokFormat(checked)
                        }}
                        
                      />
                      </div> */}
                      
                      {tiktokFormat &&

                      <Card className="p-4 space-y-2 bg-muted">
                        {/* <div className="text-sm flex flex-row items-center">
                        <CircleAlert className=" h-4 w-4 mr-1 " color='#aaaaffff' /> Your video will be labeled &quot;Promotional content&quot;. This cannot be changed once the video is posted.
                        </div> */}
                        <Label>What gameplay do you want?</Label>
                        <div class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-4">
                        {gameplayButtons}
                        </div>
                      </Card>
                      }
                    </div>

                    

                    {/* <SelectBox currentOption={topicSelectBoxValue} options={characters} setSelectBoxOption={setTopicSelectBoxValue}/> */}
                  

                  {/* <SelectBox currentOption={topicSelectBoxValue} options={topics} setSelectBoxOption={setTopicSelectBoxValue}/> */}

                  {/* {topicSelectBoxValue == "Custom Topic" && <div className={styles.horizontalDiv}><input key={update} onChangeCapture={handleInputChange} placeholder="Enter your custom topic or click randomize" className={styles.inputBox} defaultValue={prompt.current}></input> <Button onClick={getRandomTopic} variant="secondary" style={{padding:"1.4rem 1.0rem"}}><FontAwesomeIcon icon={faRandom}/></Button></div>} */}
                  {/* <p style={{marginTop:"1.2rem"}}>Who do you want to narrate the video?</p>
                    <SelectBox currentOption={voiceSelectBoxValue} options={voices} audios={tts_books_samples} setSelectBoxOption={setVoiceSelectBoxValue}/>  */}
                  
                  {moreOptions &&
                    <>
                    
                    <p style={{marginTop:"1.2rem"}}>What kind of music would you like?</p>
                    <SelectBox currentOption={musicSelectBoxValue} options={music} books={music_files} setSelectBoxOption={setMusicSelectBoxValue}/> 

                    </>
                  }
                  
                  {createState == "ready" && <div className={styles.horizontalDiv}> 
                    {/* <button className={styles.gradientButton} style={{width: "10rem", marginTop: "1.4rem"}} onClick={createVideo}>Create Short</button> <button className={styles.greyButton} onClick={()=>setMoreOptions(!moreOptions)} style={{width: "10rem", marginTop: "1.4rem"}}>{!moreOptions?"More Options":"Less Options"}</button> <WandSparkles className="h-4 w-4 mr-2 " /> */}
                    <Button  size={"lg"} className={`my-3 ${styles.gradient}`} variant={"secondary"}  onClick={createVideo}> Create Audiobook</Button> 
                    {/* <Button className="my-3" size={"lg"} variant={"secondary"} onClick={()=>setMoreOptions(!moreOptions)} >{!moreOptions?"More Options":"Less Options"}</Button> */}


                     </div>}

                  {createState != "ready" && 
                    <div className={styles.spinnerContainer} style={{marginTop:"1rem"}}>
                      <div className={styles.spinner}></div>
                    </div>
                  }

                </div>
                </div>
              </div>
            
          )}
          {dashboardState=="view" && (
            <>
              
              <div className={styles.videoList}>
                {/* {(userData && userData.books?.length>0 && currentVideo) && <h2 className={styles.h2}>{chosenVideo==latestVideo ? "Latest" : "Current"} Video</h2>} */}
                {currentVideo}

                {/* <ShortViewer video_link='https://videos24238746.s3.amazonaws.com/10-24/85299c13-c2e5-41ab-807d-aa5da7f9aee3-u1/final_output.mp4' default_caption='cum!'/> */}

                {/* {generatingVideos.length>0 && <h2 className={styles.h2}>Generating Shorts</h2>}
                {generatingVideos} */}

                {/* {(userData && userData.books?.length>0 && videos.length>0)&&<h2 className={styles.h2}>Past Shorts</h2>} */}
                {(!userData || !userData.books || userData.books.length == 0) && <><p style={{marginTop:0}}>Your generated audiobooks will appear here</p> <Button onClick={()=>setDashboardState("create")} >Create Audiobook</Button></>}
                {/* {videos.map((video, index) => (
                  
                ))} */}
                {/* {videos}
                {(userData && userData.books && (userData && userData.books?.length>0 && videos.length>0)) &&<div className={styles.horizontalDiv}>
                  
                  {videosPageNo>0 && <button onClick={()=>{setVideosPageNo(videosPageNo-1); if(false) window.scrollTo({ top: 0, behavior: 'smooth' });}} className={styles.nextPreviousButtons}>Previous Page</button>}
                  {videosPageNo<=0 && <button className={styles.nextPreviousButtonsDisabled}>Previous Page</button>}

                  {videosPageNo<userData.books.length/pageSize-1 && <button onClick={()=>{setVideosPageNo(videosPageNo+1); if(false) window.scrollTo({ top: 0, behavior: 'smooth' });}} className={styles.nextPreviousButtons}>Next Page</button>}
                  {videosPageNo>=userData.books?.length/pageSize-1 && <button  className={styles.nextPreviousButtonsDisabled}>Next Page</button>}
                </div>
                } */}
                {(videoList.length>0 && !currentVideo) &&
                <VideoList videoList={videoList} chooseVideo={chooseVideo} isPortrait={false} setDashBoardState={setDashboardState}/>}                
              </div>


              
            </>
          )}

          {dashboardState=="billing" && (
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
              <PricingPage user={userData} buyPlan={buyPlan} loggedIn={true} manageSub={manageSub} />
                <SubInfo creditsRemaining={getTotalCredits()} creditsAvailable={getAvailableCredits()} currentSubscription={currentPlan} manageSub={manageSub} />
              <BillingFAQ/>

              {/* <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
              <stripe-pricing-table pricing-table-id=""
              publishable-key="pk_test_51PkSZNGSOkYdeBqyX93J969dpRdbhjJST85To35nhJ4Aomm3vi0WR5fkEq80Rdwu0Hfu6w6EBbosWBTXVZPp9AS700MDPiZatb"    customer-session-client-secret="">
              </stripe-pricing-table> */}

              </div>
              
            //  </div>
          )}

          {dashboardState=="settings" && <><TikTok/>  </>}
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





let ignoreClose = false;

function SelectBox ({currentOption, options, audios, setSelectBoxOption}) {
  const [isOpen, setIsOpen] = useState(false);
  //const  [audio, setAudio] = useState(false);
  const [audio, setAudio] = useState(new Audio());
  //const [currentOption, setCurrentOption] = useState(defaultOption);

  useEffect(() => {
    return () => {
      if(audio) {
        console.log("destorying audio")
        audio.pause();
        audio.src = '';
        audio.load();
        
        //audio = null;
      }
    };
  }, []);

  const toggleDropdown = (event) => {
    if(isOpen) return;

    setTimeout(() => {window.onclick = click;}, 3 );

    setIsOpen(true);
  };

  const setNewOption = (option) => {
    //setCurrentOption(option);
    //console.log("clicked");
    audio.pause();
    window.onclick = null;
    setSelectBoxOption(option);
    setIsOpen(false);
  }

  const click = () => {

    audio.pause();

    setIsOpen(false);

    window.onclick = null;
  };

  const handleBlur = () => {

  };
  //window.onclick = click;
  //setTimeout(() => {window.onclick = click;}, 200 )
  const optionElements = [];
  options.forEach((item, index) => {
    optionElements.push(
      <li className={styles.dropdownitem} key={index} onClick={(event) => {  setNewOption(item); event.stopPropagation(); } }>{item} {audios && <FontAwesomeIcon icon={faPlayCircle} onClick={(event)=>{
        // const a = new Audio('/13.mp3');
        // setAudio(a);
        // a.play();
        audio.src = audios[index];
        audio.play();
        audio.volume=0.4;
        event.stopPropagation(); 
      }}/> } </li>
      // <button style={{marginLeft:"15px"}}key={index} onClick={item[1]} className={popupstyles.popupbutton}>{item[0]}</button>)
    )
  });

  return <div className={styles.dropdown}>
    <button onClick={toggleDropdown} /*onBlur={handleBlur}*/ className={styles.dropdownbutton}>
      {/* <div> */}
      {currentOption} <FontAwesomeIcon icon={faCaretDown} style={{marginLeft: "5rem"}}/> 
      {/* </div> */}
    </button>
    {isOpen && (
      <ul className={styles.dropdownmenu}>
        {optionElements}
        {/* <li className={styles.dropdownitem} onClick={toggleDropdown}>Option 1</li>
        <li className={styles.dropdownitem} onClick={toggleDropdown}>Option 2</li>
        <li className={styles.dropdownitem} onClick={toggleDropdown}>Option 3</li> */}
      </ul>
    )}
  </div>
}




function getMinutesOld(date) {
  const now = new Date();
  const diffInMilliseconds = now - date; // difference in milliseconds
  const diffInMinutes = Math.floor(diffInMilliseconds / 1000 / 60); // convert to minutes
  return diffInMinutes;
}


// function CreatedVideoItem({video, chooseVideo}) {
//   let formattedDate2 = video.createdDate.toLocaleDateString('en-US', {
//     month: '2-digit',
//     year: '2-digit',
//     day: '2-digit'
//   })

//   let minutesOld = getMinutesOld(video.createdDate);

//   return (
//     <div className={`${styles.videoCardItem}`} style={{cursor:"pointer"}}onClick={() => {chooseVideo(video.id);}}>
//       <div className={styles.videoTitleContent} >

//         <div className={styles.horizontalDiv}>
//           {!video.video && minutesOld <= 6 &&
//           <div className={styles.spinnerContainer} >
//             <div className={styles.spinner} style={{width:"1.6rem", height:"1.6rem"}}></div>
//           </div>}
//           {!video.video && minutesOld > 6 && <FontAwesomeIcon icon={faExclamationCircle} color='#e13217'/>}
//           {video.video && <FontAwesomeIcon icon={faCheckCircle} color='#0093e2'/>}
//           <div className={styles.videoTitle}>
//             {video.title.substring(0, 50)+(video.title.length>50 ? "..." : "")}
//           </div>
//         </div>


//         <div className={styles.videoTitle}>
//           {formattedDate2}
//         </div>
        
//         {/* {isExpanded &&
//         <>
//         <div className={styles.videoTitle}>
//           Back
//         </div>
//         </>
//         } */}
//       </div>
//     </div>
//   );
// }


// function VideoCard({ video, chooseVideo, refresh, uploadTiktok, isPortrait, goToCreatePage}) {
//   // const [isExpanded, setIsExpanded] = useState(false);
//   const [status, setStatus] = useState("loading");
//   const [status2, setStatus2] = useState("0");
//   const [caption, setCaption] = useState("cock and balls")
//   // const [refreshKey, setRefreshKey] = useState(0);

//   // const refreshComponent = () => {
//   //   setRefreshKey(refreshKey + 1);
//   // };

//   useEffect(() => {
//       getVideoStatus();

//       let refreshTimer = setInterval(async () => {
//         await getVideoStatus();
//       }, 7000);
  
//       return () => {
//         clearInterval(refreshTimer);
//       };

//   }, []);

//   const getVideoStatus = async () => {
//     // const response = await fetch('/api/get-video-status', {
//     //   method: 'POST',
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //   },
//     //   body: JSON.stringify({ url: video.video }),
//     // });
//     // const result = await response.json();
//     //console.log(JSON.stringify(result));
//     let minutesOld = getMinutesOld(video.createdDate);


//     if(video.video) {
//       setStatus('complete');
//     }
//     else if(minutesOld < 10) {
//       setStatus("loading");
//     }
//     else {
//       setStatus("error");
//     }

    

//     if(minutesOld < 10) {
//       const response = await fetch('/api/get-job-status', {
//         method: 'POST',
//         headers: {
//         'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ job_id: video.id }),
        
//       });
//       const data = await response.json();
//       if(data && data.output && data.output.length < 5)
//         setStatus2(data.output);
//       else if (data && data.output) {
//         // video.video = data.output;
//         // setStatus('complete');
//         refresh();
//       }
//       if(data && data.error)
//         setStatus("error")
//     }


//     // if (result.error) {
//     //   setStatus(minutesOld > 5 ? "failed" : "not found");
//     // }
//     // else if (result.status === 'complete') {
//     //   setStatus('complete');
//     // }
//     // else if (result.status === 'not found') {
//     //   setStatus(minutesOld > 5 ? "failed" : "not found");
//     // }
//     // refreshComponent();
//     //refresh();
    
//   }


//   const smallButtons = 
//     (<div className={styles.horizontalDiv} style={{ gap: '0.9rem' , margin: '0.5rem'} } >
//       {/* <FontAwesomeIcon icon={faDownload}/> */}
     
//       <FontAwesomeIcon icon={faThumbsUp} className={styles.highlight}/>
//       <FontAwesomeIcon icon={faThumbsDown} className={styles.highlight}/>
//       <FontAwesomeIcon icon={faTrash} className={styles.highlight}/>
//       <RefreshIcon className={styles.highlight} fontSize="small" onClick={() => goToCreatePage(video.title, video.voice?voices[video.voice]:"Adam", video.music, video.length?video.length:25, true)}/>
//     </div>);
  

//   return (
//     //<div className={`${styles.videoCard}`}>
//     <>
//       <div className={styles.videoTitleContent} >
//         {/* {!isExpanded &&
//         <>
//         {!video.video && 
//         <div className={styles.spinnerContainer} >
//           <div className={styles.spinner} style={{width:"2rem", height:"2rem"}}></div>
//         </div>}
//         <div className={styles.videoTitle}>
//           Video titled: {video.title}
//         </div>
//         <div className={styles.videoTitle}>
//           {video.createdDate}
//         </div>
//         </>
//         } */}
        
        
//         <div className={styles.videoTitle}>
//           {/* <FontAwesomeIcon icon={faArrowLeft} size='lg' onClick={() => {chooseVideo(null);}}/>  */}
//           {/* Back */}
//         </div>
//         {/* <FontAwesomeIcon icon={faRefresh} size='lg' style={{cursor:"pointer"}} onClick={getVideoStatus}/> */}
//       </div>
      
      
//       <div className={styles.cardContent}>
//         {/* <img src={video.image} alt={video.title} className={styles.videoImage} /> */}
//         <div className={styles.videoColumn}>
          
//           {status=="complete" && (
//             <>
//             <video className={styles.videoImage} controls>
//               <source src={video.video} key={video.video} type="video/mp4" />
//             </video>
//             {/* <p>please download if you have trouble palying the video</p> */}
//             {/* <div className={styles.downloadButton}>
//               <a href={video.video}><FontAwesomeIcon icon={faDownload}/> Download</a>
//             </div> */}
//             </>
//           )}
//           {status=="loading" && (
//             <>
//             <div className={styles.spinnerContainer}>
//               <div className={styles.spinner}></div>
//             </div>
//             <p style={{ marginBottom: '0' }}>Rendering your video...</p>
//             <p style={{ marginTop: '0' }}>{status2}% done</p>
//             </>
//           )}

//           {status=="error" && (
//             <>
//             <p>Sorry there was a problem generating this video. 1 Credit refunded.</p>
//             {/* {<div className={styles.downloadButton}>
//             Retry
//             </div>} */}
//             </>
//           )}

//         </div>
//         <div className={styles.descriptionColumn}>
//           Topic <div className={styles.tooltip}><FontAwesomeIcon icon={faQuestionCircle} ></FontAwesomeIcon><span>The chosen topic for the video</span> </div> <div className={styles.tooltip}><FontAwesomeIcon icon={faCopy} className={styles.highlight} onClick={() => {
//             navigator.clipboard.writeText(video.title) }}/><span>Copy Title</span></div>

//           <div className={styles.videoDescription}>{video.title}</div> 
          
//           {/* Caption <div className={styles.tooltip}><FontAwesomeIcon icon={faQuestionCircle} > </FontAwesomeIcon><span>Suggested auto generated caption</span> </div> <div className={styles.tooltip}><FontAwesomeIcon icon={faCopy} className={styles.highlight} onClick={() => {
//             navigator.clipboard.writeText(video.description)}}/><span>Copy Caption</span></div>

//           <div style={{ whiteSpace: 'pre-wrap' }} className={styles.videoDescription}>{video.description} </div> */}

//           <div className="space-y-2">
//             <Label htmlFor="caption">Caption <div className={styles.tooltip}><FontAwesomeIcon icon={faQuestionCircle} > </FontAwesomeIcon><span>Suggested auto generated caption</span> </div> <div className={styles.tooltip}><FontAwesomeIcon icon={faCopy} className={styles.highlight} onClick={() => {
//             navigator.clipboard.writeText(video.description)}}/><span>Copy Caption</span></div></Label>
//             <Input
//               id="caption"
//               placeholder="Add a title that describes your video"
//               value={videoScript}
//               onChange={(e) => setVideoScript(e.target.value)}
//               maxLength={100}
//             />
//             {/* <div className="text-right text-sm text-muted-foreground">
//               {caption.length}/100
//             </div> */}
//           </div>

//           {/* <div className="space-y-2">
//             <Label htmlFor="script">Script</Label>
//             <Input
//               id="script"
//               value={video.script}
//               //maxLength={100}
//             />
//             <div className="text-right text-sm text-muted-foreground">
//               {caption.length}/100
//             </div>
//           </div> */}

//           <Label htmlFor="readonly-textarea">Script</Label>
//           <Textarea
//             id="readonly-textarea"
//             readOnly
//             value={video.script}
//             className="resize-none bg-muted"
//             rows={5}
//             aria-readonly="true"
//           />
          
//           Script <div className={styles.tooltip}><FontAwesomeIcon icon={faQuestionCircle} ></FontAwesomeIcon><span>This is the AI generated script for your video</span> </div>
//           <div style={{ whiteSpace: 'pre-wrap' }} className={styles.videoDescription}>{video.script}</div>

//           <div className={styles.buttonsGrid}>
//             {/* {status=="complete" && <button className={styles.greyButton} onClick={() => uploadTiktok(video.video, video.description)} style={{ width: "9rem", backgroundColor: "#A53A3D", padding: "0.3rem"}} >Post to TikTok</button> } */}
//             <div className={styles.horizontalDiv} >
//             {status=="complete" && <Button variant="secondary" onClick={() => uploadTiktok(video.video, video.description)}>Post to TikTok</Button>}

//             {/* {status=="complete" && <button className={styles.greyButton}  style={{width: "11rem", marginTop: "0.5rem", marginLeft:"0.3rem", backgroundColor: "#A53A3D", padding: "0.3rem"}} >Post to Youtube</button> } */}
            
//             {status=="complete" && <a href={video.video}><Button variant="secondary" /*className={styles.greyButton} */  > Download</Button></a> }
//             </div >
            
//             {/* {status=="complete" && <Button className={styles.greyButton}  style={{width: "11rem",  padding: "0.3rem", marginRight:"0.5rem"}} onClick={() => goToCreatePage(video.title)}><RefreshIcon fontSize="small"/> Generate Another</Button> } */}
//             {smallButtons}
//           </div>
          

//           {/* Outro
//           <div className={styles.videoDescription}>{"A random ass outro"}</div> */}
//           <br/>
//         </div>
//       </div>
//       </>
//     //</div>
//   );
// }