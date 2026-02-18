const express = require('express');
const router = express.Router();
const axios = require('axios');
const { addToQueue } = require('../utils/queueSystem');
const { supabase } = require('../utils/supabaseClient');
const { uploadToCloud } = require('../utils/uploadVideo');

router.post('/create', async (req, res) => {
  const { text, imageUrl, userId } = req.body;

  try {
    // 1. التحقق من رصيد المستخدم (الأفاتار يخصم 5 نقاط مثلاً)
    const { data: user } = await supabase.from('profiles').select('points').eq('id', userId).single();
    if (!user || user.points < 5) {
      return res.status(402).json({ error: "رصيدك غير كافٍ لإنشاء أفاتار متحدث" });
    }

    // 2. تحويل النص إلى صوت عبر ElevenLabs
    const voiceResponse = await axios({
      method: 'post',
      url: `https://api.elevenlabs.io/v1/text-to-speech/jsCq9WUX7vUv0Tid891f`, // يمكنك تغيير الـ Voice ID هنا
      data: { 
        text: text, 
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.5, similarity_boost: 0.75 }
      },
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer',
    });

    // 3. رفع ملف الصوت الناتج إلى Cloudinary للحصول على رابط URL
    // الذكاء الاصطناعي يحتاج رابطاً للصوت وليس ملفاً خاماً
    const audioUrl = await uploadToCloud(Buffer.from(voiceResponse.data), "voices");

    // 4. إنشاء سجل في قاعدة البيانات بحالة "قيد الانتظار"
    const { data: videoRecord, error: dbError } = await supabase
      .from('videos')
      .insert([{ 
        user_id: userId, 
        prompt: text, 
        type: 'avatar', 
        status: 'queued' 
      }])
      .select().single();

    if (dbError) throw dbError;

    // 5. خصم النقاط من المستخدم
    await supabase.from('profiles').update({ points: user.points - 5 }).eq('id', userId);

    // 6. إضافة المهمة إلى الطابور (Queue) ليعالجها الـ Worker
    // الـ Worker سيأخذ audioUrl و imageUrl ويرسلهم لـ Replicate
    await addToQueue({
      type: 'avatar_generation',
      audioUrl: audioUrl,
      imageUrl: imageUrl,
      videoId: videoRecord.id,
      userId: userId
    });

    res.status(202).json({ 
      message: "بدأت عملية تحريك الأفاتار", 
      videoId: videoRecord.id 
    });

  } catch (error) {
    console.error("Avatar Creation Error:", error.message);
    res.status(500).json({ error: "حدث خطأ أثناء معالجة الأفاتار" });
  }
});

module.exports = router;