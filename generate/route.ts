import { NextResponse } from "next/server";
import Replicate from "replicate";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN, 
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // 1. استدعاء موديل توليد الفيديو الاحترافي عبر Replicate باستخدام مفتاحك r8_dJx...
    const prediction = await replicate.predictions.create({
      version: "2d19dca66192136e0d466f6004664c3c3a92592759e9842f65a486927",
      input: { prompt: prompt },
    });

    // 2. تسجيل العملية فوراً في جدول renders الخاص بك لضمان الأمان والخصوصية
    await supabase.from('renders').insert([{ 
      prompt: prompt, 
      prediction_id: prediction.id, 
      status: 'starting' 
    }]);

    return NextResponse.json({ id: prediction.id }, { status: 201 });
  } catch (error) {
    console.error("Neural Error:", error);
    return NextResponse.json({ error: "Access Denied // Protocol Error" }, { status: 500 });
  }
}