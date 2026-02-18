"use client";
import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import { Mic, Video, Sparkles } from "lucide-react";

export default function SmartAvatar() {
  const [voice, setVoice] = useState("male-pro");

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* عمود رفع الصورة */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/[0.03] border border-white/10 p-6 rounded-[2rem] glass-card">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
              <Video size={16} className="text-pink-500" /> اختيار الشخصية
            </h3>
            <ImageUploader onUploadSuccess={(url) => console.log("Avatar ready:", url)} />
          </div>
        </div>

        {/* عمود الإعدادات والصوت */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] glass-card space-y-6">
            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                <Mic size={16} /> النص الذي سيتحدث به الأفاتار
              </label>
              <textarea 
                placeholder="اكتب النص هنا ليقوم الأفاتار بنطقه..."
                className="w-full h-32 bg-black/40 border border-white/10 rounded-2xl p-5 text-sm outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={() => setVoice("male-pro")}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${voice === 'male-pro' ? 'border-pink-500 bg-pink-500/10' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
              >
                <p className="text-xs font-bold">صوت رجالي احترافي</p>
                <p className="text-[10px] text-gray-500">للمحتوى التعليمي والتقني</p>
              </div>
              <div 
                onClick={() => setVoice("female-soft")}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${voice === 'female-soft' ? 'border-pink-500 bg-pink-500/10' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
              >
                <p className="text-xs font-bold">صوت نسائي ناعم</p>
                <p className="text-[10px] text-gray-500">للإعلانات والترويج</p>
              </div>
            </div>

            <button className="w-full py-5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl font-bold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-pink-500/20 transition-all">
              <Sparkles size={20} /> توليد الأفاتار المتحدث
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
