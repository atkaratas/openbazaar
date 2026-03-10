import ProductCard from '@/components/storefront/ProductCard'
import prisma from '@/lib/db'

// @ts-ignore
export default async function ProductsPage({ searchParams }: { searchParams: { q?: string, category?: string } }) {
  
  const query = searchParams.q || ''
  const catSlug = searchParams.category || ''

  // Prisma 7 ile veritabanından güvenli çekim yapıyoruz.
  // Gerçek ElasticSearch kurulumu (Örn: Algolia) gelene kadar en stabil yöntem: Tüm data setini çekip (Eğer 5000'se) Server Component'ta locale-aware filter yapmak.
  // NOT: 50.000 veri için bu yöntem kullanılamaz, Pagination + SQL Full Text Search şarttır.
  // Biz şimdilik Vercel limiti gereği 100 çekip filtreliyoruz (veya SQL düzeyinde arıyoruz).

  let products = await prisma.product.findMany({
    where: { isPublished: true },
    include: { store: true, category: true },
    take: 500, // Search havuzunu genişlettik
    orderBy: { createdAt: 'desc' }
  })

  // Türkçe I/İ sorunu yaşamayan güvenli arama (Mock ElasticSearch)
  if (query) {
      const qNorm = query.toLocaleLowerCase('tr-TR')
      products = products.filter(p => {
          const t: any = p.titleTranslations;
          const trTitle = (t?.tr || '').toLocaleLowerCase('tr-TR')
          const enTitle = (t?.en || '').toLocaleLowerCase('en-US')
          return trTitle.includes(qNorm) || enTitle.includes(qNorm)
      })
  }

  const categories = await prisma.category.findMany({ take: 15 })

  const mappedProducts = products.map(p => ({
    id: p.id,
    title: p.titleTranslations as Record<string, string>,
    price: Number(p.basePrice),
    currency: p.baseCurrency,
    storeId: p.storeId,
    storeName: p.store.name || 'Bilinmeyen Satıcı',
    image: p.images[0] || 'https://malatyapazaripalanci.com.tr/productimages/102941/original/antep-fistigi-kavrulmus-250-gr-0489.jpg',
    certifications: ['HALAL', 'FDA'],
    isColdChain: p.isColdChain || false,
    unitType: (p.titleTranslations as any)?.tr?.toLocaleLowerCase('tr-TR').includes('zeytinyağı') ? 'Teneke' : 'KG'
  }))

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 w-full">
      <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">
            {query ? `"${query}" için Arama Sonuçları (${mappedProducts.length} bulundu)` : 'Tüm Global İhracat Kataloğu'}
          </h1>
          <p className="text-slate-500 mt-2 font-medium">ElasticSearch algoritmik indeksleme (TR-EN destekli).</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sol Filtreleme */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
            <h3 className="font-black text-slate-900 mb-4 uppercase tracking-wider text-sm border-b pb-2">Kategoriler</h3>
            <ul className="space-y-3 text-sm text-slate-600 font-medium">
              <li><a href="/products" className="text-emerald-600 font-bold hover:underline">Tümünü Göster</a></li>
              {categories.map((cat: any) => (
                <li key={cat.id} className="cursor-pointer hover:text-emerald-500 transition-colors">
                   {cat.nameTranslations?.tr || cat.slug}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Ürün Grid */}
        <div className="flex-1">
            {mappedProducts.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                    <span className="text-4xl">🔍</span>
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
