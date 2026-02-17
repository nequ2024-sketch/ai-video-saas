"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Share2, Copy, Gift, Users } from "lucide-react";
import { toast } from "sonner";

export default function ReferralSystem() {
  const [profile, setProfile] = useState<any>(null);
  const [referralCount, setReferralCount] = useState(0);

  useEffect(() => {
    async function fetchReferralData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // جلب بروفايل المستخدم للحصول على الكود الخاص به
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setProfile(data);

        // حساب عدد الأشخاص الذين سجلوا عن طريقه
        const { count } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('referred_by', data?.referral_code);
        setReferralCount(count || 0);
      }
    }
    fetchReferralData();
  }, []);

  const copyLink = () => {
    const link = `${window.location.origin}/signup?ref=${profile?.referral_code}`;
    navigator.clipboard.writeText(link);
    toast.success("تم نسخ رابط الإحالة الخاص بك!");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* بطاقة الرابط */}
      <div className="md:col-span-2 bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] space-y-6 glass-card">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-purple-500/20 rounded-2xl text-purple-400">
            <Gift size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold">ادعُ أصدقاءك واحصل على نقاط مجانية</h3>
            <p className="text-gray-500 text-sm">لكل صديق يسجل عن طريقك، سنمنحك 10 نقاط (BP) مجاناً.</p>
          </div>
        </div>

        <div className="flex gap-2">
          <input 
            readOnly 
            value={profile ? `${window.location.origin}/signup?ref=${profile.referral_code}` : "جاري التحميل..."}
            className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-5 text-xs font-mono text-gray-400"
          />
          <button onClick={copyLink} className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all">
            <Copy size={20} />
          </button>
        </div>
      </div>

      {/* بطاقة الإحصائيات */}
      <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/10 p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-2">
        <Users className="text-blue-400 mb-2" size={32} />
        <div className="text-3xl font-black">{referralCount}</div>
        <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">صديق سجل من طرفك</div>
      </div>
    </div>
  );
}
