"use client";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  return (
    <button
      onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
      className="flex items-center gap-2 p-2 rounded-lg glass-card hover:bg-primary/20 transition-all duration-300 text-sm font-medium border border-border/50"
    >
      <Globe className="w-4 h-4 text-primary" />
      <span>{language === "ar" ? "English" : "العربية"}</span>
    </button>
  );
}
