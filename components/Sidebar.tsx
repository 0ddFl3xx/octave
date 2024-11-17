/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Home, Search, Library, Plus, Heart } from "lucide-react";

export default async function Sidebar() {
  const user = await currentUser();
  const year = new Date().getFullYear();
  return (
    <div className="w-16 md:w-64 bg-black/30 backdrop-filter backdrop-blur-lg h-full flex flex-col">
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

      <div className="border-t border-white/20  mx-4 flex items-center justify-center md:justify-start">
        <SignedIn>
          <div className="flex items-center mt-4">
            <div className="size-6">
              <UserButton />
            </div>
            <span className="hidden md:block ml-3">{user?.firstName}</span>
          </div>
        </SignedIn>
      </div>

      <SignedOut>
        <div className="mx-4 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            <SignUpButton />
          </span>
        </div>
      </SignedOut>

      <div className="hidden mt-auto p-6 text-center md:block">
        <div className="text-xs text-gray-400">
          <p className="hidden md:block">
            © {year} Octave. All rights reserved.
          </p>
          <p>Made with ❤️ by 0ddFlexx</p>
        </div>
      </div>
    </div>
  );
}
