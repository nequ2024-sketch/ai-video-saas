"use client";
import { Download, Share2, Maximize2 } from "lucide-react";

interface PlayerProps {
  videoUrl?: string;
  thumbnail?: string;
}

export default function Player({ videoUrl, thumbnail }: PlayerProps) {
  return (
    <div className="group relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 bg-[#050505] shadow-2xl">
      {videoUrl ? (
        <video 
          src={videoUrl} 
          controls 
          className="w-full h-full object-cover"
          poster={thumbnail}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-black to-black">
          <div className="w-16 h-16 border-2 border-white/5 border-dashed rounded-full flex items-center justify-center animate-spin-slow">
            <div className="w-10 h-10 bg-purple-500/20 rounded-full blur-xl"></div>
          </div>
          <p className="mt-4 text-gray-500 text-sm font-light tracking-widest">انتظار البيانات...</p>
        </div>
      )}

      {/* الأزرار العائمة تظهر عند التحويم */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="p-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10">
          <Download size={18} />
        </button>
        <button className="p-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10">
          <Share2 size={18} />
        </button>
      </div>
    </div>
  );
}