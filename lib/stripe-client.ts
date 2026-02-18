import { loadStripe } from '@stripe/stripe-js';

export const checkout = async (priceId: string) => {
  const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId }),
  });

  const session = await response.json();
  await stripe?.redirectToCheckout({ sessionId: session.id });
};
