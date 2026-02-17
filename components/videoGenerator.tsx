"use client";
import { useState } from "react";
import { Sparkles, Play, Settings2, Image as ImageIcon } from "lucide-react";
import { GenerationModal } from "./modals";

export default function VideoGenerator() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // محاكاة لعملية التحميل (سيتم استبدالها بـ API لاحقاً)
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 1000);

    // هنا سيتم استدعاء الـ Backend
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="relative group">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="ماذا تريد أن ترى؟ (مثلاً: تنين يطير فوق مدينة نيويورك في عام 2099...)"
          className="w-full h-48 bg-[#080808] border border-white/5 rounded-3xl p-8 text-xl outline-none focus:border-purple-500/50 transition-all resize-none shadow-inner"
        />
        <div className="absolute bottom-6 right-6 flex gap-3">
          <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/5 shadow-xl">
            <ImageIcon size={20} className="text-gray-400" />
          </button>
          <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/5 shadow-xl">
            <Settings2 size={20} className="text-gray-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-[#0c0c0c] border border-white/5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Model Selection</p>
            <p className="font-medium text-purple-400">Nexa-Alpha (Veo v2)</p>
          </div>
          <Sparkles size={20} className="text-purple-500" />
        </div>
        
        <button
          onClick={handleGenerate}
          disabled={!prompt || isGenerating}
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
        >
          <Play fill="currentColor" size={20} />
          إنشاء الفيديو
        </button>
      </div>

      <GenerationModal isVisible={isGenerating} progress={progress} />
    </div>
  );
}
