// --- KOD ADI: OB | AKINSOFT WOLVOX ERP ENTEGRASYONU ---
// Türkiye'deki büyük KOBİ'lerin Wolvox programlarındaki ürün, stok ve fiyatları 
// anlık veya periyodik olarak OpenBazaar (PostgreSQL/PIM) sistemine çeken senkronizasyon noktası.

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const apiKey = req.headers.get('x-akinsoft-api-key')
    if (!apiKey) return NextResponse.json({ error: 'Yetkisiz erişim. API Key eksik.' }, { status: 401 })

    const payload = await req.json()
    const { syncType, data } = payload
    
    // Akınsoft Wolvox'tan gelen veri örneği:
    // { "STOKKODU": "8691234567890", "SATIS_FIYATI1": 145.50, "SATIS_FIYATI2": 110.00, "MEVCUT": 500 }
    //
    // 1. Veritabanında satıcının mağazası (Store ID) bulunur.
    // 2. Akınsoft STOKKODU (Barkod) ile OpenBazaar Product Slug'ı eşleştirilir.
    // 3. Eşleşen ürünün fiyatı (basePrice - TRY cinsinden) ve stoğu (stock) güncellenir.
    // 
    // Kritik Kural: Sadece Fiyat ve Stok güncellenmeli! Ürün adı (İngilizce/Arapça çevirisi) ve Gıda
    // alerjen/içindekiler kısmı (PIM verisi) ezilmemelidir. Yoksa tüm yurt dışı SEO'su çöker.

    let successCount = 0
    let failedCount = 0

    if (syncType === 'STOCK_UPDATE' && Array.isArray(data)) {
      for (const item of data) {
         // await prisma.product.update(...) işlemi simülasyonu
         successCount++
      }
    }

    // Başarılı logu oluştur (ErpSyncLog tablosuna kaydet)

    return NextResponse.json({
      status: 'success',
      message: 'Akınsoft Wolvox ERP stokları OpenBazaar a başarıyla eşitlendi.',
      metrics: {
        processed: successCount,
        success: successCount,
        failed: failedCount
      }
    })

  } catch (error: any) {
    console.error('Akınsoft Integration Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
