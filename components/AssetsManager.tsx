"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Search, Trash2, Download, Film, MoreVertical } from "lucide-react";
import { toast } from "sonner";

export default function AssetsManager() {
  const [assets, setAssets] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssets();
  }, []);

  async function fetchAssets() {
    const { data, error } = await supabase
      .from('user_videos')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setAssets(data);
    setLoading(false);
  }

  const deleteAsset = async (id: string) => {
    const { error } = await supabase.from('user_videos').delete().eq('id', id);
    if (!error) {
      setAssets(assets.filter(a => a.id !== id));
      toast.success("تم حذف الفيديو بنجاح");
    }
  };

  const filteredAssets = assets.filter(asset => 
    asset.prompt?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6" dir="rtl">
      {/* شريط البحث والأدوات */}
      <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10">
        <Search className="text-gray-500" size={20} />
        <input 
          type="text" 
          placeholder="ابحث في أرشيفك عن طريق الوصف (Prompt)..." 
          className="bg-transparent border-none outline-none text-sm w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map(i => <div key={i} className="aspect-video bg-white/5 rounded-3xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => (
            <div key={asset.id} className="group bg-[#0A0A0A] border border-white/5 rounded-[2rem] overflow-hidden hover:border-purple-500/30 transition-all">
              <div className="relative aspect-video">
                <video src={asset.video_url} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => window.open(asset.video_url)} className="p-2 bg-black/60 backdrop-blur-md rounded-xl hover:text-purple-400">
                    <Download size={18} />
                  </button>
                  <button onClick={() => deleteAsset(asset.id)} className="p-2 bg-black/60 backdrop-blur-md rounded-xl hover:text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-5 space-y-2">
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{asset.prompt || "لا يوجد وصف لهذه العملية"}</p>
                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <span className="text-[10px] text-gray-600 font-mono">ID: {asset.id.slice(0,8)}</span>
                  <Film size={14} className="text-purple-500 opacity-50" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
