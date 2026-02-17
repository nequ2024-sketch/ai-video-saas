import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-01-28.clover',
})
export async function POST(req: Request) {
  // إصلاح خطأ الكوكيز في Next.js 16
  const cookieStore = await cookies(); 
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value },
        set(name: string, value: string, options: CookieOptions) { cookieStore.set({ name, value, ...options }) },
        remove(name: string, options: CookieOptions) { cookieStore.set({ name, value: '', ...options }) },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: '50 Credits (Nexa Pro)' },
        unit_amount: 1000,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${req.headers.get('origin')}/dashboard?success=true`,
    cancel_url: `${req.headers.get('origin')}/dashboard?canceled=true`,
    metadata: { userId: user.id }
  })

  return NextResponse.json({ url: session.url })
}