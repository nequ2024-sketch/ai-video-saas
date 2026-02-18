const express = require('express');
const router = express.Router();
const { supabase } = require('../utils/supabaseClient');

// جلب رصيد المستخدم الحالي
router.get('/:userId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('points')
      .eq('id', req.params.userId)
      .single();

    if (error) throw error;
    res.json({ points: data.points });
  } catch (error) {
    res.status(500).json({ error: "فشل في جلب النقاط" });
  }
});

module.exports = router;