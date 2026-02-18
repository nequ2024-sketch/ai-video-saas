const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

/**
 * رفع أي ملف (فيديو، صوت، صورة) إلى السحاب
 * @param {string} filePath - المسار المحلي للملف أو رابط مؤقت
 * @param {string} folder - المجلد (videos, avatars, voices)
 */
const uploadToCloud = async (filePath, folder = "nexavision") => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto", // يكتشف تلقائياً إذا كان فيديو أو صوت
      folder: folder,
    });
    return result.secure_url; // الرابط الذي سنخزنه في قاعدة البيانات
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("فشل رفع الملف للسحاب");
  }
};

module.exports = { uploadToCloud };