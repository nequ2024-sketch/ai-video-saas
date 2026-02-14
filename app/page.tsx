"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // محرك الربط المركزي
import { 
  Sparkles, Loader2, Play, Globe, Trophy, Crown, Activity, 
  Mic, CreditCard, Languages, MessageSquare, Fingerprint, 
  Monitor, Smartphone, ShieldCheck, Zap, Coins, Database, 
  Users, Rocket, Heart, Share2, Terminal, Code, Cpu, 
  Menu, Settings, Bell, Lock, Radio, Ghost, Box, Layers, Binary, Search, Laptop, ShieldAlert,
  ArrowRight // تم إصلاح الاستدعاء هنا
} from "lucide-react"; 

export default function NexusUltimateEmpire() {
  const SOVEREIGN_WALLET = "0x03884d36ae674bfa3b2b54b3bff92e13405389af"; // محفظتك السيادية
  const [points, setPoints] = useState(8500); // رصيد النقاط الافتراضي
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("render");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("AR_JOR");

  // جلب البيانات الحقيقية فور تسجيل الدخول
  useEffect(() => {
    const fetchSovereignAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserEmail(session.user.email || null);
        const { data } = await supabase.from('profiles').select('points').eq('id', session.user.id).single();
        if (data) setPoints(data.points);
      }
    };
    fetchSovereignAuth();
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white font-mono selection:bg-purple-600 overflow-x-hidden relative">
      
      {/* 1. الخلفية السينمائية (Neural Grid Background) */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900/20 via-transparent to-blue-900/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 blur-[150px] animate-pulse"></div>
      </div>

      {/* 2. شريط التحكم العلوي (Sovereign Header) */}
      <header className="relative z-50 border-b border-white/5 bg-black/80 backdrop-blur-2xl px-8 py-5 flex justify-between items-center shadow-2xl">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(147,51,234,0.4)] group-hover:rotate-12 transition-all duration-500">
              <Ghost size={28} className="text-white animate-bounce" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase italic leading-none">NEURO <span className="text-purple-600">LABS</span></h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                <span className="text-[8px] text-zinc-500 font-black tracking-[0.4em] uppercase">Nexus_v4.0_Protocol</span>
              </div>
            </div>
          </div>
          
          <nav className="hidden xl:flex items-center bg-zinc-900/40 border border-white/5 p-1 rounded-2xl gap-1">
            {['Control', 'Database', 'Security', 'Vault', 'Nodes'].map((t) => (
              <button key={t} className="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">{t}</button>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="hidden md:flex flex-col items-end">
             <span className="text-[9px] text-zinc-600 font-black tracking-widest uppercase">Global Credits</span>
             <div className="flex items-center gap-2 text-purple-600 font-black italic text-xl">
                <Coins size={18} /> {points} <span className="text-white text-[9px] not-italic tracking-tighter">PTS</span>
             </div>
          </div>
          {!userEmail ? (
            <button onClick={handleLogin} className="bg-white text-black px-8 py-3 rounded-2xl text-[10px] font-black uppercase hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all flex items-center gap-2">
              <Fingerprint size={16} /> Identity_Auth
            </button>
          ) : (
            <div className="text-[10px] font-black text-purple-600 uppercase italic tracking-widest">{userEmail}</div>
          )}
        </div>
      </header>

      {/* 3. التقسيم الإمبراطوري للمحتوى */}
      <main className="relative z-10 p-8 lg:p-12 grid grid-cols-1 xl:grid-cols-12 gap-10 max-w-[1920px] mx-auto">
        
        {/* اليسار: لوحة التحكم والتبويبات */}
        <aside className="xl:col-span-3 space-y-8">
           <div className="bg-zinc-950/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[3rem] shadow-2xl">
              <h4 className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3"><Layers size={16} className="text-purple-600"/> Command Modules</h4>
              <div className="space-y-4">
                 {[
                   {id: 'render', n: 'AI Render Hub', i: <Zap size={20}/>},
                   {id: 'voice', n: 'Voice Biometrics', i: <Mic size={20}/>},
                   {id: 'network', n: 'Neural Network', i: <Globe size={20}/>},
                   {id: 'billing', n: 'Global Billing', i: <CreditCard size={20}/>}
                 ].map(item => (
                   <button key={item.id} onClick={()=>setActiveTab(item.id)} className={`w-full flex items-center justify-between p-5 rounded-3xl border transition-all group ${activeTab === item.id ? 'bg-purple-600 border-purple-400 shadow-[0_0_40px_rgba(147,51,234,0.3)]' : 'bg-black/40 border-white/5 text-zinc-500 hover:border-zinc-700'}`}>
                      <div className="flex items-center gap-4">
                        {item.i} <span className="text-[10px] font-black uppercase tracking-widest">{item.n}</span>
                      </div>
                      <ArrowRight size={14} className={`transition-transform ${activeTab === item.id ? 'translate-x-0' : '-translate-x-4 opacity-0'}`} />
                   </button>
                 ))}
              </div>
           </div>

           {/* بطاقة الاشتراك Legend */}
           <div className="bg-gradient-to-br from-purple-900/40 to-black border border-purple-500/30 p-10 rounded-[3.5rem] shadow-2xl group">
              <h4 className="text-2xl font-black italic uppercase mb-2 flex items-center gap-3">Legend <Crown size={24} className="text-purple-500 animate-pulse"/></h4>
              <p className="text-[9px] text-zinc-400 mb-8 uppercase tracking-[0.3em]">Unlimited Private Node Access</p>
              <div className="text-5xl font-black mb-10">$55<span className="text-xs text-zinc-500 uppercase tracking-widest">/MO</span></div>
              <button className="w-full py-5 bg-white text-black font-black uppercase text-[10px] rounded-2xl hover:bg-purple-600 hover:text-white transition-all">Initialize Legend Node</button>
           </div>
        </aside>

        {/* الوسط: محرك المعالجة الرئيسي */}
        <div className="xl:col-span-6 space-y-10">
           <section className="bg-zinc-950/60 backdrop-blur-3xl border border-white/5 p-12 rounded-[4.5rem] shadow-2xl shadow-purple-900/10">
              <div className="flex justify-between items-center mb-10">
                 <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full bg-red-600 animate-pulse"></div>
                    <span className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400 italic">Neural_Slang_Processor_Active</span>
                 </div>
                 <div className="bg-black/50 p-2 rounded-2xl border border-white/5">
                    <select value={language} onChange={(e)=>setLanguage(e.target.value)} className="bg-transparent text-[10px] font-black outline-none uppercase cursor-pointer px-4">
                        <option value="AR_JOR">العامية الأردنية</option>
                        <option value="AR_FUSHA">العربية الفصحى</option>
                        <option value="EN">English Global</option>
                    </select>
                 </div>
              </div>
              
              <textarea 
                className="w-full bg-black border-2 border-white/5 rounded-[3rem] p-12 text-lg outline-none focus:border-purple-600/50 transition-all min-h-[280px] resize-none shadow-inner tracking-tight"
                placeholder="بدي فيديو لأسد بيمشي في شوارع الزرقاء بنظام سايبربانك..."
              />
              
              <div className="mt-10 grid grid-cols-2 gap-6">
                 <button className="py-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 flex flex-col items-center gap-4 group hover:border-purple-600 transition-all">
                    <Monitor size={28} className="text-zinc-600 group-hover:text-purple-600"/>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 group-hover:text-white">Cinema 16:9</span>
                 </button>
                 <button className="py-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 flex flex-col items-center gap-4 group hover:border-purple-600 transition-all">
                    <Smartphone size={28} className="text-zinc-600 group-hover:text-purple-600"/>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 group-hover:text-white">Social 9:16</span>
                 </button>
              </div>

              <button onClick={() => setLoading(true)} className="w-full mt-10 py-10 rounded-[3rem] bg-gradient-to-r from-purple-600 to-blue-600 text-white font-black uppercase text-sm tracking-[0.6em] shadow-[0_0_50px_rgba(147,51,234,0.3)] hover:scale-[1.02] transition-all flex items-center justify-center gap-6">
                {loading ? <Loader2 size={32} className="animate-spin" /> : <><Rocket size={24} /> Execute Private Render Protocol</>}
              </button>
           </section>

           <div className="bg-black border-4 border-zinc-900 rounded-[5rem] aspect-video flex flex-col items-center justify-center relative group overflow-hidden shadow-2xl">
              <Play size={100} className="text-zinc-900 group-hover:text-purple-600 transition-all duration-1000 opacity-30 relative z-20 hover:scale-125 cursor-pointer" />
              <div className="absolute bottom-16 left-16 z-30 flex items-center gap-6">
                 <div className="w-16 h-16 rounded-2xl bg-zinc-900/80 border border-white/10 flex items-center justify-center"><Cpu size={32} className="text-purple-600 animate-pulse"/></div>
                 <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 font-black uppercase">Output Source</span>
                    <span className="text-xl font-black italic uppercase tracking-tighter text-white">Private_Node_Zarqa_01</span>
                 </div>
              </div>
           </div>
        </div>

        {/* اليمين: معلومات الشبكة والسيادة */}
        <aside className="xl:col-span-3 space-y-8">
           <div className="bg-zinc-950/40 backdrop-blur-3xl border border-white/5 p-10 rounded-[3.5rem] shadow-2xl">
              <h4 className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em] mb-10 flex items-center gap-4"><Cpu size={18} className="text-purple-600"/> Hardware Metrics</h4>
              <div className="space-y-10">
                 {[
                   {l: 'NEURAL LOAD', v: 88, c: 'bg-purple-600'},
                   {l: 'GPU RENDER', v: 42, c: 'bg-blue-600'},
                   {l: 'TRAFFIC SYNC', v: 100, c: 'bg-green-500'}
                 ].map((m) => (
                   <div key={m.l}>
                      <div className="flex justify-between text-[9px] font-black uppercase mb-3 tracking-widest">
                        <span>{m.l}</span>
                        <span className="text-white">{m.v}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                        <div className={`h-full ${m.c} rounded-full animate-pulse`} style={{width: `${m.v}%`}}></div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-black border border-white/5 p-10 rounded-[3.5rem] flex flex-col items-center text-center shadow-xl group cursor-help">
              <Box size={32} className="text-purple-600 mb-6 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase italic tracking-[0.3em] mb-3 text-zinc-500">Sovereign Wallet</span>
              <p className="text-[8px] text-zinc-600 break-all font-bold tracking-tighter uppercase max-w-[200px]">{SOVEREIGN_WALLET}</p>
           </div>

           <div className="bg-zinc-950 p-10 rounded-[3.5rem] border border-white/5 text-center">
              <ShieldAlert size={32} className="mx-auto mb-6 text-purple-600 animate-pulse" />
              <p className="text-[11px] font-black uppercase tracking-tighter leading-relaxed text-zinc-300">
                System Initialized: All Nodes Operational within Zarqa Domain. Encryption: MIL-SPEC.
              </p>
           </div>
        </aside>
      </main>

      {/* 4. شريط البيانات السفلي */}
      <footer className="relative z-50 border-t border-white/5 bg-black/90 backdrop-blur-3xl py-6 px-16 flex justify-between items-center">
         <div className="text-[9px] text-zinc-700 font-black tracking-[0.6em] uppercase flex items-center gap-3">
            <Laptop size={14} /> © 2026 NEURO LABS // POWERED BY EASY-404
         </div>
         <div className="flex gap-10 items-center text-zinc-600">
            <div className="flex items-center gap-2"><Lock size={12} className="text-green-500" /> <span className="text-[8px] font-black tracking-widest uppercase">Secured</span></div>
            <div className="flex items-center gap-2"><Globe size={12} className="text-purple-500" /> <span className="text-[8px] font-black tracking-widest uppercase">Global_Node</span></div>
         </div>
      </footer>
    </div>
  );
}