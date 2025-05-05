"use client";

import { 
  BookOpen, 
  Brain, 
  Sword, 
  Heart, 
  Ghost, 
  Lightbulb, 
  Trophy,
  Search,
  PlayCircle,
  Mic,
  Wand2,
  Languages,
  Music,
  Sun,
  Moon,
  Sparkles,
  PenTool,
  Headphones,
  Share2,
  Check,
  Infinity,
  PauseCircle
} from 'lucide-react';










import Head from 'next/head'
import Link from 'next/link';
import styles from '../main.module.css'

import { useEffect, useState, useRef  } from 'react';
import MainLayout from '../mainlayout';
// import AIImage from './ai-generated-image'
// import AITTS from './ai-tts'
import { SessionProvider } from 'next-auth/react';
import { useSession, signIn, signOut } from 'next-auth/react';
//import { auth, signIn, signOut } from "@/auth";
import FAQ from '../faq'
// import Pricing from './pricing'
// import CreditsPage from './credits';
import PricingPage from '../pricingpage2';
import { Button } from "@/components/ui/button"
import { Textarea } from '@/components/ui/textarea';
export default function HomePage3() {
  return (
    <SessionProvider>
        <Home/>
    </SessionProvider>
  );
}










const categories = [
  { icon: <BookOpen className="w-6 h-6" />, name: 'Fiction', count: '2,345', color: 'bg-blue-500' },
  { icon: <Brain className="w-6 h-6" />, name: 'Non-Fiction', count: '1,892', color: 'bg-green-500' },
  { icon: <Sword className="w-6 h-6" />, name: 'Thrillers', count: '956', color: 'bg-red-500' },
  { icon: <Heart className="w-6 h-6" />, name: 'Romance', count: '1,243', color: 'bg-pink-500' },
  { icon: <Ghost className="w-6 h-6" />, name: 'Horror', count: '645', color: 'bg-purple-500' },
  { icon: <Lightbulb className="w-6 h-6" />, name: 'Self-Help', count: '892', color: 'bg-yellow-500' },
  { icon: <Trophy className="w-6 h-6" />, name: 'Business', count: '756', color: 'bg-indigo-500' },
];


const featuredBooks = [
    {
      title: "The Mountain's Echo",
      author: "Sarah Williams",
      cover: "https://storage.googleapis.com/thumbnails34564564235/tts_output_daa346f3c45adb22.png",
      category: "Fiction",
      audio: "preview1.wav"
    },
    {
      title: "Julius Caesar: A Biography",
      author: "Bella",
      cover: "https://storage.googleapis.com/thumbnails34564564235/tts_output_2d3ddb5e1dea6bd9.png",
      category: "History",
      audio: "preview2.wav"
    },
    {
      title: "Whispers in the Dark",
      author: "Nicole",
      cover: "https://storage.googleapis.com/thumbnails34564564235/tts_output_ffe9d002b92e6aa0.png",
      category: "Thrillers",
      audio: "preview3.wav"
    },
    {
      title: "The disappearance of MH370",
      author: "David",
      cover: "thumb2.png",
      category: "Mysteries",
      audio: "https://generated-speech-audiobooks.s3.us-east-1.amazonaws.com/ZGEjw6lmL2L8AJZ8Pn51MAqYrc6Ye9fCD56tZ3zC5391RGcUAcombinedtts.wav"
    },
    {
      title: "Thinking Clearly",
      author: "Isabella",
      cover: "thumb1.png",
      category: "Self-Help",
      audio: "preview1.wav"
    },
  ];
const aiFeatures = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "AI Story Generation",
    description: "Generate complete stories or expand your ideas with AI assistance"
  },
  {
    icon: <Mic className="w-6 h-6" />,
    title: "Natural Voice Generation",
    description: "Choose from 50+ realistic AI voices across different ages, accents, and emotions"
  },
  {
    icon: <Languages className="w-6 h-6" />,
    title: "Multi-language Support",
    description: "Generate audiobooks in 30+ languages with native-speaking AI voices"
  },
  {
    icon: <Music className="w-6 h-6" />,
    title: "Background Scoring",
    description: "Add ambient music and sound effects to enhance the listening experience"
  }
];

const howItWorks = [
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Write or Generate",
    description: "Start with your own story or let our AI help you generate one from scratch"
  },
  {
    icon: <Mic className="w-8 h-8" />,
    title: "Choose Your Voice",
    description: "Select from our library of natural-sounding AI voices"
  },
  // {
  //   icon: <Headphones className="w-8 h-8" />,
  //   title: "Add Atmosphere",
  //   description: "Enhance your audiobook with background music and sound effects"
  // },
  {
    icon: <Share2 className="w-8 h-8" />,
    title: "Share & Publish",
    description: "Share your audiobook with the world or keep it private for personal use"
  }
];

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for trying out our AI audiobook creation tools",
    features: [
      "2 free audiobooks per week (up to 20 minutes long)",
      "Download for free",
      "Multiple free voices"
    ]
  },
  {
    name: "Pro",
    price: "$5",
    description: "Everything you need for professional audiobook creation",
    features: [
      "Up to 6 hours long audiobooks",
      "~36 hours of audio per month",
      "Multiple export formats",
      "Concurrent generations"
    ],
    popular: true
  },
//   {
//     name: "Professional",
//     price: "$29",
//     description: "For serious authors and publishing houses",
//     features: [
//       "Unlimited AI voices",
//       "Unlimited words",
//       "Custom voice training",
//       "Priority rendering",
//       "API access",
//       "White-label exports"
//     ]
//   }
];

let audio = null;

function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { data: session, status } = useSession();
  
  const [currentAudio, setCurrentAudio] = useState(null);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    //setAudio(new Audio());
    //setAudio(new Audio()) 
    return () => {
      if(audio) audio.pause();
      audio = null;

    };
  }, [session]);

  return (
    <MainLayout>
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-dark-950' : 'bg-gray-50'}`}>
      {/* Header */}
      {/* <header className="dark:bg-dark-900 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <PlayCircle className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold dark:text-white text-gray-900">AudioVerse</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search audiobooks..."
                  className="pl-10 pr-4 py-2 border dark:border-dark-700 dark:bg-dark-800 dark:text-white border-gray-300 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-800"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header> */}

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* How It Works */}
        {/* <section className="mb-16 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Create Your Audiobook in Minutes</h2>
              <p className="text-xl text-purple-200 max-w-2xl mx-auto">Transform your stories into captivating audiobooks with our AI-powered platform. Here's how it works:</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((step, index) => (
                <div key={step.title} className="relative">
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-8 right-0 w-full h-0.5 bg-purple-500/30">
                      <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-purple-500"></div>
                    </div>
                  )}
                  <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <div className="bg-purple-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4 text-purple-300">
                      {step.icon}
                    </div>
                    <h3 className="text-white font-semibold text-xl mb-2">{step.title}</h3>
                    <p className="text-purple-200">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <button className="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-700 transition flex items-center space-x-2 mx-auto">
                <Wand2 className="w-5 h-5" />
                <span>Start Creating Now</span>
              </button>
            </div>
          </div>
        </section> */}
        
        
        <section className="mb-8  rounded-3xl overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Create Your Full Length Audiobook in Minutes</h2>
              <p className="text-xl max-w-2xl mx-auto">Transform your ideas into captivating audiobooks with our AI-powered platform. Here&apos;s how it works:</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {howItWorks.map((step, index) => (
                <div key={step.title} className="relative">
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-8 right-0 w-full h-0.5 ">
                      <div className="absolute right-0 -top-1 w-2 h-2 rounded-full "></div>
                    </div>
                  )}
                  <div className=" rounded-2xl bg-background p-6 border ">
                    <div className="bg-blue-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4 text-blue-300">
                      {step.icon}
                    </div>
                    <h3 className="text-white font-semibold text-xl mb-2">{step.title}</h3>
                    <p className="text-blue-200 h-20">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              {/* <button className="px-8 py-4 bg-white text-black rounded-full font-semibold transition flex items-center space-x-2 mx-auto">
                <Wand2 className="w-5 h-5" />
                <span>Start Creating Now</span>
              </button> */}

              {session&&status!="loading"&&<Link href="/dashboard"><Button size="lg">Go To Dashboard</Button></Link>}
                {/* {!session&&status!="loading"&&<><button className={styles.gradientButton} onClick={() => signIn(undefined, {callbackUrl:'/dashboard'})}>Get Started</button></>} */}
                {!session&&status!="loading"&&<><Button size="lg"  onClick={() => signIn(undefined, {callbackUrl:'/dashboard'})}>Try it out</Button></>} 
            </div>
          </div>
        </section>




        {/* AI Features */}
        {/* <section className="mb-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-white text-center mb-12">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Wand2 className="w-8 h-8" />
                <h2 className="text-3xl font-bold">AI Audiobook Studio</h2>
              </div>
              <p className="text-xl text-indigo-100 max-w-2xl mx-auto">Transform your ideas into professional audiobooks with our AI-powered studio.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {aiFeatures.map((feature) => (
                <div key={feature.title} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
                  <div className="bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-indigo-100">{feature.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-purple-50 transition flex items-center space-x-2 mx-auto">
                <Sparkles className="w-5 h-5" />
                <span>Create Your Audiobook</span>
              </button>
            </div>
          </div>
        </section> */}



        <section className="mb-48">
          <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-6 ">Example Audiobooks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 ">
            {featuredBooks.map((book) => (
              <div key={book.title} className="dark:bg-dark-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
                <img src={book.cover} alt={book.title} className="w-full h-48 object-cover" />
                <div className="p-6 bg-background flex flex-col h-60">
                  <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">{book.category}</span>
                  <h3 className="text-lg font-semibold dark:text-white text-gray-900 mt-2">{book.title}</h3>
                  
                  <div className="justify-between flex h-full flex-col">
                    <p className="dark:text-gray-400 text-gray-500">Voiced by {book.author}</p>
                    <Button className="mt-4 w-full px-4 py-2 rounded-full font-medium dark:hover:bg-dark-600 transition flex items-center justify-center space-x-2" onClick={()=>{
                          if(audio==null) audio = new Audio();
                          if(currentAudio==book.audio) {
                              audio.pause();
                              setCurrentAudio(null);
                              return;
                          }
                          audio.src = book.audio;
                          audio.play();
                          audio.volume=0.4;

                          setCurrentAudio(book.audio);
                      }}>
                      {(currentAudio!=book.audio||audio==null||audio.paused) &&<><PlayCircle className="w-5 h-5" />
                          <span>Preview</span></>}
                      {(currentAudio==book.audio&&!audio.paused) &&<><PauseCircle className="w-5 h-5" />
                          <span>Previewing</span></>}
                      </Button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </section>








        {/* Pricing */}
        <section className="mb-48">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold dark:text-white text-gray-900 mb-4">Unbeatable Pricing</h2>
            <p className="text-xl dark:text-gray-300 text-gray-600 max-w-2xl mx-auto">
              Start for free, upgrade when you need more. No hidden fees, no surprises.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 ">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.name}
                className={`relative dark:bg-dark-800 bg-background rounded-2xl  p-8 ${
                  plan.popular ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-end justify-center mb-2">
                    <span className="text-4xl font-bold dark:text-white text-gray-900">{plan.price}</span>
                    {plan.price !== "Free" && <span className="text-gray-500 dark:text-gray-400">/mo</span>}
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-purple-500 flex-shrink-0" />
                      <span className="dark:text-gray-300 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
               

                {status!="loading" &&
                    <button onClick={() => {
                            if(session) window.location.href = '/dashboard' 
                            else signIn(undefined, {callbackUrl:'/dashboard'}) 
                        }} className={`w-full py-3 px-4 rounded-xl font-medium transition ${
                    plan.popular
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-700 text-white hover:bg-gray-600 '
                    }`}>
                    Get Started
                    </button>
                }
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        {/* <section className="mb-12">
          <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-6">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div
                key={category.name}
                className="dark:bg-dark-800 bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition cursor-pointer"
              >
                <div className={`${category.color} w-12 h-12 rounded-full flex items-center justify-center text-white mb-4`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold dark:text-white text-gray-900">{category.name}</h3>
                <p className="text-sm dark:text-gray-400 text-gray-500">{category.count} books</p>
              </div>
            ))}
          </div>
        </section> */}

        {/* Featured Books */}
        {/* <section>
          <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-6">Featured Audiobooks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBooks.map((book) => (
              <div key={book.title} className="dark:bg-dark-800 bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
                <img src={book.cover} alt={book.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">{book.category}</span>
                  <h3 className="text-lg font-semibold dark:text-white text-gray-900 mt-2">{book.title}</h3>
                  <p className="dark:text-gray-400 text-gray-500">By {book.author}</p>
                  <button className="mt-4 w-full dark:bg-dark-700 dark:text-white bg-gray-100 text-gray-900 px-4 py-2 rounded-full font-medium dark:hover:bg-dark-600 hover:bg-gray-200 transition flex items-center justify-center space-x-2">
                    <PlayCircle className="w-5 h-5" />
                    <span>Preview</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section> */}
      </main>
    </div>
    </MainLayout>
  );
}

//export default App;