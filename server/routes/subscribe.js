const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout', async (req, res) => {
  const { planId, userId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: planId, // ID الخطة من لوحة Stripe
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${process.env.CLIENT_URL}/dashboard?success=true`,
      cancel_url: `${process.env.CLIENT_URL}/dashboard?canceled=true`,
      metadata: { userId: userId }
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: "فشل إنشاء جلسة الدفع" });
  }
});

module.exports = router;