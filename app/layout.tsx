import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

// تعريف الخط لجعل النصوص تبدو عصرية
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexaVision AI | لوحة التحكم",
  description: "أفضل منصة لتوليد فيديوهات الأفاتار والذكاء الاصطناعي",
  keywords: ["ذكاء اصطناعي", "AI Video", "NexaVision", "أمن سيبراني"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${inter.className} bg-[#020202] text-white antialiased`}>
        {/* نظام التنبيهات المنبثقة */}
        <Toaster position="top-center" richColors theme="dark" />
        
        {/* محتوى الصفحة الرئيسي */}
        <main className="min-h-screen relative overflow-hidden">
          {/* لمسة تصميمية: خلفية متوهجة خفيفة */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-600/10 blur-[120px] pointer-events-none" />
          
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
