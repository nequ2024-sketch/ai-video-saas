"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Upload, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function ImageUploader({ onUploadSuccess }: { onUploadSuccess: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) return;

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // رفع الملف إلى Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('user-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // جلب رابط الصورة العام
      const { data } = supabase.storage.from('user-assets').getPublicUrl(filePath);
      
      setPreview(data.publicUrl);
      onUploadSuccess(data.publicUrl);
      toast.success("تم رفع الصورة بنجاح!");
    } catch (error: any) {
      toast.error("خطأ في الرفع: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/10 rounded-[2rem] bg-white/[0.02] hover:border-purple-500/50 transition-all group">
      {preview ? (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-4">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <CheckCircle2 size={48} className="text-green-500 shadow-2xl" />
          </div>
        </div>
      ) : (
        <label className="cursor-pointer flex flex-col items-center space-y-4">
          <div className="p-4 bg-purple-600/10 rounded-full text-purple-400 group-hover:scale-110 transition-transform">
            <Upload size={32} />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold">اضغط لرفع صورة</p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG حتى 5MB</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
        </label>
      )}
      {uploading && <p className="text-xs animate-pulse text-purple-500 mt-2">جاري الرفع والأرشفة...</p>}
    </div>
  );
}
