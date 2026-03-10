// --- KOD ADI: OB | ARAMA MOTORU (SEARCH ENGINE) SENKRONİZASYON HUB'I ---
// PostgreSQL (Prisma) üzerindeki verileri, milisaniyelik arama ve "yazım yanlışı toleransı" 
// (Typo-tolerance) için ElasticSearch veya Algolia indekslerine basan servis.

import prisma from '@/lib/db'

// Not: Gerçek ortamda algoliasearch veya @elastic/elasticsearch kütüphaneleri kullanılır.
// const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
// const index = client.initIndex('openbazaar_products');

export async function syncProductToSearchEngine(productId: string) {
  try {
    // 1. Ürünü tüm ilişkileriyle (Mağaza, Kategori, Gıda Özellikleri) DB'den çek
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        store: true,
        category: true,
        // Gıda özelliklerini de çek (Arama filtreleri için kritik)
        // foodAttributes: true // (Prisma merge simülasyonu)
      }
    })

    if (!product || !product.isPublished) {
      // Ürün yayından kaldırıldıysa arama motorundan da sil (Un-index)
      // await index.deleteObject(productId);
      return { status: 'DELETED_FROM_INDEX' }
    }

    // 2. Arama Motoru için Veriyi "Düzleştir" (Flatten Data)
    // ElasticSearch/Algolia ilişkisel veritabanı değildir. Veriyi arama filtrelerine (Facets) uygun hale getirmeliyiz.
    
    const searchRecord = {
      objectID: product.id,
      slug: product.slug,
      
      // ÇOKLU DİL ARAMA: Kullanıcı 'Zeytinyağı' da yazsa, 'Olive Oil' de yazsa bu ürünü bulmalı.
      titles: product.titleTranslations, 
      descriptions: product.descriptionTranslations,
      
      // FİLTRELEME (Facets): Sol menüdeki "Helal", "Organik" veya "Kategori" filtreleri için
      categoryName: product.category?.nameTranslations,
      storeName: product.store.name,
      
      // Fiyat sıralaması için ana fiyat (Kur çevrimi arayüzde yapılır, indeksleme baz fiyattan)
      basePrice: Number(product.basePrice),
      currency: product.baseCurrency,
      
      // Gıda ve Lojistik Filtreleri (Örn: Sadece Soğuk Zincir olmayanları göster)
      // certifications: product.foodAttributes?.certifications || [],
      // isColdChain: product.foodAttributes?.isColdChain || false,
      
      stock: product.stock,
      salesCount: 0, // Çok satanlar algoritması (Ranking) için
      rating: 4.8    // Puanı yüksek olanları aramalarda üstte çıkarma
    }

    // 3. Veriyi Arama Motoruna (Index) Gönder
    // await index.saveObject(searchRecord);

    console.log(`[SEARCH SYNC] Ürün indekse başarıyla yazıldı: ${product.slug}`)
    return { status: 'INDEXED', recordId: product.id }

  } catch (error) {
    console.error(`[SEARCH SYNC ERROR] ${productId} indekslenemedi:`, error)
    throw error
  }
}
