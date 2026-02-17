"use client";
import { Loader2, Sparkles } from "lucide-react";

export function GenerationModal({ isVisible, progress }: { isVisible: boolean, progress: number }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 text-center relative overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.2)]">
        {/* خلفية متحركة */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-shimmer"></div>
        
        <div className="relative z-10 space-y-6">
          <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto border border-purple-500/20">
            <Loader2 className="text-purple-500 animate-spin" size={32} />
          </div>
          
          <div>
            <h3 className="text-xl font-bold flex items-center justify-center gap-2">
              جاري إنشاء الفيديو <Sparkles size={18} className="text-yellow-500" />
            </h3>
            <p className="text-gray-500 text-sm mt-2 font-light">يقوم NexaVision الآن بتحويل النص إلى إطارات سينمائية...</p>
          </div>

          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-600 to-blue-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-600 uppercase tracking-widest">{progress}% مکتمل</span>
        </div>
      </div>
    </div>
  );
}