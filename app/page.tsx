import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#020202] text-white font-sans" dir="rtl">
      {/* ??????? ??????? ??????? - Grid & Glow Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      {/* ?????? ?????? - ???? ????? ???? */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <span className="text-xl font-black italic">NV</span>
          </div>
          <h2 className="text-2xl font-black tracking-tighter">
            NexaVision <span className="text-purple-500 font-normal">????</span>
          </h2>
        </div>
        <div className="flex gap-4">
          <button className="text-sm font-medium hover:text-purple-400 transition-colors">English</button>
          <Link href="/dashboard" className="bg-white/5 hover:bg-white/10 px-6 py-2 rounded-full text-sm border border-white/10 transition-all">
            ????? ??????
          </Link>
        </div>
      </nav>

      {/* ??????? ??????? */}
      <section className="relative z-10 flex flex-col items-center justify-center pt-32 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-400 text-xs font-medium mb-8 animate-pulse">
           ???? ????: ?????? ????? ??????? ???
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter max-w-4xl leading-[1.1] mb-8">
          ???? ????????? <br />
          <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            ??????? ?????????
          </span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
          NexaVision AI ????? ????? ?????? ???????? ???????? ?? ???? ??? ????. 
          ???? ???? ????? ??? ????? ???????.
        </p>

        <div className="flex flex-col md:flex-row gap-6 items-center">
          <Link href="/dashboard" className="group relative px-12 py-5 bg-purple-600 rounded-2xl font-black text-xl transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)]">
            ????? ????? ????
          </Link>
          <button className="px-12 py-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 font-bold text-xl transition-all">
            ?????? ??????
          </button>
        </div>

        {/* ???? ?????? */}
        <div className="mt-20 flex items-center gap-8 py-4 px-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
            <div className="flex flex-col">
                <span className="text-xs text-gray-500">?????? ??????</span>
                <span className="font-bold text-purple-400">5 ???? ??????</span>
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <div className="flex flex-col text-right">
                <span className="text-xs text-gray-500">??????</span>
                <span className="font-bold text-green-400">???? ????</span>
            </div>
        </div>
      </section>
    </main>
  );
}
