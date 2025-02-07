/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Home, Search, Library, Plus, Heart } from "lucide-react";

export default async function Sidebar() {
  const year = new Date().getFullYear();
  return (
    <div className="hidden lg:flex flex-col w-16 md:w-64 bg-black/30 backdrop-filter backdrop-blur-lg h-full">
      <div className="p-4 md:p-6">
        <div className="flex gap-2 mb-8 justify-center md:justify-start">
          <img
            src="/logo/transparent-logo.png"
            alt="logo"
            className="size-8 md:size-14"
          />
          <p className="text-2xl font-bold pt-3 hidden md:block">Octave</p>
        </div>

        <nav className="space-y-4">
          <Link
            href="/"
            className="flex items-center text-gray-300 hover:text-white justify-center md:justify-start">
            <Home className="size-6" />
            <span className="hidden md:block ml-3">Home</span>
          </Link>
          <Link
            href="#"
            className="flex items-center text-gray-300 hover:text-white justify-center md:justify-start">
            <Search className="size-6" />
            <span className="hidden md:block ml-3">Search</span>
          </Link>
          <Link
            href="#"
            className="flex items-center text-gray-300 hover:text-white justify-center md:justify-start">
            <Library className="size-6" />
            <span className="hidden md:block ml-3">Your Library</span>
          </Link>
        </nav>

        <div className="mt-8 space-y-4 border-t border-white/20">
          <button className="flex w-full items-center pt-5 text-gray-300 hover:text-white justify-center md:justify-start">
            <Plus className="size-6" />
            <span className="hidden md:block ml-3">Create Playlist</span>
          </button>
          <button className="flex w-full items-center text-gray-300 hover:text-white justify-center md:justify-start">
            <Heart className="size-6" />
            <span className="hidden md:block ml-3">Liked Songs</span>
          </button>
        </div>
      </div>

      <div className="hidden mt-auto p-6 text-center md:block">
        <div className="text-xs text-gray-400">
          <p className="hidden md:block">
            © {year} Octave. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
