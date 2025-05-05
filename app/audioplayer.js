import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Play, Pause} from 'lucide-react'


export default function DarkModeAudioPlayer({link}) {
  // References
  const audioRef = useRef(null);

  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Format time in seconds to M:SS
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  // Handle play / pause
  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // When loaded, set the duration
  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  // Update current time as audio plays
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  // Seek in the audio when progress bar changes
  const handleProgressChange = (event) => {
    if (!audioRef.current) return;
    const newTime = (event.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
  };

  // Toggle mute
  const handleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Keep audio's muted state in sync with `isMuted` state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Keep audio's play/pause state in sync with `isPlaying` (when toggled externally)
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (

    <>
        {/* Hidden default controls */}
        <audio
          ref={audioRef}
          src={link}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
        />

        <div className="flex items-center space-x-4">
          {/* Play / Pause Button */}
          <Button
            onClick={handlePlayPause}
            variant={"ghost"}
            // className="bg-blue-600 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-blue-500 transition-colors"
          >
            {isPlaying ? <Pause/> : <Play/>}
          </Button>

          {/* Current Time */}
          <span className="text-sm w-12 text-right">{formatTime(currentTime)}</span>

          {/* Progress Bar */}
          <input
            type="range"
            min="0"
            max="100"
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleProgressChange}
            className="w-full h-1.5 rounded-lg cursor-pointer accent-blue-600"
          />

          {/* Total Duration */}
          <span className="text-sm w-12 text-left">{formatTime(duration)}</span>

          {/* Mute / Unmute Button */}
          {/* <button
            onClick={handleMute}
            className="bg-blue-600 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-blue-500 transition-colors"
          >
            {isMuted ? "Unmute" : "Mute"}
          </button> */}
        </div>
    </>
    
  );
};