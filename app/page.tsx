import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-[#020202] text-white overflow-hidden" dir="rtl">
      {/* ????? ??????? ??????? */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#7c3aed33,transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px]" />

      <nav className="relative z-10 flex items-center justify-between px-10 py-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-xl flex items-center justify-center text-2xl font-black shadow-lg shadow-purple-500/20">NV</div>
          <h1 className="text-3xl font-black tracking-tighter italic">NexaVision <span className="font-normal not-italic text-purple-500">????</span></h1>
        </div>
        <Link href="/dashboard" className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-purple-500 hover:text-white transition-all">???? ????</Link>
      </nav>

      <section className="relative z-10 flex flex-col items-center justify-center pt-20 px-6 text-center">
        <h2 className="text-7xl md:text-9xl font-black mb-6 tracking-tighter leading-none">
          ?????? <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">???????</span> ?????
        </h2>
        <p className="text-gray-400 text-xl max-w-2xl mb-12">????? ?? ?? NexaVision AI. ??? ????? ??? ????? ????? ?? ?????. ???? ??? 5 ???? ?????? ???? ?????.</p>
        <div className="flex gap-4">
           <Link href="/dashboard" className="bg-purple-600 px-12 py-5 rounded-2xl text-2xl font-black hover:scale-105 transition-transform shadow-2xl shadow-purple-600/30">????? ?????</Link>
        </div>
      </section>
    </main>
  );
}
