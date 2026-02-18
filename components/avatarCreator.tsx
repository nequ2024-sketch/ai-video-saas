"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Mic, User } from "lucide-react";

export default function AvatarCreator() {
  const [text, setText] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("/avatars/male_1.jpg");
  const [isGenerating, setIsGenerating] = useState(false);

  const avatars = [
    { id: 1, img: "/avatars/male_1.jpg", name: "Sami" },
    { id: 2, img: "/avatars/female_1.jpg", name: "Sara" },
    { id: 3, img: "/avatars/male_2.jpg", name: "Omar" },
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("http://localhost:5000/api/avatar/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text, // النص الذي سيتم تحويله لصوت
          imageUrl: selectedAvatar, // صورة الأفاتار المختارة
          userId: "user_test_123" 
        })
      });
      const data = await response.json();
      alert("تم بدء الإنشاء! رقم الطلب: " + data.id);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-8 bg-[#0a0a0a] border-white/5 space-y-8">
      <div className="space-y-4">
        <label className="text-sm text-gray-400 flex items-center gap-2">
          <User size={16} /> اختر الشخصية الرقمية
        </label>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {avatars.map((av) => (
            <div 
              key={av.id}
              onClick={() => setSelectedAvatar(av.img)}
              className={`relative cursor-pointer rounded-2xl overflow-hidden border-2 transition-all ${
                selectedAvatar === av.img ? "border-purple-500 scale-105" : "border-transparent opacity-50 hover:opacity-100"
              }`}
            >
              <img src={av.img} alt={av.name} className="w-full aspect-square object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-sm text-gray-400 flex items-center gap-2">
          <Mic size={16} /> ماذا ستقول الشخصية؟
        </label>
        <textarea 
          className="w-full h-32 bg-black border border-white/10 rounded-2xl p-4 focus:border-purple-500 outline-none resize-none"
          placeholder="اكتب النص هنا ليقوم الأفاتار بنطقه..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <Button 
        onClick={handleGenerate} 
        disabled={isGenerating || !text}
        className="w-full h-14 text-lg font-bold"
      >
        {isGenerating ? <Loader2 className="animate-spin" /> : "إنشاء الأفاتار المتحدث"}
      </Button>
    </Card>
  );
}