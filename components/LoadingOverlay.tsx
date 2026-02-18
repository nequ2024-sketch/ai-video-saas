"use client";
import React from "react";
import { Sparkles } from "lucide-react";

export default function LoadingOverlay({ message = "جاري معالجة الفيديو بالذكاء الاصطناعي..." }) {
  return (
    <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-black/90 backdrop-blur-2xl text-white">
      <div className="relative">
        {/* حلقات النبض الخلفية */}
        <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="relative bg-white/5 p-8 rounded-[3rem] border border-white/10 flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mb-6" />
          <Sparkles className="text-purple-400 animate-bounce mb-4" size={32} />
          <h3 className="text-xl font-bold tracking-widest text-center animate-pulse">
            {message}
          </h3>
          <p className="text-gray-500 text-sm mt-4">قد يستغرق هذا دقيقة واحدة، لا تغلق الصفحة</p>
        </div>
      </div>
      
      {/* شريط تقدم وهمي للجمالية */}
      <div className="w-64 h-1 bg-white/5 rounded-full mt-10 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-purple-600 to-blue-500 animate-[loading_30s_ease-in-out_infinite]" />
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 95%; }
        }
      `}</style>
    </div>
  );
}
