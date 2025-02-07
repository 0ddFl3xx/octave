import { Toaster } from "sonner";

import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import Player from "@/components/Player";
import MobileContent from "@/components/MobileContent";

export default function Home() {
  return (
    <>
      <div className="h-screen flex flex-col bg-gradient-to-b from-blue-900 to-black text-white">
        <div className="flex-1 flex overflow-hidden">
          {/* PC Components */}
          <Sidebar />

          <MainContent />

          {/* Mobile Components */}
          <MobileContent />
        </div>
        <Player />
        <Toaster position="top-right" richColors={true} />
      </div>
    </>
  );
}
