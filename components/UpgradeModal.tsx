"use client";
import React from "react";
import { Lock, Zap, Check } from "lucide-react";

export default function UpgradeModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-[#0A0A0A] border border-purple-500/30 w-full max-w-md rounded-[2.5rem] p-8 text-center space-y-6 animate-in zoom-in-95" dir="rtl">
        <div className="w-20 h-20 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto">
          <Lock className="text-purple-500" size={32} />
        </div>
        <h2 className="text-2xl font-black">لقد استهلكت رصيدك المجاني!</h2>
        <p className="text-gray-500 text-sm">قم بالترقية إلى خطة Pro للحصول على 100 نقطة توليد شهرياً ودقة 4K.</p>
        
        <div className="space-y-3 text-right bg-white/5 p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-xs"><Check size={14} className="text-green-500"/> توليد غير محدود للأفاتار</div>
          <div className="flex items-center gap-2 text-xs"><Check size={14} className="text-green-500"/> أولوية في المعالجة السريعة</div>
        </div>

        <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all">
          <Zap size={18} /> الترقية الآن
        </button>
        <button onClick={onClose} className="text-gray-600 text-xs hover:text-white">إغلاق مؤقتاً</button>
      </div>
    </div>
  );
}
