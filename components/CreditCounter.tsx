"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Zap, PlusCircle } from "lucide-react";

export default function CreditCounter() {
  const [credits, setCredits] = useState<number | null>(null); const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCredits() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('credits')
          .eq('id', user.id)
          .single();
        if (data) setCredits(data.credits);
      }
    }
    getCredits();
    
    // ???????? ?? ????????? ??????? (Real-time)
    const channel = supabase
      .channel('credit_updates')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'profiles' }, 
      payload => setCredits(payload.new.credits))
      .subscribe();

    const handleCheckout = async () => { setLoading(true); const res = await fetch("/api/checkout", { method: "POST" }); const data = await res.json(); if (data.url) window.location.href = data.url; setLoading(false); }; 
 return () => { supabase.removeChannel(channel); };
  }, []);

  const handleCheckout = async () => { setLoading(true); const res = await fetch("/api/checkout", { method: "POST" }); const data = await res.json(); if (data.url) window.location.href = data.url; setLoading(false); }; 
 return (
    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-yellow-500/20 rounded-lg text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
          <Zap size={14} fill="currentColor" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-500 font-bold leading-none uppercase tracking-tighter">??????</span>
          <span className="text-sm font-black font-mono leading-none mt-1">
            {credits !== null ? credits : "..."}
          </span>
        </div>
      </div>
      
      <button onClick={handleCheckout} disabled={loading} className="hover:text-purple-400 transition-colors disabled:opacity-50">
        <PlusCircle size={16} />
      </button>
    </div>
  );
}
