"use client";
import React from "react";
import { 
  Compass, Wand2, UserCircle, Folder, 
  CreditCard, Settings, ShieldCheck, HelpCircle 
} from "lucide-react";

const menuItems = [
  { id: 'explore', label: '?????', icon: <Compass size={20} />, color: 'text-blue-400' },
  { id: 'generate', label: '????? ?????', icon: <Wand2 size={20} />, color: 'text-purple-400' },
  { id: 'avatar', label: '???????? ?????', icon: <UserCircle size={20} />, color: 'text-pink-400' },
  { id: 'assets', label: '??????', icon: <Folder size={20} />, color: 'text-yellow-400' },
];

const secondaryItems = [
  { id: 'billing', label: '????????', icon: <CreditCard size={20} /> },
  { id: 'settings', label: '?????????', icon: <Settings size={20} /> },
  { id: 'admin', label: '???????', icon: <ShieldCheck size={20} />, adminOnly: true },
];

export default function Sidebar({ activeTab, setActiveTab }: any) {
  return (
    <div className="w-64 h-screen bg-[#050505] border-e border-white/5 flex flex-col p-6 fixed right-0 top-0 z-50" dir="rtl">
      <div className="mb-10 px-2">
        <h1 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          NexaVision AI
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        <p className="text-[10px] font-bold text-gray-600 px-3 mb-4 uppercase tracking-widest">??????? ????????</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
              activeTab === item.id ? 'bg-white/5 text-white' : 'text-gray-500 hover:bg-white/[0.02] hover:text-gray-300'
            }`}
          >
            <span className={activeTab === item.id ? item.color : ''}>{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5 space-y-2">
        {secondaryItems.map((item) => (
          <button
            key={item.id}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-500 hover:bg-white/[0.02] transition-all"
          >
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
