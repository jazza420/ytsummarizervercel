// 'use client'

// import { useState, useEffect, useRef } from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Switch } from "@/components/ui/switch"
// import { ChevronLeft, Expand, Maximize2, Pause, Play,ClipboardCopy, Copy, MessageCircleQuestion, CircleAlert, Trash, Trash2, RefreshCcw, ThumbsUp, ThumbsDown, WandSparkles } from 'lucide-react'
// import { Textarea } from "@/components/ui/textarea"
// import ModernTextarea from "./modern-textarea"
// import {redirectToTikTokAuth} from './tiktok/redirect'
// import styles from './main.module.css';


// const voices = ["Adam", "Luna", "Gus", "Mike", "Neil", "David", "Elon", "Asteria", "Orpheus", "Angus", "Arcas", "Athena", "Helios", "Hera", "Orion", "Perseus", "Stella", "Zeus"];

// function getMinutesOld(date: Date) {
//   const now = new Date();
//   const diffInMilliseconds = now.getTime() - date.getTime();
//   const diffInMinutes = Math.floor(diffInMilliseconds / 1000 / 60); // convert to minutes
//   return diffInMinutes;
// }

// const characterNames = ["Elon", "Joe Rogan", "Neil De Grasse Tyson", "Kanye", "David Goggins", "Ben Shapiro", "Donald Trump", "Dr Phil", "Mr Beast"]
// const characters = ["elon", "rogan", "neil", "kanye", "goggins", "shapiro", "trump", "dr_phil", "mr_beast"]


// interface VideoInfo {
//   id: string,
//   title: string, 
//   chapters: any
//   // video: string,//`https://videos24238746.s3.amazonaws.com/${formattedDate}/${item.id}/final_output.mp4`, 
//   // script: string,
//   // description: string,
//   // createdDate: Date,
//   // thumbnail: string,
//   // length: number,
//   // music: string,
//   // voice: string,
//   // tiktok_publish_id: string,
//   // character: string
// }



// export default function ShortViewer({ video, refresh,  goToCreatePage, isPortrait, setPopup}: {video_link: string, default_caption: string, video : VideoInfo, refresh: () => void, goToCreatePage: (topic : string, voice: string, music: string | null, length : number, moreOptions : boolean) => void, isPortrait: boolean, setPopup: any}) {
//     const videoRef = useRef<HTMLVideoElement>(null);
//     const [status, setStatus] = useState("loading");
//     const [status2, setStatus2] = useState("0");

//     const [tiktokStatus, setTiktokStatus] = useState(null);
//     //const [caption, setCaption] = useState("cock and balls")
//     const [uiState, setUIState] = useState("main");



//     useEffect(() => {
//       // getVideoStatus();

//       // let refreshTimer = setInterval(async () => {
//       //   await getVideoStatus();
        
//       // }, 7000);
  
//       // return () => {
//       //   clearInterval(refreshTimer);
//       // };

//     }, []);

//     // const getVideoStatus = async () => {
//     //   // const response = await fetch('/api/get-video-status', {
//     //   //   method: 'POST',
//     //   //   headers: {
//     //   //     'Content-Type': 'application/json',
//     //   //   },
//     //   //   body: JSON.stringify({ url: video.video }),
//     //   // });
//     //   // const result = await response.json();
//     //   //console.log(JSON.stringify(result));




//     //   let minutesOld = getMinutesOld(video.createdDate);
  
//     //   if (video.video) {
//     //     setStatus('complete');
//     //   }
//     //   else if(minutesOld < 15) {
//     //     // const response = await fetch('/api/get-job-status', {
//     //     //   method: 'POST',
//     //     //   headers: {
//     //     //   'Content-Type': 'application/json',
//     //     //   },
//     //     //   body: JSON.stringify({ job_id: video.id }),
          
//     //     // });
//     //     // const data = await response.json();
//     //     // if(data && data.output && data.output.length < 5)
//     //     //   setStatus2(data.output);
//     //     // else if (data && data.output) {
//     //     //   video.video = data.output;
//     //     //   setStatus('complete');
//     //     //   refresh();
//     //     // }
//     //     // if(data && data.error)
//     //     //   setStatus(data.error)
//     //     setStatus("loading");
//     //     refresh();
//     //   }
//     //   // else if(minutesOld < 8) {
//     //   //   setStatus("loading");
//     //   // }
//     //   else {
//     //     setStatus("error");
//     //   }



//     //   if(video.tiktok_publish_id) {
//     //     const response2 = await fetch('/api/query-tiktok-post-status', {
//     //       method: 'POST',
//     //       headers: {
//     //         'Content-Type': 'application/json',
//     //       },
//     //       body: JSON.stringify({ publish_id: video.tiktok_publish_id }),
//     //     });
//     //     const result = await response2.json();
//     //     //console.log(JSON.stringify(result));
//     //     setTiktokStatus(result.data.status);
//     //   }


  
  
//     //   // if (result.error) {
//     //   //   setStatus(minutesOld > 5 ? "failed" : "not found");
//     //   // }
//     //   // else if (result.status === 'complete') {
//     //   //   setStatus('complete');
//     //   // }
//     //   // else if (result.status === 'not found') {
//     //   //   setStatus(minutesOld > 5 ? "failed" : "not found");
//     //   // }
//     //   // refreshComponent();
//     //   //refresh();
      
//     // }







//     //bg-black
//     //style={{ width: '100%' }}
//     //style={{ width: '100%' }}
//     return (
//         <div className={`flex flex-col md:flex-row gap-6 ${isPortrait?'p-3':'p-8'} max-w-10xl mx-auto my-3 bg-background w-full items-center justify-center`} >
//             <div className="flex-1 max-w-80 " >
//                 {/* <div className="p-0"> */}
//                     {/* <div className="relative " style={{ aspectRatio: '9/16', margin: '0 auto' }}> */}
//                     {/* <video
//                         ref={videoRef}
//                         src="https://videos24238746.s3.amazonaws.com/10-24/85299c13-c2e5-41ab-807d-aa5da7f9aee3-u1/final_output.mp4"
//                         className="w-full h-full object-contain"
//                         controls

//                         <div  style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent:"center", alignContent:"center", margin: "5"}}>
//                     /> */}
//                     <div className="flex flex-col items-center justify-center h-full w-full p-0.5">
                      
//                       {status=="complete" && (
//                         <>
//                         <video controls>
//                           <source src={video.video} key={video.video} type="video/mp4" />
//                         </video>
//                         {/* <p>please download if you have trouble palying the video</p> */}
//                         {/* <div className={styles.downloadButton}>
//                           <a href={video.video}><FontAwesomeIcon icon={faDownload}/> Download</a>
//                         </div> */}
//                         </>
//                       )}
//                       {status=="loading" && (
//                         <>
//                         <div className={styles.spinnerContainer}>
//                           <div className={styles.spinner}></div>
//                         </div>
//                         <p style={{ marginBottom: '0' }}>Generating your video...</p>
//                         {/* <p style={{ marginTop: '0' }}>{status2}% done</p> */}
//                         </>
//                       )}

//                       {(status!="loading" && status!="complete") && (
//                         <>
//                         <p>Sorry there was a problem generating this video and your credit has been refunded. This may be incorrect so make sure to refresh.</p>
//                         {/* {<div className={styles.downloadButton}>
//                         Retry
//                         </div>} */}
//                         </>
//                       )}

//                     </div>


//             </div>
//                     {/* <div className="p-4 text-sm text-muted-foreground">
//                     <div className="flex justify-between">
//                         <span>Filename</span>
//                         <span>final_output.mp4</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span>Format</span>
//                         <span>MP4</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span>Resolution</span>
//                         <span>Portrait</span>
//                     </div>
//                     </div> */}
//                 {/* </div> */}
//             {/* </div> */}
//             {uiState == "tiktok" && <TikTokUpload video_link={video.video} default_caption={video.description} setUIState={setUIState} isPortrait={isPortrait}/>}
//             {uiState == "main" && 
//               <div className="flex-1 p-2 space-y-4 w-full">
//                 <div className="space-y-2">
//                   {/* <Label htmlFor="readonly-textarea"><div className="flex flex-row gap-1">Title <div className={styles.tooltip}> <CircleAlert className=" h-4 w-4" /> <span>Video Title</span></div> </div></Label> */}
//                   <Label htmlFor="readonly-textarea"><div className="flex flex-row gap-1">Character <div className={styles.tooltip}> <CircleAlert className=" h-4 w-4" /> <span>Character</span></div> </div></Label>
//                   <Input
//                     id="readonly-textarea"
//                     readOnly
//                     value={characterNames[characters.indexOf(video.character)]}
//                     className="resize-none text-muted-foreground"
//                     // rows={1}
//                     aria-readonly="true"
//                   />
//                 </div>
//                 {/* <div className="space-y-2">
//                   <Label htmlFor="readonly-textarea3">
//                     <div className="flex flex-row gap-1">Suggested Caption 

//                       <div className={styles.tooltip}> <CircleAlert className="h-4 w-4" /> <span>Suggested auto generated caption</span></div>

//                       <div className={styles.tooltip}> <Copy onClick={() => {navigator.clipboard.writeText(video.description) }} className=" h-4 w-4 cursor-pointer" /> <span>Copy Caption</span></div> 
                      
//                     </div>
//                   </Label>

//                   <Textarea
//                     id="readonly-textarea3"
//                     readOnly
//                     value={video.description}
//                     className="resize-none text-muted-foreground"
//                     rows={3}
//                     aria-readonly="true"
//                   />
//                 </div> */}
//                 <div className="space-y-2">
//                   <Label htmlFor="readonly-textarea2"><div className="flex flex-row gap-1">Script <div className={styles.tooltip}> <CircleAlert className=" h-4 w-4" /> <span>This is the AI generated script for your video</span></div> </div></Label>
//                   <div>
//                     <Textarea
//                     id="readonly-textarea2"
//                     readOnly
//                     value={video.script}
//                     className="resize-none text-muted-foreground"
//                     rows={isPortrait?5:18}
//                     aria-readonly="true"
//                    />
//                   </div>
//                 </div>
//                 {video.video && 
//                   <div className='flex flex-row flex-wrap items-center justify-between space-y-1'>
//                     <div className='flex flex-wrap flex-row gap-1 items-center'>
//                       <a href={video.video}><Button variant="secondary" /*className={styles.greyButton} */  > Download</Button></a>
//                       {/* <Button variant={"outline"} onClick={
//                         () =>{
//                           // setPopup(["Warning", "This feature currently only supports private accounts while we await approval from TikTok", [["Proceed", ()=>{setPopup(null); setUIState("tiktok")}]] ]);
//                           setUIState("tiktok");
//                         }
//                         }>Post to TikTok</Button> */}
//                       {/* <Button variant={"outline"} >Regenerate</Button>
//                       {tiktokStatus&&("TikTok status: "+tiktokStatus)} */}
//                     </div>

//                     <div className='flex flex-row items-center gap-1 justify-between'>
//                       <Button variant={'outline'}><ThumbsUp className="h-4 w-4" /></Button>
//                       <Button variant={'outline'}><ThumbsDown className="h-4 w-4" /></Button>
//                       <Button variant={'outline'}><Trash2 className="h-4 w-4" /></Button>
//                     </div>
//                   </div>
//                 }
//               </div>
//             }
//         </div>
            
//     )
// }


// //onClick={() => goToCreatePage(video.title, video.voice?voices[video.voice]:"Adam", video.music, video.length?video.length:25, true)}

// interface CreatorInfo {
//     stitch_disabled: boolean;
//     comment_disabled: boolean;
//     creator_avatar_url: string;
//     creator_nickname: string;
//     creator_username: string;
//     duet_disabled: boolean;
//     max_video_post_duration_sec: number;
//     privacy_level_options: string[];
//   }

// export function TikTokUpload({video_link, default_caption, setUIState, isPortrait}: {video_link: string, default_caption: string, setUIState: (state:string) => void , isPortrait: boolean}) {
//   const [caption, setCaption] = useState(default_caption)
//   const [privacy, setPrivacy] = useState('NONE')
//   const [allowComment, setAllowComment] = useState(false)
//   const [allowDuet, setAllowDuet] = useState(false)
//   const [allowStitch, setAllowStitch] = useState(false)
//   const [discloseContent, setDiscloseContent] = useState(false)
//   const [yourBrand, setYourBrand] = useState(false)
//   const [brandedContent, setBrandedContent] = useState(false)
//   //const [isPlaying, setIsPlaying] = useState(false)
//   //const [currentTime, setCurrentTime] = useState(0)
//   //const [duration, setDuration] = useState(56)
//   const [creatorInfo, setCreatorInfo] = useState<CreatorInfo | null>(null)
//   const [creatorInfoLoaded, setCreatorInfoLoaded] = useState<boolean>(false)
//   const [isUploading, setIsUploading] = useState(false)
  

//   useEffect(() => {
//     getCreatorInfo()
//   }, [])

//   useEffect(() => {
//     if (creatorInfo) {
//       // setAllowComment(!creatorInfo.comment_disabled)
//       // setAllowDuet(!creatorInfo.duet_disabled)
//       // setAllowStitch(!creatorInfo.stitch_disabled)
//     }
//   }, [creatorInfo])

//   useEffect(() => {
//     if (discloseContent && brandedContent && privacy === 'SELF_ONLY') {
//       setPrivacy('MUTUAL_FOLLOW_FRIENDS')
//     }
//   }, [discloseContent, brandedContent, privacy])

//   const getCreatorInfo = async () => {
//     const response = await fetch('/api/query-tiktok-creator-info', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     if (response.status === 200) {
//       const data = await response.json();
//       setCreatorInfo(data.data);
//     } else {
//       //console.error('Failed to fetch creator info');
//       //window.alert("Failed to fetch creator info. Please try again.");
//     }
//     setCreatorInfoLoaded(true);

//   }

//   const handlePrivacyChange = (value: string) => {
//     if (discloseContent && brandedContent && value === 'SELF_ONLY') {
//       window.alert("Branded content visibility cannot be set to private.");
//       return
//     }

//     setPrivacy(value)
//   }

//   const handleDiscloseContent = (checked: boolean) => {
//     setDiscloseContent(checked)
//     if (!checked) {
//       setYourBrand(false)
//       setBrandedContent(false)
//     }
//   }

//   const uploadTikTok = async (video_link: string, title: string, privacy_level: string, disable_comment: boolean, brand_content_toggle: boolean, brand_organic_toggle: boolean) => {
   
//     const response = await fetch('/api/tiktok-video-upload', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ video_link, title, privacy_level, disable_comment, brand_content_toggle, brand_organic_toggle }),
//     });

//     if(response.status != 200) {
//       window.alert((await response.json()).error);
//     }

//     return response.status === 200
//   }

//   const handleUpload = async () => {
//     if (discloseContent && brandedContent && privacy === 'SELF_ONLY') {
//       window.alert("Branded content visibility cannot be set to private.");
//       if(creatorInfo?.privacy_level_options?.includes("PUBLIC_TO_EVERYONE"))
//         setPrivacy("PUBLIC_TO_EVERYONE")
//       else setPrivacy("FOLLOWER_OF_CREATOR")
//       return
//     }

//     if (discloseContent && !yourBrand && !brandedContent) {
//       window.alert("You need to indicate if your content promotes yourself, a third party, or both.");
//       return
//     }

//     if(privacy=="NONE") {
//       window.alert("You must select a privacy setting");
//       return
//     }

//     setIsUploading(true)

//     try {
//       const success = await uploadTikTok(
//         video_link, // Replace with actual video link
//         caption,
//         privacy,
//         !allowComment,
//         brandedContent,
//         yourBrand
//       )

//       if (success) {
//         window.alert("Your video has been uploaded to TikTok!");
//       } else {
//         throw new Error("Upload failed")
//       }
//     } catch (error) {
//       console.error('Upload failed:', error)
//       //window.alert(error);
//     } finally {
//       setIsUploading(false)
//     }
//   }



//   const formatPrivacyOption = (option: string) => {
//     switch (option) {
//       case 'PUBLIC_TO_EVERYONE':
//         return 'Public'
//       case 'FOLLOWER_OF_CREATOR':
//         return 'Followers'
//       case 'MUTUAL_FOLLOW_FRIENDS':
//         return 'Friends'
//       case 'SELF_ONLY':
//         return 'Private'
//       default:
//         return option
//     }
//   }

// //   const togglePlayPause = () => {
// //     if (videoRef.current) {
// //       if (isPlaying) {
// //         videoRef.current.pause()
// //       } else {
// //         videoRef.current.play()
// //       }
// //       setIsPlaying(!isPlaying)
// //     }
// //   }

// //   const handleTimeUpdate = () => {
// //     if (videoRef.current) {
// //       setCurrentTime(videoRef.current.currentTime)
// //     }
// //   }

// //   const handleLoadedMetadata = () => {
// //     if (videoRef.current) {
// //       setDuration(videoRef.current.duration)
// //     }
// //   }

// //   const formatTime = (time: number) => {
// //     const minutes = Math.floor(time / 60)
// //     const seconds = Math.floor(time % 60)
// //     return `${minutes}:${seconds.toString().padStart(2, '0')}`
// //   }
  
//   return (
//       <div className="flex-1">
//         <div className={`${isPortrait?'p-1':'p-6'} space-y-4`}>
//           <div className="flex items-center justify-between">
//             <Button onClick = {()=>setUIState("main")}variant="ghost" size="sm">
//               <ChevronLeft className="mr-2 h-4 w-4" />
//               Upload to TikTok
//             </Button>
//             {/* <div className="flex space-x-2">
//               <Button variant="ghost" size="icon">
//                 <Expand className="h-4 w-4" />
//               </Button>
//             </div> */}
//           </div>
//           {creatorInfo && 
//           <>
//             <div className="flex items-center space-x-4">
//               <Avatar>
//                 <AvatarImage src={creatorInfo?.creator_avatar_url || "/placeholder.svg"} alt={creatorInfo?.creator_nickname} />
//                 <AvatarFallback>{creatorInfo?.creator_nickname?.slice(0, 2).toUpperCase()}</AvatarFallback>
//               </Avatar>
//               <div className="flex-1">
//                 <p className="font-semibold">{creatorInfo?.creator_nickname}</p>
//                 <p className="text-sm text-muted-foreground">@{creatorInfo?.creator_username}</p>
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="caption">Caption</Label>
//               <Input
//                 id="caption"
//                 placeholder="Add a title that describes your video"
//                 value={caption}
//                 onChange={(e) => setCaption(e.target.value)}
//                 maxLength={100}
//               />
//               <div className="text-right text-sm text-muted-foreground">
//                 {caption.length}/500
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="privacy">Who can view this video</Label>
//               <Select value={privacy}  onValueChange={handlePrivacyChange}>
//                 <SelectTrigger id="privacy">
//                   <SelectValue placeholder="Choose A Privacy Setting.." />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {creatorInfo?.privacy_level_options.map((option) => (
//                     <SelectItem key={option} value={option}>
//                       {formatPrivacyOption(option)}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <Label>Allow users to</Label>
//               <div className="flex space-x-4">
//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     id="comment"
//                     checked={allowComment}
//                     onCheckedChange={(checked) => setAllowComment(checked as boolean)}
//                     disabled={creatorInfo?.comment_disabled}
//                   />
//                   <Label htmlFor="comment">Comment</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     id="duet"
//                     checked={allowDuet}
//                     onCheckedChange={(checked) => setAllowDuet(checked as boolean)}
//                     disabled={creatorInfo?.duet_disabled}
//                   />
//                   <Label htmlFor="duet">Duet</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     id="stitch"
//                     checked={allowStitch}
//                     onCheckedChange={(checked) => setAllowStitch(checked as boolean)}
//                     disabled={creatorInfo?.stitch_disabled}
//                   />
//                   <Label htmlFor="stitch">Stitch</Label>
//                 </div>
//               </div>
//             </div>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <Label htmlFor="disclose-content">Disclose video content</Label>
//                 <Switch
//                   id="disclose-content"
//                   checked={discloseContent}
//                   onCheckedChange={handleDiscloseContent}
//                 />
//               </div>
//               {discloseContent && (
//                 <Card className="p-4 space-y-4 bg-muted">
//                   <div className="text-sm flex flex-row items-center">
//                   <CircleAlert className=" h-4 w-4 mr-1 " color='#aaaaffff' /> Your video will be labeled &quot;Promotional content&quot;. This cannot be changed once the video is posted.
//                   </div>
//                   <p className="text-sm">
//                     Turn on to disclose that this video promotes goods or
//                     services in exchange for something of value. Your video
//                     could promote yourself, a third party, or both.
//                   </p>
//                   <div className="space-y-2">
//                     <div className="flex items-center space-x-2">
//                       <Checkbox
//                         id="your-brand"
//                         checked={yourBrand}
//                         onCheckedChange={(checked) => setYourBrand(checked as boolean)}
//                       />
//                       <div>
//                         <Label htmlFor="your-brand">Your brand</Label>
//                         <p className="text-sm text-muted-foreground">
//                           You are promoting yourself or your own business. This
//                           video will be classified as Brand Organic.
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Checkbox
//                         id="branded-content"
//                         checked={brandedContent}
//                         onCheckedChange={(checked) => setBrandedContent(checked as boolean)}
//                       />
//                       <div>
//                         <Label htmlFor="branded-content">Branded content</Label>
//                         <p className="text-sm text-muted-foreground">
//                           You are promoting another brand or a third party. This
//                           video will be classified as Branded Content.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </Card>
//               )}
//             </div>
//             <div className="pt-4">
//               <p className="text-sm text-muted-foreground mb-4">
//                 By posting, you agree to our{' '}
//                 {brandedContent ? (
//                   <>
//                     <a href="https://www.tiktok.com/legal/page/global/bc-policy/en" className="text-primary hover:underline">Branded Content Policy</a> and{' '}
//                   </>
//                 ) : null}
//                 <a href="https://www.tiktok.com/legal/page/global/music-usage-confirmation/en" className="text-primary hover:underline">Music Usage Confirmation</a>.
//               </p>
//               <Button className="w-full" onClick={handleUpload} disabled={isUploading || (discloseContent && !yourBrand && !brandedContent)}>
//                 {isUploading ? 'Uploading...' : 'Upload'}
//               </Button>
//             </div>
//           </>
//           }
//           {/* {(creatorInfo==null && !creatorInfoLoaded) && <div className="flex items-center justify-center h-full"><div  className={`${styles.spinnerContainer}`}>
//                           <div className={styles.spinner}></div>
//                         </div></div>} */}
//           {(creatorInfo==null && creatorInfoLoaded) &&
//               <div className="pt-4 space-y-2">
//                 <Label htmlFor="disclose-content">Login to TikTok to use this feature</Label>
//                 <Button className="w-full" onClick={redirectToTikTokAuth} disabled={isUploading}>
//                   Login to Tiktok
//                 </Button>
//               </div>
//           }

//         </div>
        
//       </div>
//   )
// }