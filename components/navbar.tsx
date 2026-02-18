"use client";
import { Zap, Bell, Search, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="h-16 border-b border-white/5 bg-black/60 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-[100]">
      <div className="flex items-center gap-8">
        <h2 className="text-xl font-bold tracking-tighter text-white">
          NEXA<span className="text-purple-500">VISION</span>
        </h2>
        
        <div className="hidden md:flex items-center bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg gap-2 w-64 focus-within:border-purple-500/50 transition-all">
          <Search size={16} className="text-gray-500" />
          <input 
            type="text" 
            placeholder="البحث في مشاريعك..." 
            className="bg-transparent outline-none text-xs w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.15)]">
          <Zap size={14} className="text-purple-400 fill-purple-400" />
          <span className="text-xs font-bold text-purple-100">250 نقطة</span>
        </div>
        
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-black"></span>
        </button>

        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 p-[1px]">
          <div className="h-full w-full rounded-full bg-black flex items-center justify-center">
            <User size={16} />
          </div>
        </div>
      </div>
    </nav>
  );
}
