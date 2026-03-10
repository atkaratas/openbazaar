import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import prisma from '@/lib/db'

// Müşterinin (Yurt dışı alıcı) ödediği para %100 oranında OpenBazaar'ın ana Stripe hesabına düşecek.
// OpenBazaar ihracat (Mikro İhracat / ETGB) faturasını keseceği için "Merchant of Record" biziz.
// Arka planda ise Stripe Connect ile "Transfer" (Separate Charges) metodunu kullanıp,
// ürünün toptan alış fiyatını (KDV dahil) Türkiye'deki tedarikçiye göndereceğiz.

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16', // En son API versiyonlarından biri (Kendi SDK sürümümüze uyarlanmalı)
})

export async function POST(req: Request) {
  try {
    const { items, customerId, currency = 'USD' } = await req.json()

    // 1. Gelen sepet verisini güvenli hale getirmek için veritabanından güncel fiyatları (B2C/B2B duruma göre) ve satıcı kimliklerini (stripeAccountId) çek.
    // (Simüle edilmiş - DB'den product price, store stripe_account_id ve moq gibi değerler alınmalı)

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: currency.toLowerCase(),
        product_data: {
          name: item.title['en'] || item.title['tr'], // Yurt dışı faturası için İngilizce öncelikli
          images: [item.image],
          metadata: {
            productId: item.id,
            storeId: item.storeId,
            gtipCode: '2005.70.00.00.00', // Örn: Zeytin GTİP kodu - Gümrük (Mikro İhracat) için şart
          },
        },
        unit_amount: Math.round(item.price * 100), // Stripe tutarı kuruş/cent cinsinden bekler
      },
      quantity: item.quantity,
    }))

    // 2. Mikro İhracat Kısıtı Kontrolü (ETGB Kuralı): 
    // Sepet toplamı 15.000 EUR (veya karşılığı USD/GBP) ve 300 KG brüt ağırlığı aşamaz.
    // Eğer aşarsa bu işlem B2C (Mikro İhracat) olmaktan çıkar, normal ihracat rejimine girer ve Gümrük Müşaviri şart olur.
    
    // (Buraya ağırlık ve tutar toplamı hesaplama mantığı gelecek)
    
    // 3. Checkout Session (Ödeme Ekranı) Oluştur
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal', 'ideal', 'alipay'], // Global pazar
      mode: 'payment',
      line_items: lineItems,
      customer_email: customerId ? undefined : 'guest@example.com', // Gerçek senaryoda user email
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cart`,
      
      // Mikro İhracat: Faturayı biz kestiğimiz için ödemeyi tam olarak üzerimize alıyoruz.
      // payment_intent_data.transfer_group ile, paranın satıcıya gidecek kısmını sonradan
      // Webhook üzerinden onaylandıktan (Örn: Ürün kargoya verildiğinde) "Transfer" edeceğiz.
      payment_intent_data: {
        transfer_group: `ORDER_${Date.now()}`,
      },
      metadata: {
        orderType: 'MICRO_EXPORT', // Siparişin türü
        isColdChain: 'true',       // En az bir üründe soğuk zincir varsa kargo entegrasyonuna sinyal ver
      }
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
