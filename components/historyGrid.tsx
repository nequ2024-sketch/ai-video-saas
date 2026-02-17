"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Download, Trash2, Clock } from "lucide-react";

// بيانات تجريبية (سيتم جلبها من قاعدة البيانات لاحقاً)
const mockVideos = [
  {
    id: "1",
    title: "رائد فضاء في غابة نيون",
    status: "completed",
    thumbnail: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400&q=80",
    date: "منذ ساعتين",
  },
  {
    id: "2",
    title: "تنين يحلق فوق مدينة مستقبلية",
    status: "processing",
    thumbnail: "",
    date: "منذ 5 دقائق",
  },
];

export default function HistoryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {mockVideos.map((video) => (
        <Card key={video.id} className="group relative border-white/5 bg-[#0c0c0c] hover:border-purple-500/30 transition-all">
          <CardContent className="p-0">
            {/* عرض الصورة المصغرة أو حالة المعالجة */}
            <div className="relative aspect-video bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
              {video.status === "completed" ? (
                <>
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="primary" size="icon" className="rounded-full">
                      <Play fill="currentColor" size={16} />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <Clock className="text-purple-500 animate-pulse" size={32} />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">جاري المعالجة...</span>
                </div>
              )}
            </div>

            {/* تفاصيل الفيديو */}
            <div className="p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-sm text-white line-clamp-1">{video.title}</h3>
                  <p className="text-[10px] text-gray-500 mt-1">{video.date}</p>
                </div>
                <Badge variant={video.status === "completed" ? "success" : "warning"}>
                  {video.status === "completed" ? "جاهز" : "قيد التنفيذ"}
                </Badge>
              </div>

              {/* أزرار التحكم */}
              <div className="flex gap-2 pt-2">
                <Button variant="secondary" size="sm" className="flex-1 gap-2 text-[10px]" disabled={video.status !== "completed"}>
                  <Download size={14} /> تحميل
                </Button>
                <Button variant="ghost" size="sm" className="px-3 text-gray-500 hover:text-red-500">
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}