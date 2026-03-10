import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import prisma from '@/lib/db'

// Build aşamasında çökmemesi için env değişkeni boşsa fallback kullanıyoruz
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_mock_fallback'

const stripe = new Stripe(stripeKey, {
  apiVersion: '2023-10-16',
})

export async function POST(req: Request) {
  try {
    const { items, customerId, currency = 'USD' } = await req.json()

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: currency.toLowerCase(),
        product_data: {
          name: item.title['en'] || item.title['tr'],
          images: [item.image],
          metadata: {
            productId: item.id,
            storeId: item.storeId,
            gtipCode: '2005.70.00.00.00',
          },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal', 'ideal', 'alipay'],
      mode: 'payment',
      line_items: lineItems,
      customer_email: customerId ? undefined : 'guest@example.com',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/cart`,
      payment_intent_data: {
        transfer_group: `ORDER_${Date.now()}`,
      },
      metadata: {
        orderType: 'MICRO_EXPORT',
        isColdChain: 'true',
      }
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
