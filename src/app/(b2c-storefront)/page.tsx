import Link from 'next/link'
import prisma from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let products: any[] = [];
  let categories: any[] = [];

  try {
    products = await prisma.product.findMany({
      select: { id: true, titleTranslations: true, basePrice: true, baseCurrency: true, storeId: true, store: true, images: true, createdAt: true },
      take: 12,
      orderBy: { createdAt: 'desc' }
    });

    categories = await prisma.category.findMany({ take: 8 });
  } catch (error) {
    if (process.env.DATABASE_URL) console.error("Database connection failed during render:", error);
  }

  

  const mappedProducts = products.map(p => ({
    id: p.id,
    title: p.titleTranslations as Record<string, string>,
    price: Number(p.basePrice),
    currency: p.baseCurrency,
    storeId: p.storeId,
    storeName: p.store?.name || 'OpenBazaar Satıcısı',
    image: (p.images && p.images.length > 0) ? p.images[0] : '/placeholder-food.jpg',
    isColdChain: false 
  }));

  return (
    <div className="min-h-screen bg-[#FDFCF8] font-sans selection:bg-[#5B821D]/20">
      
      {/* Fresh Hero Section */}
      <section className="w-full relative bg-[#F3F7ED] p-6 lg:p-12 mb-8 border-b border-[#e1ebd2]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-[#5B821D] font-bold text-xs uppercase tracking-widest rounded border border-[#5B821D]/20">
              <span className="w-2 h-2 rounded-full bg-[#5B821D] animate-pulse"></span>
              Taze & Lokal
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Anadolu'nun Hasadı <br/> <span className="text-[#5B821D]">Kapınızda.</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl font-medium">
              Soğuk zincir garantisiyle, tarladan sofranıza taze gıda ihracatı. Gurme ürünleri şimdi global DHL ağıyla sipariş edin.
            </p>
            <div className="pt-2">
              <Link href="/products" className="inline-flex items-center gap-2 bg-[#5B821D] hover:bg-[#4a6b16] text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Kataloğu İncele
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full relative aspect-square max-w-md hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop" 
              alt="Fresh Produce" 
              className="w-full h-full object-cover rounded-[3rem] rounded-tl-none shadow-2xl border-4 border-white"
            />
          </div>
        </div>
      </section>

      {/* FreshDirect Style Product Grid */}
      <section className="px-4 lg:px-8 py-6 w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Haftanın Seçilmiş Ürünleri
          </h2>
          <Link href="/products" className="text-[#5B821D] font-semibold hover:underline underline-offset-4">
            Tümünü Gör
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {mappedProducts.map(product => (
            <div key={product.id} className="group bg-white rounded-xl border border-gray-200 hover:border-[#5B821D] hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
              {/* Image */}
              <div className="relative aspect-square w-full bg-white p-4 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title?.tr || 'Ürün'} 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Info */}
              <div className="p-4 flex flex-col flex-1 border-t border-gray-100">
                <span className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wide">
                  {product.storeName}
                </span>
                <Link href={`/product/${product.id}`} className="text-sm md:text-base font-semibold text-slate-900 leading-snug line-clamp-2 mb-3 hover:text-[#5B821D]">
                  {product.title?.tr || 'İsimsiz Ürün'}
                </Link>
                
                <div className="mt-auto flex flex-col gap-3">
                  <div className="text-lg md:text-xl font-bold text-slate-900">
                    {product.currency === 'EUR' ? '€' : ''}{product.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                  </div>
                  
                  {/* FreshDirect Quick Add Button */}
                  <button className="w-full bg-white border-2 border-[#5B821D] text-[#5B821D] hover:bg-[#5B821D] hover:text-white font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Ekle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* FreshDirect Value Props */}
      <section className="bg-slate-900 text-white mt-12 w-full py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
           <div>
              <h3 className="text-xl font-bold mb-2">Çiftlikten Kapıya</h3>
              <p className="text-slate-400 text-sm">Doğrudan üreticiden alarak aracıları ortadan kaldırıyoruz. Daha taze, daha uygun.</p>
           </div>
           <div>
              <h3 className="text-xl font-bold mb-2">%100 Memnuniyet</h3>
              <p className="text-slate-400 text-sm">Üründen memnun kalmazsanız, sorgusuz sualsiz anında iade garantisi.</p>
           </div>
           <div>
              <h3 className="text-xl font-bold mb-2">Soğuk Zincir DHL</h3>
              <p className="text-slate-400 text-sm">+4°C ve -18°C araçlarla global teslimat ağı. Lezzet asla bozulmaz.</p>
           </div>
        </div>
      </section>

    </div>
  )
}