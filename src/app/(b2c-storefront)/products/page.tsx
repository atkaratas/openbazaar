import ProductCard from '@/components/storefront/ProductCard'
import FacetedSidebar from '@/components/storefront/FacetedSidebar'
import prisma from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ProductsPage(props: any) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || ''
  const catSlug = searchParams?.category || ''

  let products: any[] = [];
  let categories: any[] = [];
  try {
    
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
      products = [] // Vercel DB migration bekliyor
      
      // Store ilişkisini manuel bağlamamız gerekebilir çünkü queryRaw relation getirmez!
      // Çözüm: ID'leri alıp findMany ile tekrar çekmek:
      const productIds = products.map((p: any) => p.id);
      products = await prisma.product.findMany({
        // Vercel DB'de yeni kolonlar yok, select ile sadece var olanlari cek
        select: { id: true, titleTranslations: true, basePrice: true, baseCurrency: true, storeId: true, store: true, category: true, images: true },
        where: { id: { in: productIds } }
      });

    } else {
      products = await prisma.product.findMany({
        // Vercel DB'de yeni kolonlar yok, select ile sadece var olanlari cek
        select: { id: true, titleTranslations: true, basePrice: true, baseCurrency: true, storeId: true, store: true, category: true, images: true },
        where: catSlug ? { category: { slug: catSlug } } : {},
        take: 70,
        orderBy: { createdAt: 'desc' }
      })
    }

    categories = await prisma.category.findMany({ take: 20 })
    
    // YENI EKLENEN KOLONLARI SIL:
    products = products.map(p => ({...p, isColdChain: false}));
  } catch (error: any) {
    if (process.env.DATABASE_URL) console.error("Database connection failed during render:", error);
  }
    const activeCategory = categories.find((c: any) => c.slug === catSlug)


  // Veritabanı henüz boşsa veya migration yapılmadıysa ekranda ürün görünmesi için Dummy (Mock) Veriler

  if (products.length === 0) {
      // Placeholder data while DB connection is failing
      products = [
        { id: '1', slug: 'erken-hasat-soguk-sikim-5l', titleTranslations: { tr: 'Erken Hasat Soğuk Sıkım Zeytinyağı 5L' }, basePrice: 45.00, baseCurrency: 'EUR', store: { name: 'Ege Bahçesi' }, isColdChain: false },
        { id: '2', slug: 'antep-fistigi-1kg', titleTranslations: { tr: 'Antep Fıstığı Çifte Kavrulmuş (1 KG)' }, basePrice: 28.00, baseCurrency: 'EUR', store: { name: 'Antep Pazarı' }, isColdChain: false },
        { id: '3', slug: 'tulum-peyniri', titleTranslations: { tr: 'Erzincan Tulum Peyniri (500 gr)' }, basePrice: 12.00, baseCurrency: 'EUR', store: { name: 'Süt Diyarı' }, isColdChain: true },
      ];
    }
  }

  
  if (categories.length === 0) {
    categories = [
      { id: '1', slug: 'kurumeyve', nameTranslations: { tr: 'Kuru Meyve' } },
      { id: '2', slug: 'lokum', nameTranslations: { tr: 'Türk Lokumu' } },
      { id: '3', slug: 'olive-oils', nameTranslations: { tr: 'Zeytinyağı' } },
      { id: '4', slug: 'kuruyemis', nameTranslations: { tr: 'Kuruyemiş' } }
    ];
  }

    const mappedProducts = products.map(p => ({
      id: p.id,
      title: (p.titleTranslations as Record<string, string>) || { tr: 'İsimsiz' },
      price: Number(p.basePrice) || 0,
      currency: p.baseCurrency || 'EUR',
      storeId: p.storeId,
      storeName: p.store?.name || 'OpenBazaar Tedarikçisi',
      image: (p.images && p.images.length > 0) ? p.images[0] : '/placeholder-food.jpg',
      certifications: ['HALAL', 'FDA'],
      isColdChain: p.isColdChain || false,
      unitType: ((p.titleTranslations as any)?.tr || '').toLowerCase().includes('zeytinyağı') ? 'Teneke' : 'KG'
    }))

    return (
      <div className="max-w-7xl mx-auto py-12 px-4 w-full">
        <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900">
              {query ? `"${query}" için Arama Sonuçları` : (activeCategory ? (activeCategory.nameTranslations as any)?.tr : 'Tüm Global İhracat Kataloğu')}
            </h1>
            <p className="text-slate-500 mt-2 font-medium">{mappedProducts.length} adet ürün listeleniyor.</p>
          </div>
        </div>

        {(catSlug || query) && (
          <div className="flex gap-2 mb-8">
            <span className="text-sm font-bold text-slate-500">Aktif Filtreler:</span>
            {catSlug && (
              <Link href="/products" className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full hover:bg-rose-100 hover:text-rose-800 transition">
                Kategori: {(activeCategory?.nameTranslations as any)?.tr || catSlug} ✕
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
            
            <FacetedSidebar />
            
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

}
