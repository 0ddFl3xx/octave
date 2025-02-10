/* eslint-disable @next/next/no-img-element */
"use client";

import { Clock3 } from "lucide-react";

import { usePlayerStore } from "@/lib/usePlayerStore";
import { JamendoTrack } from "@/lib/jamendo";
import { PCTrackListSkeleton } from "./TrackListSkeleton";
import { useFeaturedTracks } from "@/hooks/useFeaturedTracks";

const MainContent = () => {
  const { currentTrack, setCurrentTrack, setIsPlaying, setQueue, isPlaying } =
    usePlayerStore();

  const { data: featuredTracks = [], isLoading, error } = useFeaturedTracks();

  if (error)
    return (
      <div className="h-screen flex items-center justify-center text-red-500 bg-black">
        Error loading tracks
      </div>
    );

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
  };

  return (
    <>
      <div className="hidden lg:block flex-1 overflow-auto ">
        <div className="p-8">
          <div className="flex items-center mb-8">
            <img
              src="https://images.unsplash.com/photo-1618397746666-63405ce5d015?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="cover"
              className="size-60 shadow-white/20 shadow-2xl rounded"
            />
            <div className="ml-6">
              <div className="text-sm text-zinc-400">Public Playlist</div>
              <h1 className="text-5xl font-bold tracking-tighter text-white mt-2 mb-4">
                Discover Weekly
              </h1>
              <p className="text-zinc-400 text-sm">
                Your weekly mixtape of fresh music, curated by Octave.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <table className="w-full text-gray-300">
              <thead className="border-b border-gray-700">
                <tr className="text-sm text-zinc-400">
                  <th className="text-left pb-3 w-8">#</th>
                  <th className="text-left pb-3">Title</th>
                  <th className="text-left pb-3">Album</th>
                  <th className="text-left pb-3">Dated Added</th>
                  <th className="text-left pl-5 pb-3">
                    <Clock3 className="size-5" />
                  </th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <PCTrackListSkeleton />
                ) : (
                  featuredTracks.map((track, index) => (
                    <tr
                      key={track.id}
                      className=" text-zinc-400 hover:bg-white/10 hover:rounded-xl group cursor-pointer py-1"
                      onClick={() => playTrack(track, index)}>
                      <td className="w-8">
                        <span className="group-hover:hidden">{index + 1}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="size-4 hidden group-hover:block"
                          fill="#fff">
                          <path d="M6 20.1957V3.80421C6 3.01878 6.86395 2.53993 7.53 2.95621L20.6432 11.152C21.2699 11.5436 21.2699 12.4563 20.6432 12.848L7.53 21.0437C6.86395 21.46 6 20.9812 6 20.1957Z"></path>
                        </svg>
                      </td>
                      <td className="">
                        <div className="flex items-center">
                          <img
                            src={track.image}
                            alt={track.name}
                            className="size-10 rounded mr-4"
                          />
                          <div className="flex flex-col">
                            <p
                              className={` ${
                                isPlaying && currentTrack?.id === track.id
                                  ? "text-blue-500"
                                  : "text-white font-semibold line-clamp-1"
                              }`}>
                              {track.name}
                            </p>
                            <p className="text-sm">{track.artist_name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm line-clamp-1">
                        {track.album_name}
                      </td>
                      <td className="py-4 text-sm">9 hours Ago</td>
                      <td className="p-4">
                        {Math.floor(track.duration / 60)}:
                        {(track.duration % 60).toString().padStart(2, "0")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainContent;
