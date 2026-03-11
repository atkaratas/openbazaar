import Link from 'next/link'
import ProductCard from '@/components/storefront/ProductCard'
import prisma from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let products: any[] = [];
  let categories: any[] = [];

  try {
    products = await prisma.product.findMany({
      select: { id: true, titleTranslations: true, basePrice: true, baseCurrency: true, storeId: true, store: true, images: true, createdAt: true },
      take: 8,
      orderBy: { createdAt: 'desc' }
    });

    categories = await prisma.category.findMany({ take: 8 });
  } catch (error) {
    console.error("Database connection failed during render:", error);
    // Fallback empty arrays during build time if DB is not available
  }

  const mappedProducts = products.map(p => ({
    id: p.id,
    title: p.titleTranslations as Record<string, string>,
    price: Number(p.basePrice),
    currency: p.baseCurrency,
    storeId: p.storeId,
    storeName: p.store?.name || 'OpenBazaar Satıcısı',
    image: p.images?.[0] || 'https://malatyapazaripalanci.com.tr/productimages/102941/original/antep-fistigi-kavrulmus-250-gr-0489.jpg',
    certifications: ['HALAL', 'ISO'], 
    isColdChain: false 
  }))

  const categoryIcons: Record<string, string> = {
    'kurumeyve': '🍑',
    'lokum': '🍬',
    'ramazan-ozel': '🌙',
    'antep-fistigi': '🥜',
    'ceviz': '🥜',
    'kahve': '☕',
    'baharat': '🌶️',
    'kuruyemis': '🌰',
    'olive-oils': '🫒'
  }

  return (
    <div className="flex flex-col items-center justify-center w-full overflow-x-hidden">
      
      {/* Hero Banner */}
      <section className="w-full bg-emerald-700 text-white py-20 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Türkiye'nin Eşsiz Lezzetleri Dünyaya Açılıyor
        </h1>
        <p className="text-xl md:text-2xl font-light mb-10 max-w-3xl mx-auto text-emerald-100">
          En kaliteli Türk gıda üreticilerini global alıcılarla buluşturan B2B ve B2C Pazar Yeri.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/products" className="bg-white text-emerald-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-all">
            Kataloğu Keşfet
          </Link>
          <Link href="/register/seller" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-all">
            Tedarikçi Ol
          </Link>
        </div>
      </section>

      {/* Dinamik Gıda Kategorileri Grid */}
      <section className="max-w-7xl mx-auto py-16 px-4 w-full bg-gray-50 rounded-3xl mt-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Öne Çıkan Gıda Kategorileri</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat: any) => (
            <Link href={`/products?category=${cat.slug}`} key={cat.id} className="bg-white h-32 rounded-2xl shadow-sm border border-emerald-100 flex flex-col items-center justify-center text-gray-700 hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer">
              <span className="text-3xl mb-2">{categoryIcons[cat.slug] || '📦'}</span>
              <span className="font-semibold text-center px-2 text-sm">{cat.nameTranslations?.tr || cat.slug}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popüler Ürünler */}
      <section className="max-w-7xl mx-auto py-16 px-4 w-full">
        <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">En Son İhraç Ürünleri</h2>
            <p className="text-gray-500 mt-1">Supabase veritabanındaki 5000+ test ürününden çekiliyor.</p>
          </div>
          <Link href="/products" className="text-emerald-600 font-bold hover:underline">
            Tümünü Gör →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {mappedProducts.map(product => (
            <ProductCard key={product.id} product={product} locale="tr" />
          ))}
        </div>
      </section>

    </div>
  )
}
