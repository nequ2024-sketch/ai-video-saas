import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // بدء عملية التوليد باستخدام موديل Stable Video Diffusion أو مشابه
    const prediction = await replicate.predictions.create({
      version: "3d0b61e20436-your-selected-model-version", // سنحدد النسخة الأنسب لاحقاً
      input: { prompt: prompt },
    });

    return NextResponse.json({ id: prediction.id }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "الوصول مرفوض - خطأ في البروتوكول" }, { status: 500 });
  }
}