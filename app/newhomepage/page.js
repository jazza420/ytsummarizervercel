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
  Clock,
  Music,
  Upload,
  Sun,
  Moon,
  Sparkles,
  DollarSign
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
export default function HomePage2() {
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
    category: "Fiction"
  },
  {
    title: "Mindful Leadership",
    author: "John Davidson",
    cover: "https://storage.googleapis.com/thumbnails34564564235/tts_output_ffe9d002b92e6aa0.png",
    category: "Business"
  },
  {
    title: "Dark Corridors",
    author: "Elena Martinez",
    cover: "https://storage.googleapis.com/thumbnails34564564235/tts_output_745d30cd84b721c6.png",
    category: "Thrillers"
  },
  {
    title: "Dark Corridors",
    author: "Elena Martinez",
    cover: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=300",
    category: "Thrillers"
  },
  {
    title: "Dark Corridors",
    author: "Elena Martinez",
    cover: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=300",
    category: "Thrillers"
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
    description: "Choose from 20+ realistic AI voices across different ages, accents, and emotions"
  },
//   {
//     icon: <Languages className="w-6 h-6" />,
//     title: "Multi-language Support",
//     description: "Generate audiobooks in 30+ languages with native-speaking AI voices"
//   },
//   {
//     icon: <Music className="w-6 h-6" />,
//     title: "Background Scoring",
//     description: "Add ambient music and sound effects to enhance the listening experience"
//   },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Unbeatable pricing",
    description: "Generate a 6 hour audiobook for less than a dollar"
  }
];

function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [storyPrompt, setStoryPrompt] = useState('');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        {/* Hero Section */}
        {/* <div className="relative rounded-2xl overflow-hidden mb-12">
          <img
            src="https://images.unsplash.com/photo-1483546363825-7ebf25fb7513?auto=format&fit=crop&w=1200&h=400"
            alt="Hero"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-transparent flex items-center ">
            <div className="px-8 max-w-lg">
              <h2 className="text-4xl font-bold text-white mb-4">Discover Your Next Great Listen</h2>
              <p className="text-gray-200 mb-6">Create, generate, and listen to AI-powered audiobooks. Your story begins here.</p>
              <button className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition">
                Start Creating
              </button>
            </div>
          </div>
        </div> */}

                

        {/* AI Audiobook Creation */}
        <section className="mb-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl overflow-hidden ">
        <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 bg-background">
        <div className="text-white">
            <div className="flex items-center space-x-2 mb-6">
            <Wand2 className="w-8 h-8" />
            <h2 className="text-3xl font-bold">AI Audiobook Studio</h2>
            </div>
            <p className="text-xl mb-8 text-indigo-100">Transform your ideas into professional audiobooks with our AI-powered studio.</p>
            <div className="grid gap-6">
            {aiFeatures.map((feature) => (
                <div key={feature.title} className="flex items-start space-x-4">
                <div className="bg-white/10 p-3 rounded-lg">
                    {feature.icon}
                </div>
                <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-indigo-100 text-sm">{feature.description}</p>
                </div>
                </div>
            ))}
            </div>
        </div>
        {/* <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-lg "> */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg ">
            <h3 className="font-semibold dark:text-white text-gray-900 mb-4">Create Your Audiobook</h3>
            <div className="space-y-4 ">
                <div>
                <label className="block text-sm font-medium dark:text-gray-200 text-gray-700 mb-1">Story Prompt</label>
                <Textarea
                    placeholder="Describe your story idea or paste your existing text..."
                    className="w-full h-32 rounded-lg dark:bg-dark-700 dark:border-dark-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    value={storyPrompt}
                    onChange={(e) => setStoryPrompt(e.target.value)}
                />
                {/* <Button className="mt-2 w-full bg-indigo-500 text-white py-2 rounded-lg font-semibold hover:bg-indigo-600 transition flex items-center justify-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Story with AI</span>
                </Button> */}
                </div>
                {/* <div>
                <label className="block text-sm font-medium dark:text-gray-200 text-gray-700 mb-1">Voice Selection</label>
                <select className="w-full rounded-lg dark:bg-dark-700 dark:border-dark-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500">
                    <option>Professional Male (US)</option>
                    <option>Professional Female (US)</option>
                    <option>Storyteller (UK)</option>
                    <option>Dynamic (AU)</option>
                </select>
                </div>
                <div>
                <label className="block text-sm font-medium dark:text-gray-200 text-gray-700 mb-1">Background Music</label>
                <select className="w-full rounded-lg dark:bg-dark-700 dark:border-dark-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500">
                    <option>None</option>
                    <option>Subtle Ambient</option>
                    <option>Dramatic Score</option>
                    <option>Custom Upload</option>
                </select>
                </div> */}
                <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition">
                Generate Audiobook
                </button>
            </div>
            </div>
        {/* </div> */}
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
        <section className="p-5">
          <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-6 ">Example Audiobooks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 ">
            {featuredBooks.map((book) => (
              <div key={book.title} className="dark:bg-dark-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
                <img src={book.cover} alt={book.title} className="w-full h-48 object-cover" />
                <div className="p-6 bg-background justify-between flex flex-col h-52">
                  <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">{book.category}</span>
                  <h3 className="text-lg font-semibold dark:text-white text-gray-900 mt-2">{book.title}</h3>
                  <p className="dark:text-gray-400 text-gray-500">By {book.author}</p>
                  <Button className="mt-4 w-full px-4 py-2 rounded-full font-medium dark:hover:bg-dark-600 hover:bg-gray-200 transition flex items-center justify-center space-x-2">
                    <PlayCircle className="w-5 h-5" />
                    <span>Preview</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
{/* 
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
            </div>
          
        </section> */}


        <section id="pricing" className="mt-16">
              {/* {!session && <Pricing/> } */}
              {/* {session && <CreditsPage/> } */}
              {/* <Pricing/> */}
              {/* {status && status != "loading" && */}
                
              
              <PricingPage /*loggedIn={session&&status!="loading"}*//>
          </section>
      </main>
    </div>
    </MainLayout>
  );
}

//export default App;

