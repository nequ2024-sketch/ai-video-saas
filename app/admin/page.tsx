"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Users, Video, DollarSign, Activity, ShieldCheck } from "lucide-react";
import ServerMonitor from "@/components/ServerMonitor";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, videos: 0, revenue: 0 });

  useEffect(() => {
    async function fetchStats() {
      const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      const { count: videoCount } = await supabase.from('user_videos').select('*', { count: 'exact', head: true });
      setStats({ users: userCount || 0, videos: videoCount || 0, revenue: 0 });
    }
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-white p-10" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="flex items-center justify-between border-b border-white/10 pb-8">
          <div>
            <h1 className="text-3xl font-black flex items-center gap-3">
              <ShieldCheck className="text-purple-500" /> غرفة العمليات (Admin)
            </h1>
            <p className="text-gray-500 mt-2">مراقبة أداء NexaVisionAI في الوقت الفعلي</p>
          </div>
          <div className="bg-green-500/10 text-green-500 px-4 py-2 rounded-full text-xs font-bold animate-pulse">
            النظام يعمل بكفاءة
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl space-y-4">
            <Users className="text-blue-400 opacity-80" />
            <div className="text-gray-500 text-sm font-medium">إجمالي المستخدمين</div>
            <div className="text-3xl font-black">{stats.users}</div>
          </div>
          <div className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl space-y-4">
            <Video className="text-purple-400 opacity-80" />
            <div className="text-gray-500 text-sm font-medium">فيديوهات تم توليدها</div>
            <div className="text-3xl font-black">{stats.videos}</div>
          </div>
          <div className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl space-y-4">
            <DollarSign className="text-green-400 opacity-80" />
            <div className="text-gray-500 text-sm font-medium">الأرباح المتوقعة</div>
            <div className="text-3xl font-black">${stats.revenue}</div>
          </div>
        </div>

        <ServerMonitor />

        <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 text-center text-gray-600 font-mono text-sm">
           [SECURE_LOG]: جاري مراقبة حركة مرور الـ API...
        </div>
      </div>
    </div>
  );
}
