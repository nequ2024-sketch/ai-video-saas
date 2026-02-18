"use client";
import React, { useState } from "react";
import { Bell, CheckCircle2, AlertCircle, Clock } from "lucide-react";

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "اكتمل التوليد", message: "الفيديو الخاص بك جاهز للمشاهدة", time: "منذ دقيقتين", type: "success" },
    { id: 2, title: "تنبيه أمني", message: "تم تسجيل الدخول من متصفح جديد", time: "منذ ساعة", type: "warning" }
  ]);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all relative group"
      >
        <Bell size={20} className="group-hover:text-purple-400" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-black" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-4 w-80 bg-[#0A0A0A] border border-white/10 rounded-[2rem] shadow-2xl z-[200] overflow-hidden animate-in fade-in slide-in-from-top-4" dir="rtl">
          <div className="p-5 border-b border-white/5 bg-white/[0.02]">
            <h3 className="font-bold">الإشعارات</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((n) => (
              <div key={n.id} className="p-4 border-b border-white/5 hover:bg-white/[0.01] transition-all flex gap-4">
                <div className={`mt-1 ${n.type === 'success' ? 'text-green-500' : 'text-orange-500'}`}>
                  {n.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold">{n.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{n.message}</p>
                  <p className="text-[10px] text-gray-700 flex items-center gap-1">
                    <Clock size={10} /> {n.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full p-4 text-xs text-gray-500 hover:text-white transition-all bg-white/[0.01]">
            رؤية كافة التنبيهات
          </button>
        </div>
      )}
    </div>
  );
}
