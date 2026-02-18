const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

/**
 * دمج ملف صوتي مع فيديو أفاتار صامت
 */
const mergeAudioVideo = (videoPath, audioPath, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .input(audioPath)
      .outputOptions([
        '-c:v copy',      // نسخ الفيديو بدون إعادة ترميز (سريع جداً)
        '-c:a aac',       // ترميز الصوت بصيغة AAC
        '-map 0:v:0',     // أخذ الفيديو من الملف الأول
        '-map 1:a:0',     // أخذ الصوت من الملف الثاني
        '-shortest'       // إنهاء الفيديو عند انتهاء أقصر ملف
      ])
      .save(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', (err) => reject(err));
  });
};

/**
 * إضافة علامة مائية (Watermark) للفيديو
 */
const applyWatermark = (inputPath, outputPath) => {
  const logoPath = path.join(__dirname, '../../public/logo.png');
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .input(logoPath)
      .complexFilter([
        'overlay=main_w-overlay_w-10:main_h-overlay_h-10' // وضع اللوجو في الزاوية اليمنى بالأسفل
      ])
      .save(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', (err) => reject(err));
  });
};

module.exports = { mergeAudioVideo, applyWatermark };