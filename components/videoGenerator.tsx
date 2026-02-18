"use client";
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function VideoGenerator() {
  const [prompt, setPrompt] = useState("");
  const { language } = useLanguage();

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={language === "ar" ? "ضع إبداعك هنا..." : "Put your creativity here..."}
        className="w-full h-48 bg-[#080808] border border-white/5 rounded-3xl p-8 text-xl outline-none focus:border-purple-500/50 transition-all resize-none shadow-inner text-white"
      />
      <div className="absolute bottom-6 right-6 flex gap-3">
        {/* أزرار التحكم هنا */}
      </div>
    </div>
  );
}
