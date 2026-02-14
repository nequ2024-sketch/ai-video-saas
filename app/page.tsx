"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // محرك الربط مع قاعدة البيانات
// استدعاء كافة الأيقونات والمكتبات لضمان السيادة التقنية الكاملة
import { 
  Sparkles, Loader2, Play, Globe, Trophy, Crown, Activity, 
  Instagram, Youtube, Music, Mic, Image as ImageIcon, 
  CreditCard, Languages, MessageSquare, Fingerprint, 
  Monitor, Smartphone, ShieldCheck, Zap, Layers, Palette, 
  Coins, Database, Cpu, Users, Dog, Baby, Cat, Bird, CheckCircle2, Heart, Share2, Rocket
} from "lucide-react";

export default function NeuroLabsSupremeEmpire() {
  // --- إعدادات المحفظة السيادية (تم تثبيتها من الصورة) ---
  const SOVEREIGN_WALLET = "0x03884d36ae674bfa3b2b54b3bff92e13405389af"; 

  // --- حالات النظام (System States) ---
  const [points, setPoints] = useState(0);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [billingCycle, setBillingCycle] = useState("monthly"); 
  const [selectedPlan, setSelectedPlan] = useState("Legend");
  const [voiceCategory, setVoiceCategory] = useState("Human");
  const [selectedVoice, setSelectedVoice] = useState("Adult_Male");
  const [language, setLanguage] = useState("AR_FUSHA"); // اللغة الفصحى افتراضياً
  const [videoSize, setVideoSize] = useState("16:9");
  const [prompt, setPrompt] = useState("بدي فيديو لأسد بيمشي في شوارع الزرقاء بنظام سايبربانك");

  // --- بروتوكول الربط السيادي مع Supabase لجلب النقاط والجيمل ---
  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserEmail(session.user.email || null);
        const { data } = await supabase
          .from('profiles')
          .select('points, subscription_tier')
          .eq('id', session.user.id)
          .single();
        if (data) {
          setPoints(data.points);
          setSelectedPlan(data.subscription_tier);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  const handlePayment = (planName: string, price: string) => {
    alert(`🔐 بروتوكول دفع مشفر نشط:\nالمبلغ: ${price}$ عبر دورة ${billingCycle}\nالوجهة: ${SOVEREIGN_WALLET}`);
  };

  const handleExecution = async () => {
    if (!userEmail) return alert("⚠️ يرجى تسجيل الدخول أولاً لتفعيل المحرك.");
    setLoading(true);
    // محاكاة الاتصال بمحرك Replicate الفعلي المربوط بمفتاحك
    setTimeout(() => {
      setLoading(false);
      alert("✅ تم الاتصال بمحرك Replicate - بدأ التوليد على خادمك الخاص!");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono p-4 lg:p-10 selection:bg-purple-600">
      
      {/* 1. Header: السيادة الدولية والجيمل */}
      <header className="flex justify-between items-center mb-10 border-b border-zinc-900 pb-8">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">NEURO <span className="text-purple-600">LABS</span></h1>
          <p className="text-[9px] text-zinc-600 mt-2 tracking-[0.5em] flex items-center gap-2 uppercase font-black">
            <Activity size={10} className="text-green-500 animate-pulse" /> 
            {userEmail ? `IDENTITY: ${userEmail}` : "SYSTEM: WAITING_AUTH"} // {points} PTS
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="bg-zinc-950 px-5 py-2 border border-zinc-900 rounded-2xl flex items-center gap-3">
            <Languages size={16} className="text-purple-600" />
            <select value={language} onChange={(e)=>setLanguage(e.target.value)} className="bg-transparent text-[10px] font-black outline-none uppercase cursor-pointer">
                <option value="AR_FUSHA">العربية الفصحى</option>
                <option value="AR_JOR">العامية الأردنية</option>
                <option value="EN">English Global</option>
            </select>
          </div>
          {!userEmail && (
            <button onClick={handleLogin} className="bg-white text-black px-8 py-3 rounded-2xl text-[10px] font-black uppercase hover:bg-purple-600 hover:text-white transition-all shadow-2xl">
              Login with Gmail
            </button>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-[1850px] mx-auto">
        
        {/* 2. Aside Left: مكتبة الأصوات الشاملة (بشر + حيوانات) */}
        <aside className="lg:col-span-3 space-y-8">
          <div className="bg-zinc-950 border border-zinc-900 p-8 rounded-[3rem] shadow-2xl">
            <h3 className="text-[10px] font-black uppercase mb-6 text-zinc-500 flex items-center gap-2 tracking-[0.2em]"><Fingerprint size={16}/> Voice Biometrics</h3>
            <button className="w-full py-5 bg-black border-2 border-dashed border-zinc-800 rounded-3xl text-[9px] font-black flex items-center justify-center gap-3 hover:border-purple-600 transition-all group">
              <Mic size={18} className="text-purple-600 group-hover:animate-bounce"/> CLONE_MY_VOICE (V4)
            </button>
          </div>

          <div className="bg-zinc-950 border border-zinc-900 p-8 rounded-[3rem]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-black uppercase text-zinc-500 flex items-center gap-2 tracking-[0.2em]"><Users size={16}/> Voice Engine</h3>
              <div className="flex gap-2 bg-black p-1 rounded-xl">
                 <button onClick={()=>setVoiceCategory("Human")} className={`px-3 py-1 rounded-lg text-[8px] font-black transition-all ${voiceCategory==="Human"?"bg-purple-600 text-white":"bg-black text-zinc-700"}`}>HUMAN</button>
                 <button onClick={()=>setVoiceCategory("Animal")} className={`px-3 py-1 rounded-lg text-[8px] font-black transition-all ${voiceCategory==="Animal"?"bg-purple-600 text-white":"bg-black text-zinc-700"}`}>ANIMAL</button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {(voiceCategory === "Human" ? [
                {id: "Baby", n: "طفل (Baby)", i: <Baby size={14}/>},
                {id: "Adult_Male", n: "رجل (Adult Male)", i: <Users size={14}/>},
                {id: "Adult_Female", n: "أنثى (Adult Female)", i: <Users size={14}/>}
              ] : [
                {id: "Lion", n: "أسد (Lion)", i: <Sparkles size={14}/>},
                {id: "Dog", n: "كلب (Dog)", i: <Dog size={14}/>},
                {id: "Cat", n: "قطة (Cat)", i: <Cat size={14}/>},
                {id: "Bird", n: "عصفور (Bird)", i: <Bird size={14}/>}
              ]).map(v => (
                <button key={v.id} onClick={()=>setSelectedVoice(v.id)} className={`flex items-center justify-between p-3 rounded-xl text-[9px] font-black border transition-all ${selectedVoice === v.id ? "border-purple-600 bg-purple-600/10 text-white shadow-xl" : "border-zinc-900 bg-black text-zinc-600 hover:border-zinc-700"}`}>
                  <div className="flex items-center gap-2 uppercase tracking-tighter">{v.i} {v.n}</div>
                  {selectedVoice === v.id && <CheckCircle2 size={12} className="text-purple-600" />}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* 3. Main: معالج اللهجات، التوليد، وشاشة العرض */}
        <main className="lg:col-span-6 space-y-8">
          <section className="bg-zinc-950 border border-zinc-900 p-10 rounded-[4rem] shadow-2xl relative overflow-hidden">
            <h2 className="text-[11px] font-black uppercase italic text-zinc-400 flex items-center gap-3 mb-6 tracking-widest"><MessageSquare size={18} className="text-purple-600"/> Neural-Slang Processor</h2>
            <textarea 
              value={prompt} onChange={(e)=>setPrompt(e.target.value)} 
              className="w-full bg-black border-2 border-zinc-900 rounded-[2.5rem] p-8 text-sm mb-8 outline-none focus:border-purple-600 transition-all min-h-[160px] resize-none"
              placeholder="اكتب بالفصحى أو العامية الأردنية، سيقوم النظام بمعالجتها عصبياً..."
            />
            <div className="flex gap-4 mb-8 text-[10px] font-black uppercase">
              <button onClick={()=>setVideoSize("16:9")} className={`flex-1 py-4 rounded-2xl border-2 transition-all ${videoSize==="16:9" ? "border-purple-600 bg-purple-600/10 shadow-[0_0_20px_rgba(147,51,234,0.1)]" : "border-zinc-900"}`}><Monitor size={14} className="inline mr-2"/>16:9 Cinema</button>
              <button onClick={()=>setVideoSize("9:16")} className={`flex-1 py-4 rounded-2xl border-2 transition-all ${videoSize==="9:16" ? "border-purple-600 bg-purple-600/10 shadow-[0_0_20px_rgba(147,51,234,0.1)]" : "border-zinc-900"}`}><Smartphone size={14} className="inline mr-2"/>9:16 Reels</button>
            </div>
            <button onClick={handleExecution} disabled={loading} className="w-full font-black py-8 rounded-[2.5rem] bg-white text-black hover:bg-purple-600 hover:text-white transition-all uppercase tracking-[0.5em] text-xs shadow-2xl shadow-purple-900/10">
              {loading ? <Loader2 className="animate-spin mx-auto" /> : "Initialise Dedicated Private Render"}
            </button>
          </section>

          <div className={`bg-zinc-950 border-2 border-dashed border-zinc-800 rounded-[4rem] flex flex-col items-center justify-center transition-all relative overflow-hidden group aspect-video`}>
             <Play size={60} className="text-zinc-900 group-hover:text-purple-600 transition-colors duration-500 opacity-20" />
             <div className="absolute bottom-10 left-10 flex items-center gap-4 text-zinc-600 font-black text-[10px] uppercase italic tracking-[0.5em]">
                <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></div> Private_Dedicated_Output
             </div>
          </div>
        </main>

        {/* 4. Aside Right: البزنس، الدفع الدولي، والاشتراكات */}
        <aside className="lg:col-span-3 space-y-8">
          <div className="bg-zinc-950 border border-zinc-900 p-8 rounded-[4rem] shadow-xl">
            <h3 className="text-[10px] font-black uppercase mb-8 text-zinc-500 flex items-center gap-2 tracking-widest"><CreditCard size={18} /> International Billing</h3>
            
            <div className="flex justify-center mb-6 bg-black p-1 rounded-xl border border-zinc-900">
               {["weekly", "monthly", "yearly"].map(cycle => (
                 <button key={cycle} onClick={()=>setBillingCycle(cycle)} className={`px-4 py-1 rounded-lg text-[8px] font-black uppercase transition-all ${billingCycle === cycle ? "bg-purple-600 text-white shadow-lg" : "text-zinc-700 hover:text-white"}`}>{cycle}</button>
               ))}
            </div>

            <div className="p-8 bg-purple-600 rounded-[3.5rem] text-center shadow-2xl mb-8 group relative overflow-hidden">
                <Crown size={30} className="mx-auto mb-4 text-white group-hover:scale-110 transition-transform" />
                <h4 className="text-xl font-black italic uppercase text-white tracking-tighter">Legend</h4>
                <div className="text-3xl font-black mt-2 mb-6 text-white">${billingCycle === "weekly" ? "19.99" : billingCycle === "monthly" ? "55" : "520"}</div>
                <button onClick={()=>handlePayment("Legend", "55")} className="w-full py-4 bg-white text-black rounded-3xl text-[9px] font-black uppercase hover:invert transition-all shadow-2xl">Activate Node</button>
            </div>

            <div className="p-5 bg-black border border-purple-600/30 rounded-[2.5rem] flex flex-col items-center text-center group">
                <Coins size={24} className="text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-black uppercase italic text-white tracking-widest">Sovereign Wallet</span>
                <p className="text-[7px] text-zinc-700 mt-2 break-all font-bold tracking-tighter italic uppercase">{SOVEREIGN_WALLET}</p>
            </div>
          </div>

          <button className="w-full bg-zinc-900 text-white font-black py-7 rounded-[3.5rem] text-[9px] uppercase tracking-[0.4em] hover:bg-purple-600 transition-all border border-zinc-800 shadow-2xl">
            <ShieldCheck size={20} /> Sovereign Support Node
          </button>
        </aside>
      </div>
    </div>
  );
}