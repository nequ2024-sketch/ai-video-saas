"use client";
import { Lock, Mail, ArrowRight, Activity } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center p-6 relative">
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-900 p-12 rounded-[4rem] shadow-2xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black italic uppercase tracking-tighter">
            NEURO <span className="text-purple-600">LABS</span>
          </h1>
          <p className="mt-4 text-[9px] text-zinc-600 uppercase tracking-[0.5em] flex items-center justify-center gap-2">
            <Activity size={12} className="text-green-500" /> SECURE_GATEWAY // ZARQA_NODE
          </p>
        </div>
        <div className="space-y-6">
          <input type="email" placeholder="ACCESS_ID" className="w-full bg-black border-2 border-zinc-900 rounded-[2rem] py-6 px-8 text-sm outline-none focus:border-purple-600 transition-all" />
          <input type="password" placeholder="ENCRYPTION_KEY" className="w-full bg-black border-2 border-zinc-900 rounded-[2rem] py-6 px-8 text-sm outline-none focus:border-purple-600 transition-all" />
          <button className="w-full bg-white text-black font-black py-7 rounded-[2rem] text-[11px] uppercase tracking-[0.5em] hover:bg-purple-600 hover:text-white transition-all flex items-center justify-center gap-4">
            INITIALISE <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}