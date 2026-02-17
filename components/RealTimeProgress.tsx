"use client";
import React, { useState, useEffect } from "react";

export default function RealTimeProgress({ isProcessing }: { isProcessing: boolean }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("جاري التحضير...");

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 30) { setStatus("جاري رفع البيانات للمخزن السحابي..."); return prev + 1; }
          if (prev < 70) { setStatus("الذكاء الاصطناعي يقوم بتحليل المشهد..."); return prev + 1; }
          if (prev < 95) { setStatus("جاري رندرة الفيديو النهائي..."); return prev + 1; }
          return prev;
        });
      }, 500);
      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isProcessing]);

  if (!isProcessing) return null;

  return (
    <div className="w-full space-y-3 mt-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between text-xs font-mono">
        <span className="text-purple-400">{status}</span>
        <span className="text-white">{progress}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
