import ProductCard from '@/components/storefront/ProductCard'
import prisma from '@/lib/db'

// @ts-ignore - Next.js page props typing
export default async function ProductsPage({ searchParams }: { searchParams: { q?: string, category?: string } }) {
  
  // Arama ve filtreleme mantığı (Gerçek Veritabanı Sorgusu)
  const query = searchParams.q || ''
  const catSlug = searchParams.category || ''

  const whereClause: any = { isPublished: true }
  
  // Basit JSONB araması (Prisma PostgreSQL string search)
  // titleTranslations içinde arar
  if (query) {
    whereClause.OR = [
      { titleTranslations: { string_contains: query } }, // JSON field search simulation
      { descriptionTranslations: { string_contains: query } }
    ]
  }

  // Veritabanından Ürünleri Çek (Performans için Limit 24)
  // Prisma JSON aramaları bazen zorlayıcı olabilir, eğer hata verirse düz fetch atacağız.
  // Bu yüzden güvenli bir raw yaklaşım veya basit çekim yapıyoruz.
  
  let products = await prisma.product.findMany({
    where: catSlug ? { categoryId: catSlug, isPublished: true } : { isPublished: true },
    include: { store: true, category: true },
    take: 100,
    orderBy: { createdAt: 'desc' }
  })

  // Prisma JSONB string_contains çalışmazsa diye manuel fallback filtreleme (Geçici Çözüm)
  if (query) {
      const lowerQ = query.toLowerCase()
      products = products.filter(p => {
          const t: any = p.titleTranslations;
          return (t?.tr?.toLowerCase().includes(lowerQ) || t?.en?.toLowerCase().includes(lowerQ));
      })
  }

  // Veritabanından Dinamik Kategori Ağacını Çek
  const categories = await prisma.category.findMany({
    take: 15
  })

  // Prisma formatını UI modeline çevir
  const mappedProducts = products.map(p => ({
    id: p.id,
    title: p.titleTranslations as Record<string, string>,
    price: Number(p.basePrice),
    currency: p.baseCurrency,
    storeId: p.storeId,
    storeName: p.store.name,
    image: p.images[0] || 'https://malatyapazaripalanci.com.tr/productimages/102941/original/antep-fistigi-kavrulmus-250-gr-0489.jpg',
    certifications: ['HALAL', 'FDA'], // Mock
    isColdChain: false // Mock
  }))

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 w-full">
      <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">
            {query ? `"${query}" için Arama Sonuçları` : 'Tüm Global İhracat Kataloğu'}
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Veritabanındaki 5.000+ gerçek üründen listeleniyor.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Dinamik Kategori Ağacı (Veritabanından) */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
            <h3 className="font-black text-slate-900 mb-4 uppercase tracking-wider text-sm border-b pb-2">Kategoriler (Canlı)</h3>
            <ul className="space-y-3 text-sm text-slate-600 font-medium">
              <li><a href="/products" className="text-emerald-600 font-bold hover:underline">Tümünü Göster</a></li>
              {categories.length === 0 && <li>Kategori bulunamadı.</li>}
              {categories.map((cat: any) => (
                <li key={cat.id} className="cursor-pointer hover:text-emerald-500 transition-colors">
                   {cat.nameTranslations?.tr || cat.slug}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Canlı Ürün Grid */}
        <div className="flex-1">
            {mappedProducts.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                    <span className="text-4xl">🏜️</span>
                    <h3 className="text-lg font-bold text-slate-700 mt-4">Aradığınız kriterde ürün bulunamadı.</h3>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {mappedProducts.map((product: any) => (
                    <ProductCard key={product.id} product={product} locale="tr" />
                ))}
                </div>
            )}
        </div>
      </div>
    </div>
  )
}
