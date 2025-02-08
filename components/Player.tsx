/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  MonitorSpeaker,
  Check,
} from "lucide-react";

import { usePlayerStore } from "@/lib/usePlayerStore";
import MobileNav from "./MobileNav";
import { toast } from "sonner";

export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const {
    currentTrack,
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    skipToNext,
    skipToPrevious,
  } = usePlayerStore();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack, volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setProgress(time);

    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const toggleLike = () => {
    setIsLiked((prevState) => !prevState);
    toast(isLiked ? "❌ Removed From Likes" : "❤️ Added To Likes"); // Notify user
  };

  if (!currentTrack) return null;

  return (
    <>
      {/* PC PLAYER */}
      <div className="hidden lg:block fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black to-gray-900 p-4">
        <audio
          ref={audioRef}
          src={currentTrack.audioUrl}
          onTimeUpdate={handleTimeUpdate}
        />

        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <div className="flex items-center w-1/4">
            <img
              src={currentTrack.imageUrl}
              alt={currentTrack.name}
              className="w-14 h-14 rounded"
            />
            <div className="ml-4">
              <div className="text-white font-medium">{currentTrack.name}</div>
              <div className="text-gray-400 text-sm">{currentTrack.artist}</div>
            </div>
          </div>

          {/* Track bar */}
          <div className="flex flex-col items-center w-2/4">
            <div className="flex items-center space-x-6">
              <button className="text-gray-400 hover:text-white">
                <SkipBack className="w-5 h-5" onClick={skipToPrevious} />
              </button>
              <button
                className="bg-white rounded-full p-2 hover:scale-105 transition"
                onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-black" />
                ) : (
                  <Play className="w-6 h-6 text-black" />
                )}
              </button>
              <button className="text-gray-400 hover:text-white">
                <SkipForward className="w-5 h-5" onClick={skipToNext} />
              </button>
            </div>
            <div className="w-full mt-2 flex items-center gap-2">
              <span className="text-xs text-gray-400">
                {formatTime(progress)}
              </span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={progress}
                onChange={handleProgressChange}
                className="w-full h-1 bg-blue-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
              <span className="text-xs text-gray-400">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume bar */}
          <div className="flex items-center w-1/4 justify-end">
            <Volume2 className="w-5 h-5 text-gray-400" />
            <div className="w-24 ml-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-blue-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE PLAYER */}
      <div className="block lg:hidden mx-3 rounded-md p-2 bg-gradient-to-b from-blue-600 pb-4">
        <ul>
          <li className="flex items-center gap-2">
            <img
              src={currentTrack.imageUrl}
              alt={currentTrack.name}
              className="size-12 rounded-md object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold line-clamp-1">{currentTrack.name}</p>
              <p className="text-sm text-zinc-400">{currentTrack.artist}</p>
            </div>
            <div className="flex space-x-2">
              <MonitorSpeaker />
              <div
                onClick={toggleLike}
                className={`rounded-full size-6 flex items-center justify-center transition-all ${
                  isLiked ? "bg-blue-500" : "border-white border-2"
                }`}>
                <Check className="size-4 text-white" />
              </div>
              <div  onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? (
                  // pause icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-6 text-white"
                    fill="#fff">
                    <path d="M6 3H8V21H6V3ZM16 3H18V21H16V3Z"></path>
                  </svg>
                ) : (
                  // play icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-6"
                    fill="#fff">
                    <path d="M6 20.1957V3.80421C6 3.01878 6.86395 2.53993 7.53 2.95621L20.6432 11.152C21.2699 11.5436 21.2699 12.4563 20.6432 12.848L7.53 21.0437C6.86395 21.46 6 20.9812 6 20.1957Z"></path>
                  </svg>
                )}
              </div>
            </div>
          </li>
          <div className="flex flex-col items-center w-full">
            <div className="w-full mt-2 flex items-center gap-2">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={progress}
                onChange={handleProgressChange}
                className="w-full h-1 bg-blue-300 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
            </div>
          </div>
        </ul>
      </div>
      <MobileNav />
    </>
  );
}
