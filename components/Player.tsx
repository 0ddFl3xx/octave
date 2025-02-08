/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useRef } from "react";
import {
  Volume2,
  MonitorSpeaker,
  Check,
  ChevronDown,
  EllipsisVertical,
  Repeat,
  Shuffle,
  Share2,
  Menu,
} from "lucide-react";
import { toast } from "sonner";

import { usePlayerStore } from "@/lib/usePlayerStore";
import MobileNav from "./MobileNav";
import DominantColorExtractor from "./DominantColorExtractor";

export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

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
              <button className="text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="size-8 rotate-180"
                  onClick={skipToPrevious}
                  fill="#fff">
                  <path d="M17 6 17 18H15L15 6 17 6ZM13 12 7 18V6L13 12Z"></path>
                </svg>
              </button>
              <button
                className="bg-white rounded-full p-2 hover:scale-105 transition"
                onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? (
                  // pause icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-8"
                    fill="#000">
                    <path d="M6 3H8V21H6V3ZM16 3H18V21H16V3Z"></path>
                  </svg>
                ) : (
                  // play icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-8"
                    fill="#000">
                    <path d="M6 20.1957V3.80421C6 3.01878 6.86395 2.53993 7.53 2.95621L20.6432 11.152C21.2699 11.5436 21.2699 12.4563 20.6432 12.848L7.53 21.0437C6.86395 21.46 6 20.9812 6 20.1957Z"></path>
                  </svg>
                )}
              </button>
              <button className="text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="size-8"
                  onClick={skipToNext}
                  fill="#fff">
                  <path d="M17 6 17 18H15L15 6 17 6ZM13 12 7 18V6L13 12Z"></path>
                </svg>
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
      <div
        className="block lg:hidden mx-3 rounded-md p-2 bg-gradient-to-b from-blue-600 pb-4"
        onClick={() => setIsFullScreen(true)}>
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
            <div className="flex space-x-3">
              <MonitorSpeaker />
              <div
                onClick={(e) => {
                  e.stopPropagation(); // Prevent opening fullscreen when liking
                  toggleLike();
                }}
                className={`rounded-full size-6 flex items-center justify-center transition-all ${
                  isLiked ? "bg-blue-500" : "border-white border-2"
                }`}>
                <Check className="size-4 text-white" />
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(!isPlaying);
                }}>
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

      {/* MOBILE FULLSCREEN MUSIC PLAYER */}
      {isFullScreen && (
        <DominantColorExtractor imageUrl={currentTrack.imageUrl}>
          {(dominantColor) => {
            const gradientBackground = dominantColor
              ? `linear-gradient(to bottom, ${dominantColor}, #000000)`
              : "none";

            return (
              <div
                className="h-screen fixed inset-0 flex md:hidden flex-col p-2 z-50"
                style={{ background: gradientBackground }}>
                <div className="relative flex items-center justify-center w-full mb-16">
                  <button
                    className="absolute left-4 text-white text-2xl"
                    onClick={() => setIsFullScreen(false)}>
                    <ChevronDown className="size-7" />
                  </button>

                  <div className="flex flex-col items-center mt-2">
                    <p className="uppercase text-xs">playing from playlist</p>
                    <span className="font-semibold text-xs">
                      Discover Weekly
                    </span>
                  </div>

                  <button className="absolute right-4">
                    <EllipsisVertical className="size-6" />
                  </button>
                </div>

                <div className="px-2 ">
                  <div className="mb-12 flex items-center justify-center">
                    <img
                      src={currentTrack.imageUrl}
                      alt={currentTrack.name}
                      className="size-60 rounded-lg"
                    />
                  </div>

                  {/* Song Details + Like button */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between ">
                      <div className="flex flex-col">
                        <h2 className="text-white font-bold line-clamp-1">
                          {currentTrack.name}
                        </h2>
                        <p className="text-zinc-400 text-xs">
                          {currentTrack.artist}
                        </p>
                      </div>
                      <div
                        onClick={toggleLike}
                        className={`rounded-full size-6 flex items-center justify-center transition-all ${
                          isLiked ? "bg-blue-500" : "border-white border-2"
                        }`}>
                        <Check className="size-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Music Controls */}
                  <div className="flex flex-col items-center w-full">
                    <div className="w-full flex flex-col gap-1">
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={progress}
                        onChange={handleProgressChange}
                        className="w-full h-1 bg-zinc-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                      />
                      <div className="pt-2 w-full flex items-center justify-between text-xs text-gray-400">
                        <span>{formatTime(progress)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <Shuffle className="size-5" />

                      <button className="text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="size-8 rotate-180"
                          onClick={skipToPrevious}
                          fill="#fff">
                          <path d="M17 6 17 18H15L15 6 17 6ZM13 12 7 18V6L13 12Z"></path>
                        </svg>
                      </button>
                      <button
                        className="bg-white rounded-full p-2 hover:scale-105 transition"
                        onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? (
                          // pause icon
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="size-8"
                            fill="#000">
                            <path d="M6 3H8V21H6V3ZM16 3H18V21H16V3Z"></path>
                          </svg>
                        ) : (
                          // play icon
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="size-8"
                            fill="#000">
                            <path d="M6 20.1957V3.80421C6 3.01878 6.86395 2.53993 7.53 2.95621L20.6432 11.152C21.2699 11.5436 21.2699 12.4563 20.6432 12.848L7.53 21.0437C6.86395 21.46 6 20.9812 6 20.1957Z"></path>
                          </svg>
                        )}
                      </button>
                      <button className="text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="size-8"
                          onClick={skipToNext}
                          fill="#fff">
                          <path d="M17 6 17 18H15L15 6 17 6ZM13 12 7 18V6L13 12Z"></path>
                        </svg>
                      </button>

                      <Repeat className="size-5" />
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <MonitorSpeaker className="size-5" />

                    <div className="flex gap-6">
                      <Share2 className="size-5" />
                      <Menu className="size-5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        </DominantColorExtractor>
      )}
      <MobileNav />
    </>
  );
}
