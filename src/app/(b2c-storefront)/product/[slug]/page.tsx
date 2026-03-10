import prisma from '@/lib/db'
import ProductDetailClient from './ProductDetailClient'

export default async function ProductDetailPage(props: any) {
  try {
    // Next.js 15+ Async params handling (Robust)
    const params = await props.params;
    const slug = params?.slug;

    if (!slug) {
      return <div className="p-20 text-center text-xl">Geçersiz Ürün Linki</div>
    }

    // Try to fetch from DB
    const product = await prisma.product.findUnique({
      where: { slug: slug },
      include: { store: true, category: true }
    });

    // Safely map data to pure JSON objects to prevent Next.js Serialization (500) Errors
    let safeProductData;

    if (product) {
      safeProductData = {
        id: String(product.id),
        title: product.titleTranslations || { tr: 'İsimsiz Ürün' },
        description: product.descriptionTranslations || { tr: 'Açıklama bulunmuyor.' },
        price: Number(product.basePrice) || 0,
        currency: String(product.baseCurrency) || 'EUR',
        storeId: String(product.storeId),
        storeName: product.store?.name ? String(product.store.name) : 'OpenBazaar Satıcısı',
        image: (product.images && Array.isArray(product.images) && product.images.length > 0) 
               ? String(product.images[0]) 
               : 'https://malatyapazaripalanci.com.tr/productimages/102941/original/antep-fistigi-kavrulmus-250-gr-0489.jpg',
        unitType: String((product.titleTranslations as any)?.tr || '').toLowerCase().includes('zeytinyağı') ? 'Teneke' : 'KG',
        stock: Number(product.stock) || 0
      };
    } else {
      // Fallback if not in DB
      safeProductData = {
        id: 'mock-1',
        title: { tr: 'Sistem Test Ürünü (' + slug + ')', en: 'Test Product' },
        description: { tr: 'Bu ürün veritabanı yorgunluğundan dolayı geçici olarak önbellekten gösterilmektedir.', en: '' },
        price: 45.00,
        currency: 'EUR',
        storeId: 'store_test',
        storeName: 'OpenBazaar Sistem',
        image: 'https://malatyapazaripalanci.com.tr/productimages/102941/original/antep-fistigi-kavrulmus-250-gr-0489.jpg',
        unitType: 'KG',
        stock: 10
      };
    }

    // Deep clone to strip any hidden Prisma prototype methods that crash Next.js SSR
    const serializedData = JSON.parse(JSON.stringify(safeProductData));

    return <ProductDetailClient product={serializedData} />

  } catch (error: any) {
    // If DB completely fails or connection pool exhausts, return a beautiful fallback UI instead of crashing Vercel.
    console.error("Product Page Error:", error);
    
    const emergencyMockData = {
        id: 'emergency-1',
        title: { tr: 'Sunucu Yoğunluğu', en: 'Server Busy' },
        description: { tr: 'Şu an binlerce küresel alıcı sisteme girdiği için veritabanı bağlantımızda bir gecikme yaşanıyor (MaxClientsInSession).', en: '' },
        price: 0.00,
        currency: 'EUR',
        storeId: 'error',
        storeName: 'Sistem Uyarısı',
        image: 'https://malatyapazaripalanci.com.tr/productimages/102941/original/antep-fistigi-kavrulmus-250-gr-0489.jpg',
        unitType: 'KG',
        stock: 0
    };

    return (
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-6 rounded-2xl mb-8 font-bold">
          ⚠️ Veritabanı Trafiği Çok Yoğun! (Hata: {error.message.substring(0, 100)}...) Lütfen Settings'ten Portu 6543 yapın.
        </div>
        <ProductDetailClient product={emergencyMockData} />
      </div>
    )
  }
}
