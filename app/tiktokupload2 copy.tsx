'use client'

import { useState, useEffect, useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ChevronLeft, Expand, Maximize2, Pause, Play } from 'lucide-react'

interface CreatorInfo {
  stitch_disabled: boolean;
  comment_disabled: boolean;
  creator_avatar_url: string;
  creator_nickname: string;
  creator_username: string;
  duet_disabled: boolean;
  max_video_post_duration_sec: number;
  privacy_level_options: string[];
}

export default function TikTokUpload2({video_link, default_caption}: {video_link: string, default_caption: string}) {
  const [caption, setCaption] = useState(default_caption)
  const [privacy, setPrivacy] = useState('SELF_ONLY')
  const [allowComment, setAllowComment] = useState(true)
  const [allowDuet, setAllowDuet] = useState(false)
  const [allowStitch, setAllowStitch] = useState(false)
  const [discloseContent, setDiscloseContent] = useState(false)
  const [yourBrand, setYourBrand] = useState(false)
  const [brandedContent, setBrandedContent] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(56)
  const [creatorInfo, setCreatorInfo] = useState<CreatorInfo | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    getCreatorInfo()
  }, [])

  useEffect(() => {
    if (creatorInfo) {
      setAllowComment(!creatorInfo.comment_disabled)
      setAllowDuet(!creatorInfo.duet_disabled)
      setAllowStitch(!creatorInfo.stitch_disabled)
    }
  }, [creatorInfo])

  useEffect(() => {
    if (discloseContent && brandedContent && privacy === 'SELF_ONLY') {
      setPrivacy('FOLLOWER_OF_CREATOR')
    }
  }, [discloseContent, brandedContent, privacy])

  const getCreatorInfo = async () => {
    const response = await fetch('/api/query-tiktok-creator-info', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      setCreatorInfo(data.data);
    } else {
      console.error('Failed to fetch creator info');
      window.alert("Failed to fetch creator info. Please try again.");
    }
  }

  const handlePrivacyChange = (value: string) => {
    if (discloseContent && brandedContent && value === 'SELF_ONLY') {
      window.alert("Branded content visibility cannot be set to private.");
      return
    }
    setPrivacy(value)
  }

  const handleDiscloseContent = (checked: boolean) => {
    setDiscloseContent(checked)
    if (!checked) {
      setYourBrand(false)
      setBrandedContent(false)
    }
  }

  const uploadTikTok = async (video_link: string, title: string, privacy_level: string, disable_comment: boolean, brand_content_toggle: boolean, brand_organic_toggle: boolean) => {
    const response = await fetch('/api/tiktok-video-upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ video_link, title, privacy_level, disable_comment, brand_content_toggle, brand_organic_toggle }),
    });

    return response.status === 200;
  }

  const handleUpload = async () => {
    if (discloseContent && !yourBrand && !brandedContent) {
      window.alert("You need to indicate if your content promotes yourself, a third party, or both.");
      return
    }

    setIsUploading(true)

    try {
      const success = await uploadTikTok(
        video_link, // Replace with actual video link
        caption,
        privacy,
        !allowComment,
        brandedContent,
        yourBrand
      )

      if (success) {
        window.alert("Your video has been uploaded to TikTok!");
      } else {
        throw new Error("Upload failed")
      }
    } catch (error) {
      console.error('Upload failed:', error)
      window.alert("Failed to upload video. Please try again.");
    } finally {
      setIsUploading(false)
    }
  }



  const formatPrivacyOption = (option: string) => {
    switch (option) {
      case 'FOLLOWER_OF_CREATOR':
        return 'Followers'
      case 'MUTUAL_FOLLOW_FRIENDS':
        return 'Friends'
      case 'SELF_ONLY':
        return 'Private'
      default:
        return option
    }
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }
  
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 max-w-10xl mx-auto bg-background">
      <div className="flex-1" style={{ maxWidth: '25%'}}>
        <div className="p-0">
          <div className="relative bg-black" style={{ aspectRatio: '9/16', margin: '0 auto' }}>
            <video
              ref={videoRef}
              src="https://videos24238746.s3.amazonaws.com/10-24/85299c13-c2e5-41ab-807d-aa5da7f9aee3-u1/final_output.mp4"
              className="w-full h-full object-contain"
              controls
            />
          </div>
          {/* <div className="p-4 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Filename</span>
              <span>final_output.mp4</span>
            </div>
            <div className="flex justify-between">
              <span>Format</span>
              <span>MP4</span>
            </div>
            <div className="flex justify-between">
              <span>Resolution</span>
              <span>Portrait</span>
            </div>
          </div> */}
        </div>
      </div>
      <div className="flex-1">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Upload to TikTok
            </Button>
            {/* <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Expand className="h-4 w-4" />
              </Button>
            </div> */}
          </div>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={creatorInfo?.creator_avatar_url || "/placeholder.svg"} alt={creatorInfo?.creator_nickname} />
              <AvatarFallback>{creatorInfo?.creator_nickname?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold">{creatorInfo?.creator_nickname}</p>
              <p className="text-sm text-muted-foreground">@{creatorInfo?.creator_username}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="caption">Caption</Label>
            <Input
              id="caption"
              placeholder="Add a title that describes your video"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              maxLength={100}
            />
            <div className="text-right text-sm text-muted-foreground">
              {caption.length}/100
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="privacy">Who can view this video</Label>
            <Select value={privacy} onValueChange={handlePrivacyChange}>
              <SelectTrigger id="privacy">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {creatorInfo?.privacy_level_options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {formatPrivacyOption(option)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Allow users to</Label>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="comment"
                  checked={allowComment}
                  onCheckedChange={(checked) => setAllowComment(checked as boolean)}
                  disabled={creatorInfo?.comment_disabled}
                />
                <Label htmlFor="comment">Comment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="duet"
                  checked={allowDuet}
                  onCheckedChange={(checked) => setAllowDuet(checked as boolean)}
                  disabled={creatorInfo?.duet_disabled}
                />
                <Label htmlFor="duet">Duet</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="stitch"
                  checked={allowStitch}
                  onCheckedChange={(checked) => setAllowStitch(checked as boolean)}
                  disabled={creatorInfo?.stitch_disabled}
                />
                <Label htmlFor="stitch">Stitch</Label>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="disclose-content">Disclose video content</Label>
              <Switch
                id="disclose-content"
                checked={discloseContent}
                onCheckedChange={handleDiscloseContent}
              />
            </div>
            {discloseContent && (
              <Card className="p-4 space-y-4 bg-muted">
                <p className="text-sm">
                  Turn on to disclose that this video promotes goods or
                  services in exchange for something of value. Your video
                  could promote yourself, a third party, or both.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="your-brand"
                      checked={yourBrand}
                      onCheckedChange={(checked) => setYourBrand(checked as boolean)}
                    />
                    <div>
                      <Label htmlFor="your-brand">Your brand</Label>
                      <p className="text-sm text-muted-foreground">
                        You are promoting yourself or your own business. This
                        video will be classified as Brand Organic.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="branded-content"
                      checked={brandedContent}
                      onCheckedChange={(checked) => setBrandedContent(checked as boolean)}
                    />
                    <div>
                      <Label htmlFor="branded-content">Branded content</Label>
                      <p className="text-sm text-muted-foreground">
                        You are promoting another brand or a third party. This
                        video will be classified as Branded Content.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
          <div className="pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              By posting, you agree to our{' '}
              {brandedContent ? (
                <>
                  <a href="#" className="text-primary hover:underline">Branded Content Policy</a> and{' '}
                </>
              ) : null}
              <a href="#" className="text-primary hover:underline">Music Usage Confirmation</a>.
            </p>
            <Button className="w-full" onClick={handleUpload} disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}