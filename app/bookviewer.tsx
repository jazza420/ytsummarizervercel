'use client'

import { useState, useEffect, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Book, Mic, Plus, Trash2, Download, Wand2 } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { ChevronLeft} from 'lucide-react'
import styles from './spinner.module.css';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CircleAlert, AudioLines} from 'lucide-react'
import DarkModeAudioPlayer from './audioplayer'
import {ChapterList} from '@/components/component/chapter-list'


interface Chapter {
  title:string,
  text:string,
  audio:string,
  
}

interface BookInfo {
  id: string,
  title: string, 
  chapters: Chapter[] | null, 
  voice: string,
  audioStatus:string | null,
  audioLink:string | null,
  status:string,
  thumb:string,
  audioCreated: Date | null,
  createdDate: Date,
  length: number,
  about:string
}

const voices = ["David", "Alloy", "Aoede", "Bella", "Jessica", "Kore", "Nicole", "Nova", "River", "Sarah", "Sky", "Adam", "Echo", "Eric", "Fenrir", "Liam", "Michael", "Onyx", "Puck", "Alice", "Emma", "Isabella", "Lily", "Daniel", "Fable", "George", "Lewis"]

const voicesID = ["david", "af_alloy", "af_aoede", "af_bella", "af_jessica", "af_kore", "af_nicole", "af_nova", "af_river", "af_sarah", "af_sky", "am_adam", "am_echo", "am_eric", "am_fenrir", "am_liam", "am_michael", "am_onyx", "am_puck", "bf_alice", "bf_emma", "bf_isabella", "bf_lily", "bm_daniel", "bm_fable", "bm_george", "bm_lewis"];







function getMinutesOld(date: Date) {
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / 1000 / 60); // convert to minutes
  return diffInMinutes;
}

function getMinutesOld2(date: Date) {
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInMinutes = diffInMilliseconds / 1000 / 60; // convert to minutes
  return diffInMinutes;
}




export default function BookViewer({ book, refresh,  goToCreatePage, isPortrait, setPopup, chooseVideo, generateAudio}: {video_link: string, default_caption: string, book : BookInfo, refresh: () => void, goToCreatePage: (topic : string, voice: string, music: string | null, length : number, moreOptions : boolean) => void, isPortrait: boolean, setPopup: any, chooseVideo : (video : string | null) => void,  generateAudio : (book_id : string, voice: string) => void}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [status, setStatus] = useState("loading");
    const [status2, setStatus2] = useState("0");
    const [status3, setStatus3] = useState("ready");

    const [tiktokStatus, setTiktokStatus] = useState(null);
    //const [caption, setCaption] = useState("cock and balls")
    const [uiState, setUIState] = useState("main");
    const [audio, setAudio] = useState(new Audio());
    const [voiceSelectBoxValue, setVoiceSelectBoxValue] = useState(voices[voicesID.indexOf(book.voice)]);
    

    useEffect(() => {
      // getVideoStatus();

      let refreshTimer = setInterval(async () => {
        // await getVideoStatus();
        refresh();
        //setStatus3("ready");
        
      }, 7000);
  
      return () => {
        clearInterval(refreshTimer);
      };

    }, []);

    // const getVideoStatus = async () => {
    //   // const response = await fetch('/api/get-video-status', {
    //   //   method: 'POST',
    //   //   headers: {
    //   //     'Content-Type': 'application/json',
    //   //   },
    //   //   body: JSON.stringify({ url: video.video }),
    //   // });
    //   // const result = await response.json();
    //   //console.log(JSON.stringify(result));




    //   let minutesOld = getMinutesOld(book.createdDate);
  
    //   if (book.audioLink) {
    //     setStatus('complete');
    //   }
    //   else if(minutesOld < 15) {
    //     // const response = await fetch('/api/get-job-status', {
    //     //   method: 'POST',
    //     //   headers: {
    //     //   'Content-Type': 'application/json',
    //     //   },
    //     //   body: JSON.stringify({ job_id: video.id }),
          
    //     // });
    //     // const data = await response.json();
    //     // if(data && data.output && data.output.length < 5)
    //     //   setStatus2(data.output);
    //     // else if (data && data.output) {
    //     //   video.video = data.output;
    //     //   setStatus('complete');
    //     //   refresh();
    //     // }
    //     // if(data && data.error)
    //     //   setStatus(data.error)
    //     setStatus("loading");
    //     refresh();
    //   }
    //   // else if(minutesOld < 8) {
    //   //   setStatus("loading");
    //   // }
    //   else {
    //     setStatus("error");
    //   }



    //   if(video.tiktok_publish_id) {
    //     const response2 = await fetch('/api/query-tiktok-post-status', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ publish_id: video.tiktok_publish_id }),
    //     });
    //     const result = await response2.json();
    //     //console.log(JSON.stringify(result));
    //     setTiktokStatus(result.data.status);
    //   }


  
  
    //   // if (result.error) {
    //   //   setStatus(minutesOld > 5 ? "failed" : "not found");
    //   // }
    //   // else if (result.status === 'complete') {
    //   //   setStatus('complete');
    //   // }
    //   // else if (result.status === 'not found') {
    //   //   setStatus(minutesOld > 5 ? "failed" : "not found");
    //   // }
    //   // refreshComponent();
    //   //refresh();
      
    // }


    let fullText = "";
    if(book.chapters!=null){  
      book.chapters.forEach((item: Chapter, index: number) => {
        fullText += item.title + "\n" + item.text + "\n\n";
        // Your code here
      });
    }

    const link = (book.audioLink&&book.audioCreated&&getMinutesOld2(book.audioCreated)>20)?("https://generated-speech-audiobooks.s3.us-east-1.amazonaws.com/"+book.audioLink?.split('/').slice(-2).join('')):book.audioLink


    if(book.audioStatus=="generating" && book.audioCreated != null && getMinutesOld2(book.audioCreated)*11/(book.length+25)>3)
      book.audioStatus = "failed"

    //alert(book.chapters)
    //bg-black
    //style={{ width: '100%' }}
    //style={{ width: '100%' }}
    return ( //md:flex-row
        // <div className={`flex flex-col  gap-6 ${isPortrait?'p-3':'p-8'} max-w-10xl mx-auto my-3 bg-background w-full items-center justify-center`} >
        //     {books}
        // </div>
        // <AudiobookCreator/> 
      <div className="min-h-screen">
      {/* <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <Book className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Audiobook Creator</h1>
          </div>
        </div>
      </header> */}

      <main className="max-w-8xl mx-auto px-2 py-4 sm:px-2 lg:px-2 space-y-9 ">
      <Button onClick={()=>chooseVideo(null)} variant="ghost" size="sm">
        <ChevronLeft className="mr-2 h-4 w-4" />
        View Audiobook
      </Button>
      <div className="space-y-4 ">
        <h2 className="text-md font-semibold">Book Info</h2>
        <div className="shadow rounded-lg p-4 mb-8 border bg-background">
          
          {/* <div className="grid grid-cols-1 gap-3 sm:grid-cols-1"> */}
            <div className='flex flex-row gap-3 items-center'>
              <div>
              {book.thumb?<img
                src={book.thumb?book.thumb:"logo11.png"}
                alt="Thumbnail"
                width={158}
                height={158}
                className="rounded-md object-cover"
                style={{ aspectRatio: "80/80", objectFit: "cover" }}
              />:<div className='m-10'> <div className={styles.spinnerContainer}>
              <div className={styles.spinner2}></div>
            </div></div>}
              </div>
              <div className='w-full space-y-3'>
                <div>
                <label className="block text-sm font-medium">Book Title</label>
                <Input
                  type="text"
                  value={book.title}
                  // onChange={(e) => setBook(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1 block w-full rounded-md border shadow-sm focus:ring-2 focus:ring-offset-2 sm:text-sm"
                  // placeholder="Enter book title"
                />
                </div>
                <div>
                <label className="block text-sm font-medium">About</label>
                <Input
                  type="text"
                  value={book.about}
                  // onChange={(e) => setBook(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1 block w-full rounded-md border shadow-sm focus:ring-2 focus:ring-offset-2 sm:text-sm"
                  placeholder="Generating..."
                />
                </div>
              </div>
            </div>
            {/* <div>
              <label className="block text-sm font-medium">Narrator</label>
              <Input
                type="text"
                value={book.voice}
                // onChange={(e) => setBook(prev => ({ ...prev, title: e.target.value }))}
                className="mt-1 block w-full rounded-md border shadow-sm focus:ring-2 focus:ring-offset-2 sm:text-sm"
                placeholder="Enter book title"
              />
            </div> */}
            {/* <div>
              <label className="block text-sm font-medium">Author</label>
              <Input
                type="text"
                value={book.author}
                // onChange={(e) => setBook(prev => ({ ...prev, author: e.target.value }))}
                className="mt-1 block w-full rounded-md border shadow-sm focus:ring-2 focus:ring-offset-2 sm:text-sm"
                placeholder="Enter author name"
              />
            </div> */}


          {/* </div> */}
          
          
            
            
        </div>
      </div>
  
      <div className="space-y-4 ">
        <h2 className="text-md font-semibold">Audio</h2>
        <div className="shadow rounded-lg p-4 mb-8 border bg-background">
          
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-1">

            <div>
              <label className="block text-sm font-medium">Narrator</label>
              {/* <Input
                type="text"
                value={book.voice}
                // onChange={(e) => setBook(prev => ({ ...prev, title: e.target.value }))}
                className="mt-1 block w-full rounded-md border shadow-sm focus:ring-2 focus:ring-offset-2 sm:text-sm"
                placeholder="Enter book title"
              /> */}
              <div  className="flex flex-row items-center mt-1  gap-2 "> 
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
            
            <div>
              <label className="block text-sm font-medium">Audio</label> 
              { (book.audioStatus=="generating" ) ? 
                <div className="flex flex-row items-center justify-center mt-1  gap-2 ">
                  <label className="block text-sm font-small">Audio is generating {book.audioCreated!=null?(Math.floor((Math.min(getMinutesOld2(book.audioCreated)*11/(book.length+25), 1)*100))+"%"):""} </label>
                  <div className={styles.spinnerContainer}>
                    <div className={styles.spinner}></div>
                  </div>
                  
                </div> :  
                <div  className="flex flex-row items-center mt-1  gap-2 "> 
                  <Button disabled={((book.audioStatus!=null&&voicesID[voices.indexOf(voiceSelectBoxValue)]==book.voice)&&book.audioStatus!="failed")||book.status=="generating"||status3!="ready"} onClick={
                    ()=>{
                      setStatus3("loading");
                      generateAudio(book.id, voicesID[voices.indexOf(voiceSelectBoxValue)]);
                    }}
                  variant={"outline"} >Generate</Button>
                  {/* {(book.audioLink == null) ? <Button disabled={true} variant={"outline"}  >Download</Button> : <a href={book.audioLink?book.audioLink:""} download="audio.wav"><Button  variant={"outline"}  >Download</Button></a> } */}
                  {/* {(book.audioLink == null) ? <Button disabled={true} variant={"outline"}  >Download</Button> : <DownloadWavFile link={link} title={book.title}/> } */}
                  <DownloadWavFile link={link} title={book.title}/>
                </div>
              }
            </div>

            {/* <audio
              controls
              className="w-full focus:outline-none focus:ring focus:ring-blue-500 rounded bg-black-800 color-red"
            >
              <source src={book.audioLink} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio> */}
            {book.audioLink&&<DarkModeAudioPlayer link={link}/>}
            {/* link {link} */}

          </div>
          
          
            
            
        </div>
      </div>
      
        {/* {book?.chapters?.length > 0 && (
            <div className="mt-8 flex justify-center">
              <button
                // onClick={downloadFullAudiobook}
                className="inline-flex items-center px-6 py-3 border rounded-md shadow-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Complete Audiobook
              </button>
            </div>
          )} */}

        <div className="space-y-4 ">
        
        
          <div className="flex justify-between items-center">
            <h2 className="text-md font-semibold">{(book?.chapters&&book?.chapters?.length>1)?"Chapters":"Text"}</h2>
            {/* <button
              // onClick={addChapter}
              className="inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Chapter
            </button> */}
          </div>

          {
          // book?.chapters && book.chapters.map((chapter, index) => (
          //   <div key={chapter.title} className="shadow rounded-lg p-4 border bg-background">
          //     <div className="flex justify-between items-start mb-2">
          //       <Input
          //         type="text"
          //         value={chapter.title}
          //         // onChange={(e) => updateChapter(chapter.id, { title: e.target.value })}
          //         className="text-md font-medium border-none focus:ring-0 p-0"
          //         placeholder={`Chapter ${index + 1}`}
          //       />
          //       {/* <button
          //         onClick={() => removeChapter(chapter.id)}
          //         className="hover:opacity-75 transition-opacity"
          //       >
          //         <Trash2 className="w-5 h-5" />
          //       </button> */}
          //     </div>

          //     <Textarea
          //       value={chapter.text}
          //       // onChange={(e) => updateChapter(chapter.id, { content: e.target.value })}
          //       rows={7}
          //       className="mt-1 block w-full rounded-md border shadow-sm focus:ring-2 focus:ring-offset-2 sm:text-sm"
          //       placeholder="Enter chapter content..."
          //     />

              
          //   </div>
          // ))
          }
          { (book.status == "ready" && book.chapters!=null) &&
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
              <ChapterList chapterList={book.chapters} isPortrait={isPortrait} fullText={fullText} title={book.title}/>
              
            </div>
          }
          { book.status == "generating" && 
            <div className="flex flex-row items-center justify-center mt-1 gap-2 ">
              <label className="block">Generating</label>
              <div className={styles.spinnerContainer}>
                <div className={styles.spinner2}></div>
              </div>
            </div> 
          }

          
        </div>
      </main>
    </div>
    )
}



const DownloadWavFile = ({link,title}: {link : string | null, title : string}) => {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = link?link:"";
    a.download = title+".wav";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return <Button variant={"outline"} disabled={link==null} onClick={handleDownload}>Download</Button>;
};








// onClick={() => goToCreatePage(video.title, video.voice?voices[video.voice]:"Adam", video.music, video.length?video.length:25, true)}

//               <div className="mt-4 flex space-x-4">
//                 <button
//                   // onClick={() => generateChapterContent(chapter.id)}
//                   className="inline-flex items-center px-3 py-2 border shadow-sm text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
//                 >
//                   <Wand2 className="w-4 h-4 mr-2" />
//                   Generate Content
//                 </button>
//                 {/* <button
//                   // onClick={() => generateAudio(chapter.id)}
//                   className="inline-flex items-center px-3 py-2 border shadow-sm text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
//                 >
//                   <Mic className="w-4 h-4 mr-2" />
//                   Generate Audio
//                 </button> */}

//                 <button
//                   // onClick={() => generateAudio(chapter.id)}
//                   className="inline-flex items-center px-3 py-2 border shadow-sm text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2" onClick={()=>{
//                     audio.src = chapter.audio;
//                     audio.play();
//                     audio.volume=0.4;
//                   }}
//                 >
//                   <Mic className="w-4 h-4 mr-2" />
//                   Listen
//                 </button>
//               </div>








// <div className="space-y-4 ">
// <h2 className="text-md font-semibold">Audio</h2>
// <div className="shadow rounded-lg p-4 mb-8 border bg-background">
  
//   <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//     <div>
//       <label className="block text-sm font-medium">Narrator</label>
//       {/* <Input
//         type="text"
//         value={book.voice}
//         // onChange={(e) => setBook(prev => ({ ...prev, title: e.target.value }))}
//         className="mt-1 block w-full rounded-md border shadow-sm focus:ring-2 focus:ring-offset-2 sm:text-sm"
//         placeholder="Enter book title"
//       /> */}
//       <div  className="flex flex-row items-center mt-1  gap-2 "> 
//         <Select value={voiceSelectBoxValue}  onValueChange={setVoiceSelectBoxValue}>
//           <SelectTrigger id="voice" >
//             <SelectValue placeholder="Choose A Voice.." />
//           </SelectTrigger>
//           <SelectContent >
//             {voices.map((option) => (
//               <SelectItem key={option} value={option}  >
//                 <div  className='flex flex-row items-center gap-1 '>{option} </div>
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//         <AudioLines onClick={()=>{
//           audio.src = "eleven3.wav";
//           audio.play();
//           audio.volume=0.4;
//         }}/> 
//         <Button variant={"outline"} >Generate</Button>
//         <Button disabled={true} variant={"outline"} >Download</Button>
//       </div>

      
  
//     </div>
//   </div>
// </div>
// </div>