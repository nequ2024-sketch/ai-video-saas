import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover', // تأكد من استخدام آخر إصدار
  typescript: true,
});

// دالة لحساب سعر النقاط
export const calculateCreditsPrice = (credits: number) => {
  const pricePerCredit = 0.10; // 10 سنت لكل نقطة
  return credits * pricePerCredit;
};
