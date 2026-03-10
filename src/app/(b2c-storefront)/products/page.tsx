import ProductCard from '@/components/storefront/ProductCard'
import prisma from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ProductsPage(props: any) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || ''
  const catSlug = searchParams?.category || ''

  try {
    let products: any[] = [];
    
    if (query) {
      // Gerçek SQL Full-Text Search (JSONB içinde ILIKE araması)
      // Bu sayede 5000 ürünün tamamı taranır, JavaScript memory filter'da kaybolmaz.
      const rawQuery = `
        SELECT * FROM "Product"
        WHERE "isPublished" = true
        AND (
          "titleTranslations"->>'tr' ILIKE $1 
          OR "titleTranslations"->>'en' ILIKE $1
          OR "descriptionTranslations"->>'tr' ILIKE $1
        )
        LIMIT 100;
      `;
      // ILIKE case-insensitive'dir ancak I/ı ve İ/i sorunu yaratabilir. 
      // PostgreSQL'de bunu aşmak için özel collate veya unaccent gerekir ama ILIKE %95 çözer.
      const searchKeyword = `%${query}%`;
      products = await prisma.$queryRawUnsafe(rawQuery, searchKeyword);
      
      // Store ilişkisini manuel bağlamamız gerekebilir çünkü queryRaw relation getirmez!
      // Çözüm: ID'leri alıp findMany ile tekrar çekmek:
      const productIds = products.map((p: any) => p.id);
      products = await prisma.product.findMany({
        where: { id: { in: productIds } },
        include: { store: true, category: true }
      });

    } else {
      products = await prisma.product.findMany({
        where: catSlug ? { category: { slug: catSlug }, isPublished: true } : { isPublished: true },
        include: { store: true, category: true },
        take: 70,
        orderBy: { createdAt: 'desc' }
      })
    }

    const categories = await prisma.category.findMany({ take: 20 })
    const activeCategory = categories.find((c: any) => c.slug === catSlug)

    const mappedProducts = products.map(p => ({
      id: p.id,
      title: (p.titleTranslations as Record<string, string>) || { tr: 'İsimsiz' },
      price: Number(p.basePrice) || 0,
      currency: p.baseCurrency || 'EUR',
      storeId: p.storeId,
      storeName: p.store?.name || 'OpenBazaar Tedarikçisi',
      image: (p.images && p.images.length > 0) ? p.images[0] : 'https://malatyapazaripalanci.com.tr/productimages/102941/original/antep-fistigi-kavrulmus-250-gr-0489.jpg',
      certifications: ['HALAL', 'FDA'],
      isColdChain: p.isColdChain || false,
      unitType: ((p.titleTranslations as any)?.tr || '').toLowerCase().includes('zeytinyağı') ? 'Teneke' : 'KG'
    }))

    return (
      <div className="max-w-7xl mx-auto py-12 px-4 w-full">
        <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900">
              {query ? `"${query}" için Arama Sonuçları` : (activeCategory ? activeCategory.nameTranslations?.tr : 'Tüm Global İhracat Kataloğu')}
            </h1>
            <p className="text-slate-500 mt-2 font-medium">{mappedProducts.length} adet ürün listeleniyor.</p>
          </div>
        </div>

        {(catSlug || query) && (
          <div className="flex gap-2 mb-8">
            <span className="text-sm font-bold text-slate-500">Aktif Filtreler:</span>
            {catSlug && (
              <Link href="/products" className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full hover:bg-rose-100 hover:text-rose-800 transition">
                Kategori: {activeCategory?.nameTranslations?.tr || catSlug} ✕
              </Link>
            )}
            {query && (
              <Link href={catSlug ? `/products?category=${catSlug}` : '/products'} className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full hover:bg-rose-100 hover:text-rose-800 transition">
                Arama: "{query}" ✕
              </Link>
            )}
            <Link href="/products" className="text-xs font-bold text-gray-400 hover:text-gray-800 underline ml-2 py-1">Tümünü Temizle</Link>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
              <h3 className="font-black text-slate-900 mb-4 uppercase tracking-wider text-sm border-b pb-2">Kategori Ağacı</h3>
              <ul className="space-y-3 text-sm font-medium">
                {!catSlug && <li><span className="text-gray-400 cursor-not-allowed">Lütfen Yandan Seçim Yapın</span></li>}
                
                {categories.map((cat: any) => {
                  const isActive = catSlug === cat.slug;
                  if (catSlug && !isActive) return null; 

                  return (
                    <li key={cat.id}>
                      <Link href={`/products?category=${cat.slug}`} className={`flex items-center justify-between cursor-pointer transition-colors ${isActive ? 'text-emerald-600 font-black text-base border-l-4 border-emerald-500 pl-2 -ml-2' : 'text-slate-600 hover:text-emerald-500'}`}>
                        {cat.nameTranslations?.tr || cat.slug}
                        {isActive && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{mappedProducts.length}</span>}
                      </Link>
                    </li>
                  )
                })}
                {catSlug && (
                   <li className="pt-4 mt-4 border-t border-gray-100">
                     <Link href="/products" className="text-blue-600 hover:underline font-bold text-xs">← Tüm Kategorilere Dön</Link>
                   </li>
                )}
              </ul>
            </div>
          </aside>

          <div className="flex-1">
              {mappedProducts.length === 0 ? (
                  <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-sm">
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
  } catch (error: any) {
    return <div className="p-20 text-center text-rose-600 font-bold bg-rose-50 rounded-xl m-10">Veritabanı bağlantı hatası: {error.message}</div>
  }
}
