"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar"; // تم الإصلاح للتوافق مع حالة الأحرف الصغرى
import { LayoutDashboard, Receipt, ShieldCheck } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import CreditCounter from "@/components/CreditCounter";
import ServerMonitor from "@/components/ServerMonitor";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("generate");

  const handleUploadSuccess = (url: string) => {
    console.log("File uploaded to Nexa Cloud:", url);
  };

  return (
    <div className="flex h-screen bg-[#020202] text-white overflow-hidden font-sans rtl">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        {/* Header العالمي */}
        <div className="flex justify-between items-center mb-8 bg-[#0a0a0a]/50 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              NexaVision AI <span className="text-xs font-mono text-purple-500 border border-purple-500/30 px-2 py-0.5 rounded-full ml-2">PRO</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <CreditCounter /> 
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 shadow-lg shadow-purple-500/20" />
            <span className="text-sm font-medium">خبير الأمن</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 space-y-6 text-right">
            {activeTab === "generate" && (
              <ImageUploader onUploadSuccess={handleUploadSuccess} />
            )}
            {activeTab === "billing" && (
              <div className="p-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl border border-blue-500/20">
                <Receipt className="mb-4 text-purple-400 w-8 h-8" />
                <h3 className="text-xl font-bold mb-2">نظام الشحن والمحفظة</h3>
                <p className="text-white/60">رصيدك الحالي آمن ومتصل ببوابة Stripe العالمية.</p>
              </div>
            )}
          </div>
          
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <ServerMonitor />
            <div className="bg-[#0a0a0a] p-6 rounded-3xl border border-white/5">
              <h3 className="flex items-center justify-end gap-2 text-sm font-bold text-white/40 uppercase mb-4">
                حالة الأمان (Guardian)
                <ShieldCheck className="w-4 h-4 text-green-500" />
              </h3>
              <ul className="space-y-4 text-xs font-mono">
                <li className="flex justify-between"><span className="text-green-500 font-bold uppercase">Secured</span><span>Data Protection</span></li>
                <li className="flex justify-between border-t border-white/5 pt-4"><span className="text-green-500 font-bold">0 ISSUES</span><span>Security Status</span></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}