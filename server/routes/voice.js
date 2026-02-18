const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/synthesize', async (req, res) => {
  const { text, voiceId } = req.body; // voiceId مثل 'Josh' أو صوت عربي

  try {
    const response = await axios({
      method: 'post',
      url: `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      data: { text, model_id: "eleven_multilingual_v2" },
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer',
    });

    // هنا نقوم برفع ملف الصوت الناتج إلى Cloudinary أو S3
    // لإرسال الرابط النهائي للـ Frontend
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ error: "فشل توليد الصوت" });
  }
});

module.exports = router;