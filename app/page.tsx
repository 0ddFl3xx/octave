import { Toaster } from "sonner";

import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import Player from "@/components/Player";

export default function Home() {
  return (
    <>
      <div className="h-screen flex flex-col bg-gradient-to-b from-blue-900 to-black text-white">
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <MainContent />
        </div>
        <Player />
        <Toaster position="top-right" />
      </div>
    </>
  );
}
