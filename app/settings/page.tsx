"use client";
import React, { useState } from "react";
import { User, Shield, Bell, LogOut, Key } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail("user@example.com"); // سيتم جلب البريد تلقائياً
    if (error) toast.error(error.message);
    else toast.success("تم إرسال رابط تغيير كلمة المرور لبريدك.");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 md:p-16" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-12">
        <header>
          <h1 className="text-4xl font-black mb-2">إعدادات الحساب</h1>
          <p className="text-gray-500">إدارة أمن حسابك وتفضيلاتك الشخصية</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* القائمة الجانبية */}
          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 p-4 bg-white/5 rounded-2xl text-purple-400 border border-purple-500/20">
              <User size={20} /> الملف الشخصي
            </button>
            <button className="w-full flex items-center gap-3 p-4 hover:bg-white/5 rounded-2xl text-gray-400 transition-all">
              <Shield size={20} /> الأمان والخصوصية
            </button>
          </nav>

          {/* محتوى الإعدادات */}
          <div className="md:col-span-2 space-y-8">
            <section className="bg-white/[0.02] border border-white/10 p-8 rounded-[2.5rem] space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Key size={18} className="text-purple-500" /> تغيير كلمة المرور
              </h2>
              <p className="text-sm text-gray-500">سنرسل لك رابطاً آمناً إلى بريدك الإلكتروني المسجل لتحديث كلمة المرور الخاصة بك.</p>
              <button 
                onClick={handlePasswordReset}
                disabled={loading}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold transition-all"
              >
                {loading ? "جاري الإرسال..." : "إرسال رابط التحديث"}
              </button>
            </section>

            <section className="bg-red-500/5 border border-red-500/10 p-8 rounded-[2.5rem] space-y-6">
              <h2 className="text-xl font-bold text-red-500 flex items-center gap-2">
                <LogOut size={18} /> منطقة الخطر
              </h2>
              <p className="text-sm text-gray-500">عند تسجيل الخروج، ستحتاج إلى رابط سحري جديد للوصول إلى لوحة التحكم.</p>
              <button 
                onClick={() => supabase.auth.signOut()}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl text-sm font-bold transition-all"
              >
                تسجيل الخروج من كافة الأجهزة
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
