import "./globals.css"; // هاد السطر هو اللي بيفعل التنسيق اللي كتبته
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEURO LABS // NEXUS PROTOCOL",
  description: "AI Video Generation Engine by Easy-404",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}