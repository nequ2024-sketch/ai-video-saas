const { Worker } = require('bullmq');
const Replicate = require('replicate');
const { supabase } = require('./supabaseClient');
const ioredis = require('ioredis');
require('dotenv').config();

const connection = new ioredis({ maxRetriesPerRequest: null });
const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

// إنشاء العامل (Worker) لمعالجة الطلبات
const worker = new Worker('videoProcessing', async (job) => {
  const { prompt, userId, modelVersion, videoId } = job.data;

  console.log(`[Worker] جاري معالجة الفيديو للطلب: ${job.id}`);

  try {
    // 1. طلب التوليد من Replicate
    const prediction = await replicate.predictions.create({
      version: modelVersion,
      input: { prompt: prompt },
      // الرابط الذي سيتم إرسال النتيجة إليه عند الجاهزية
      webhook: `${process.env.BACKEND_URL}/api/generate/webhook`,
      webhook_events_filter: ["completed"]
    });

    // 2. تحديث سجل الفيديو في قاعدة البيانات برقم التتبع (Prediction ID)
    await supabase
      .from('videos')
      .update({ prediction_id: prediction.id, status: 'processing' })
      .eq('id', videoId);

    console.log(`[Worker] تم إرسال الطلب لـ AI بنجاح. ID: ${prediction.id}`);
  } catch (error) {
    console.error(`[Worker] خطأ في المعالجة:`, error);
    
    // إعادة النقاط للمستخدم في حال الفشل الكارثي
    const { data: user } = await supabase.from('profiles').select('points').eq('id', userId).single();
    await supabase.from('profiles').update({ points: user.points + 5 }).eq('id', userId);
    
    await supabase.from('videos').update({ status: 'failed' }).eq('id', videoId);
  }
}, { connection });

console.log("⚙️ Worker is running and waiting for jobs...");