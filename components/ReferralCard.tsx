"use client";
import React, { useState } from "react";
import { Gift, Copy, Share2, Check } from "lucide-react";
import { toast } from "sonner";

export default function ReferralCard({ referralCode = "NEXA-123" }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://nexavision.ai/signup?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("تم نسخ رابط الدعوة!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-[2.5rem] p-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
        <Gift size={120} />
      </div>
      
      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500 rounded-2xl">
            <Gift className="text-white" size={24} />
          </div>
          <h3 className="text-xl font-bold">احصل على 5 نقاط مجانية!</h3>
        </div>
        
        <p className="text-gray-400 text-sm max-w-md">
          شارك رابطك الخاص مع أصدقائك. ستحصل على **5 نقاط** إضافية لكل شخص يشترك في الموقع من خلالك.
        </p>

        <div className="flex items-center gap-2 bg-black/40 p-2 rounded-2xl border border-white/5">
          <input 
            readOnly 
            value={shareUrl} 
            className="bg-transparent border-none outline-none text-xs flex-1 px-4 font-mono text-purple-300"
          />
          <button 
            onClick={copyToClipboard}
            className="bg-purple-600 hover:bg-purple-700 p-3 rounded-xl transition-all"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
