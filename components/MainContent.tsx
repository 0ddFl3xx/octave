/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Play, Clock3 } from "lucide-react";
import { toast } from "sonner";
import { usePlayerStore } from "@/lib/usePlayerStore";
import { getFeaturedTracks, JamendoTrack } from "@/lib/jamendo";

const MainContent = () => {
  const [featuredTracks, setFeaturedTracks] = useState<JamendoTrack[]>([]);
  const { setCurrentTrack, setIsPlaying, setQueue } = usePlayerStore();

  useEffect(() => {
    const loadFeaturedTracks = async () => {
      try {
        const tracks = await getFeaturedTracks();
        setFeaturedTracks(tracks);
      } catch (error) {
        console.log(`FAILED:- loadFeaturedTracks() => ${error}`);
      }
    };
    loadFeaturedTracks();
  }, []);

  const playTrack = (track: JamendoTrack, index: number) => {
    // Convert the clicked track to your Track format
    const currentTrack = {
      id: track.id,
      name: track.name,
      artist: track.artist_name,
      duration: track.duration,
      imageUrl: track.image,
      audioUrl: track.audio,
      albumName: track.album_name,
    };

    // Convert remaining tracks to queue
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
    toast.success(`Now playing "${track.name}"`);
  };

  return (
    <>
      <div className="flex-1 overflow-auto ">
        <div className="p-8">
          <div className="flex items-center mb-8">
            <img
              src="https://images.unsplash.com/photo-1618397746666-63405ce5d015?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="cover"
              className="size-60 shadow-white/20 shadow-2xl rounded"
            />
            <div className="ml-6">
              <div className="text-sm font-bold text-gray-300">PLAYLIST</div>
              <h1 className="text-5xl font-bold text-white mt-2 mb-4">
                Discover Weekly
              </h1>
              <p className="text-gray-300">
                Your weekly mixtape of fresh music, curated by Octave.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <table className="w-full text-gray-300">
              <thead>
                <tr className="border-b border-gray-800 text-sm">
                  <th className="text-left pb-3 w-8">#</th>
                  <th className="text-left pb-3">TITLE</th>
                  <th className="text-left pb-3">Album</th>
                  <th className="text-left pb-3">ARTIST</th>
                  <th className="text-left pb-3 w-8">
                    <Clock3 className="size-5" />
                  </th>
                </tr>
              </thead>

              <tbody>
                {featuredTracks.length > 0
                  ? featuredTracks.map((track, index) => (
                      <tr
                        key={track.id}
                        className="border-b border-white/20 hover:bg-white/10 group cursor-pointer"
                        onClick={() => playTrack(track, index)}>
                        <td className="py-4 w-8">
                          <span className="group-hover:hidden">
                            {index + 1}
                          </span>
                          <Play className="size-4 hidden group-hover:block" />
                        </td>
                        <td className="py-4">
                          <div className="flex items-center">
                            <img
                              src={track.image}
                              alt={track.name}
                              className="size-10  mr-4"
                            />
                            {track.name}
                          </div>
                        </td>
                        <td className="py-4">{track.album_name}</td>
                        <td className="py-4">{track.artist_name}</td>
                        <td className="py-4 w-8">
                          {/* 
                        calculates the minutes by dividing the track's duration (in seconds) 
                        gets the remaining seconds after dividing by 60, convert to string and pad to two digits
                      */}
                          {Math.floor(track.duration / 60)}:
                          {(track.duration % 60).toString().padStart(2, "0")}
                        </td>
                      </tr>
                    ))
                  : [...Array(5)].map((_, index) => (
                      <tr key={index} className="border-b border-white/20">
                        <td className="py-4 w-8">
                          <div className="h-4 w-4 bg-white/10 animate-pulse rounded" />
                        </td>
                        <td className="py-4">
                          <div className="flex items-center">
                            <div className="size-10 mr-4 bg-white/10 animate-pulse rounded" />
                            <div className="h-4 w-32 bg-white/10 animate-pulse rounded" />
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="h-4 w-24 bg-white/10 animate-pulse rounded" />
                        </td>
                        <td className="py-4">
                          <div className="h-4 w-20 bg-white/10 animate-pulse rounded" />
                        </td>
                        <td className="py-4 w-8">
                          <div className="h-4 w-8 bg-white/10 animate-pulse rounded" />
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainContent;
