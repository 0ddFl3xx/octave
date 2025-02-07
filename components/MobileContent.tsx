/* eslint-disable @next/next/no-img-element */
"use client";

import { UserPlus, EllipsisVertical, Shuffle, Download } from "lucide-react";
import { usePlayerStore } from "@/lib/usePlayerStore";
import { JamendoTrack } from "@/lib/jamendo";
import { MobileTrackListSkeleton } from "./TrackListSkeleton";
import { useFeaturedTracks } from "@/hooks/useFeaturedTracks";

const MobileContent = () => {
  const { setCurrentTrack, setIsPlaying, setQueue, isPlaying, currentTrack } =
    usePlayerStore();

  const { data: featuredTracks = [], isLoading, error } = useFeaturedTracks();

  if (error)
    return (
      <div className="h-screen flex items-center justify-center text-red-500 bg-black">
        Error loading tracks
      </div>
    );

  const playTrack = (track: JamendoTrack, index: number) => {
    const currentTrack = {
      id: track.id,
      name: track.name,
      artist: track.artist_name,
      duration: track.duration,
      imageUrl: track.image,
      audioUrl: track.audio,
      albumName: track.album_name,
    };

    const remainingTracks = featuredTracks.slice(index + 1).map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artist_name,
      duration: track.duration,
      imageUrl: track.image,
      audioUrl: track.audio,
      albumName: track.album_name,
    }));

    setCurrentTrack(currentTrack);
    setQueue(remainingTracks);
    setIsPlaying(true);
  };

  return (
    <>
      <div className="block lg:hidden flex-1 overflow-auto py-4">
        {/* Playlist Hero */}
        <div className="px-8">
          <div className="flex-col mb-4">
            <div className="flex items-center justify-center mb-4">
              <img
                src="https://images.unsplash.com/photo-1618397746666-63405ce5d015?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="cover"
                className="size-60 rounded"
              />
            </div>
            <div className="mb-2">
              <h1 className="text-3xl font-bold tracking-tight text-white my-2">
                Discover Weekly
              </h1>
              <p className="text-zinc-400 text-sm">
                Your weekly mixtape of fresh music, curated by Octave.
              </p>
            </div>
            <div className="flex space-x-2">
              <img
                src="https://picsum.photos/200/300"
                alt="placeholder"
                className="size-6 rounded-full"
              />
              <p className="font-bold tracking-tight">John Doe</p>
            </div>
          </div>

          {/* Icons */}
          <div className="flex justify-between items-center flex-nowrap w-full">
            {/* Left Icons Group */}
            <div className="flex space-x-4 items-center">
              <video
                src="https://videos.pexels.com/video-files/7569779/7569779-sd_506_960_25fps.mp4"
                className="h-10 w-8 object-cover rounded border-2 border-zinc-400"
                autoPlay
                loop
                muted
              />
              <Download className="size-5" />
              <UserPlus className="size-5" />
              <EllipsisVertical className="size-5" />
            </div>

            {/* Right Icons Group */}
            <div className="flex items-center space-x-4">
              <Shuffle className="size-5" />
              <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="size-6"
                  fill="#fff">
                  <path d="M6 20.1957V3.80421C6 3.01878 6.86395 2.53993 7.53 2.95621L20.6432 11.152C21.2699 11.5436 21.2699 12.4563 20.6432 12.848L7.53 21.0437C6.86395 21.46 6 20.9812 6 20.1957Z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Music */}
          <div className="pt-6">
            <ul className="space-y-4">
              {isLoading ? (
                <MobileTrackListSkeleton />
              ) : (
                featuredTracks.map((track, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-4"
                    onClick={() => playTrack(track, index)}>
                    <img
                      src={track.image}
                      alt={track.name}
                      className="size-10 rounded-md"
                    />
                    <div className="flex-1">
                      <p
                        className={`font-semibold ${
                          isPlaying && currentTrack?.id === track.id
                            ? "text-blue-500"
                            : ""
                        }`}>
                        {track.name}
                      </p>
                      <p className="text-sm text-zinc-400">
                        {track.artist_name}
                      </p>
                    </div>
                    <EllipsisVertical className="size-5" />
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileContent;
