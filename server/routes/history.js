const express = require('express');
const router = express.Router();
const { supabase } = require('../utils/supabaseClient');

// جلب تاريخ الفيديوهات الخاصة بالمستخدم
router.get('/:userId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('user_id', req.params.userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "تعذر تحميل السجل" });
  }
});

// حذف فيديو من السجل
router.delete('/:videoId', async (req, res) => {
  try {
    const { error } = await supabase
      .from('videos')
      .delete()
      .eq('id', req.params.videoId);

    if (error) throw error;
    res.json({ message: "تم الحذف بنجاح" });
  } catch (error) {
    res.status(500).json({ error: "فشل الحذف" });
  }
});

module.exports = router;