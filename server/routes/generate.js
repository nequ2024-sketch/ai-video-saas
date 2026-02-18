const express = require('express');
const router = express.Router();
const { addToQueue } = require('../utils/queueSystem');
const { supabase } = require('../utils/supabaseClient');

// 1. استقبال طلب التوليد من المستخدم
router.post('/', async (req, res) => {
  const { prompt, userId, modelVersion } = req.body;

  try {
    // التحقق من النقاط
    const { data: user } = await supabase.from('profiles').select('points').eq('id', userId).single();
    if (!user || user.points < 5) return res.status(402).json({ error: "رصيدك غير كافٍ" });

    // إنشاء سجل فارغ للفيديو في قاعدة البيانات أولاً للحصول على ID
    const { data: videoRecord, error: dbError } = await supabase
      .from('videos')
      .insert([{ user_id: userId, prompt: prompt, status: 'queued' }])
      .select()
      .single();

    if (dbError) throw dbError;

    // خصم النقاط
    await supabase.from('profiles').update({ points: user.points - 5 }).eq('id', userId);

    // إضافة المهمة للطابور ليعالجها الـ Worker
    await addToQueue({
      prompt,
      userId,
      modelVersion: modelVersion || "5f67d540d58ef02e0f093bc6006e0026e64303372fbf967f67756f7e4dfb0790",
      videoId: videoRecord.id
    });

    res.status(202).json({ message: "تم وضع طلبك في الطابور", videoId: videoRecord.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. الـ Webhook لاستقبال النتيجة النهائية من Replicate
router.post('/webhook', async (req, res) => {
  const { id, output, status } = req.body;

  if (status === "succeeded") {
    // تحديث السجل برابط الفيديو النهائي
    await supabase
      .from('videos')
      .update({ 
        video_url: output[0], 
        status: 'completed' 
      })
      .eq('prediction_id', id);
    
    console.log(`✅ فيديو جاهز وتم التحديث: ${id}`);
  }

  res.status(200).send("OK");
});

module.exports = router;