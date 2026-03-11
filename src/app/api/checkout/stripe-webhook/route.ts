import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_123', {
  apiVersion: '2026-02-25.clover',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    if (!sig || !endpointSecret) {
      throw new Error('Missing stripe signature or webhook secret');
    }
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Müşteri ödemesi tamamlandığında devreye girer
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log('Payment successful for session:', session.id);
    
    // Split payment mantığı zaten Stripe Checkout oluşturulurken (transfer_data ve application_fee_amount) 
    // belirtildiği için Stripe komisyon (platform %10 + DHL lojistik ücreti) kesintisini otomatik yapar 
    // ve kalanı connected account'a aktarır. 
    
    // Burada siparişi "ödendi" olarak işaretleyebilir ve kargo sürecini başlatabiliriz.
    // const orderId = session.client_reference_id;
    // await db.order.update({ where: { id: orderId }, data: { status: 'PAID' }});

    console.log(`Payment processed. Funds split & transferred to destination: ${session.payment_intent}`);
  }

  return NextResponse.json({ received: true });
}