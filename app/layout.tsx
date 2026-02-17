import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes"; // تأكد من تثبيت مكتبة next-themes

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexaVision AI - Next Generation AI",
  description: "AI-powered video generation by Easy-404",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen transition-colors duration-500">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

