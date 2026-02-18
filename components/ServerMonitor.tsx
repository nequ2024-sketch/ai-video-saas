"use client";
import React, { useState, useEffect } from "react";
import { Activity, Globe, Database, Cpu } from "lucide-react";

export default function ServerMonitor() {
  const [metrics, setMetrics] = useState({
    apiLatency: "...",
    dbStatus: "Checking...",
    serverLoad: "Low"
  });

  useEffect(() => {
    // محاكاة مراقبة زمن الاستجابة (Ping)
    const interval = setInterval(() => {
      const latency = Math.floor(Math.random() * 150) + 50;
      setMetrics({
        apiLatency: `${latency}ms`,
        dbStatus: "Online",
        serverLoad: latency > 150 ? "Moderate" : "Low"
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex items-center gap-4">
        <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-400">
          <Globe size={24} />
        </div>
        <div>
          <div className="text-gray-500 text-xs">API Latency (Replicate)</div>
          <div className="text-xl font-mono font-bold">{metrics.apiLatency}</div>
        </div>
      </div>

      <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex items-center gap-4">
        <div className="p-3 bg-green-500/20 rounded-2xl text-green-400">
          <Database size={24} />
        </div>
        <div>
          <div className="text-gray-500 text-xs">Database (Supabase)</div>
          <div className="text-xl font-bold">{metrics.dbStatus}</div>
        </div>
      </div>

      <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex items-center gap-4">
        <div className="p-3 bg-purple-500/20 rounded-2xl text-purple-400">
          <Cpu size={24} />
        </div>
        <div>
          <div className="text-gray-500 text-xs">System Load</div>
          <div className="text-xl font-bold">{metrics.serverLoad}</div>
        </div>
      </div>
    </div>
  );
}
