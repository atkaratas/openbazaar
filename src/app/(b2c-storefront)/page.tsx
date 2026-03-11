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
  }

  if (products.length === 0) {
    products = [
      { id: '1', titleTranslations: { tr: 'Premium Malatya Gün Kurusu' }, basePrice: 12.50, baseCurrency: 'EUR', store: { name: 'Anadolu Organik' } },
      { id: '2', titleTranslations: { tr: 'Soğuk Sıkım Erken Hasat Zeytinyağı' }, basePrice: 45.00, baseCurrency: 'EUR', store: { name: 'Ege Bahçesi' } },
      { id: '3', titleTranslations: { tr: 'Antep Fıstığı Çifte Kavrulmuş' }, basePrice: 28.00, baseCurrency: 'EUR', store: { name: 'Antep Pazarı' } },
      { id: '4', titleTranslations: { tr: 'Geleneksel Çifte Kavrulmuş Lokum' }, basePrice: 15.00, baseCurrency: 'EUR', store: { name: 'Hacı Bekir' } },
      { id: '5', titleTranslations: { tr: 'Organik Çam Balı' }, basePrice: 35.00, baseCurrency: 'EUR', store: { name: 'Toros Arıcılık' } },
      { id: '6', titleTranslations: { tr: 'Taze Çekilmiş Türk Kahvesi' }, basePrice: 8.50, baseCurrency: 'EUR', store: { name: 'Kurukahveci' } },
      { id: '7', titleTranslations: { tr: 'Doğal Maraş Tarhanası' }, basePrice: 18.00, baseCurrency: 'EUR', store: { name: 'Yöresel Lezzetler' } },
      { id: '8', titleTranslations: { tr: 'Acı Pul Biber (İpek)' }, basePrice: 9.00, baseCurrency: 'EUR', store: { name: 'Baharatçı' } }
    ];
  }
  
  if (categories.length === 0) {
    categories = [
      { id: '1', slug: 'kurumeyve', nameTranslations: { tr: 'Kuru Meyve' } },
      { id: '2', slug: 'lokum', nameTranslations: { tr: 'Türk Lokumu' } },
      { id: '3', slug: 'olive-oils', nameTranslations: { tr: 'Zeytinyağı' } },
      { id: '4', slug: 'kuruyemis', nameTranslations: { tr: 'Kuruyemiş' } },
      { id: '5', slug: 'baharat', nameTranslations: { tr: 'Baharatlar' } },
      { id: '6', slug: 'kahve', nameTranslations: { tr: 'Kahve & Çay' } }
    ];
  }

  const mappedProducts = products.map(p => ({
    id: p.id,
    title: p.titleTranslations as Record<string, string>,
    price: Number(p.basePrice),
    currency: p.baseCurrency,
    storeId: p.storeId,
    storeName: p.store?.name || 'OpenBazaar Satıcısı',
    image: (p.images && p.images.length > 0) ? p.images[0] : 'https://malatyapazaripalanci.com.tr/productimages/102941/original/antep-fistigi-kavrulmus-250-gr-0489.jpg',
    certifications: ['HALAL', 'ISO'], 
    isColdChain: false 
  }));

  const categoryImages: Record<string, string> = {
    'kurumeyve': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=400&auto=format&fit=crop',
    'lokum': 'https://images.unsplash.com/photo-1579372785830-47b2da630cbf?q=80&w=400&auto=format&fit=crop',
    'olive-oils': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=400&auto=format&fit=crop',
    'kuruyemis': 'https://images.unsplash.com/photo-1599598425947-330026296904?q=80&w=400&auto=format&fit=crop',
    'baharat': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=400&auto=format&fit=crop', // fallback
    'kahve': 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=400&auto=format&fit=crop'
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] font-sans selection:bg-emerald-200">
      
      {/* Hero Banner: Full screen, dark overlay, high quality food background */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505253758473-96b7015fcd40?q=80&w=2000&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-black/50 bg-gradient-to-b from-black/40 via-black/40 to-[#FDFCF8]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto flex flex-col items-center mt-12">
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium tracking-wide mb-6">
            Yeni Hasat Ürünleri Geldi
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight drop-shadow-lg">
            Anadolu'nun Lüks <br className="hidden md:block"/> Lezzet Mirası
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-10 font-light max-w-2xl drop-shadow-md">
            En seçkin zeytinyağları, kuruyemişler ve geleneksel tatlar doğrudan üreticiden kapınıza.
          </p>
          
          {/* Search Bar */}
          <div className="w-full max-w-2xl bg-white/95 backdrop-blur-xl p-2 rounded-full shadow-2xl flex items-center border border-white/40 ring-4 ring-black/5 transition-all focus-within:ring-emerald-500/20">
            <div className="pl-4 pr-2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Ne aramıştınız? (Örn: Soğuk Sıkım Zeytinyağı)" 
              className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 py-3 px-2 text-lg w-full"
            />
            <button className="bg-emerald-800 hover:bg-emerald-900 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300 shadow-md">
              Ara
            </button>
          </div>
        </div>
      </section>

      {/* Modern Categories Horizontal Scroll/Grid */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 mb-16">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Kategorileri Keşfet</h2>
            <Link href="/categories" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors">
              Tümü &rarr;
            </Link>
          </div>
          <div className="flex overflow-x-auto pb-4 gap-4 md:gap-6 snap-x hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {categories.map((cat: any, idx: number) => {
              const bgImg = categoryImages[cat.slug] || categoryImages['kurumeyve'];
              return (
                <Link href={`/products?category=${cat.slug}`} key={cat.id || idx} className="snap-start shrink-0 group relative w-36 h-40 md:w-48 md:h-56 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gray-200">
                    <img src={bgImg} alt={cat.nameTranslations?.tr || cat.slug} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="block font-semibold text-base md:text-lg tracking-wide drop-shadow-md">
                      {cat.nameTranslations?.tr || cat.slug}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Minimalist Product Grid (Apple/Stripe Style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Boutique Seçkiler
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Gurme şeflerin ve damak tadına düşkünlerin tercihi, özenle seçilmiş premium ürünler.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {mappedProducts.map(product => (
            <div key={product.id} className="group flex flex-col">
              {/* Image Container */}
              <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-gray-100 mb-4 shadow-sm border border-gray-100 group-hover:shadow-lg transition-all duration-500">
                <img 
                  src={product.image} 
                  alt={product.title?.tr || 'Ürün'} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                <button className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-white/90 backdrop-blur-md text-gray-900 font-semibold py-2.5 px-6 rounded-full shadow-lg hover:bg-white hover:scale-105 transition-all duration-300 w-[85%] text-sm">
                  Hızlı İncele
                </button>
              </div>
              
              {/* Product Info */}
              <div className="px-1 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-emerald-700 tracking-wider uppercase">
                    {product.storeName}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 leading-snug line-clamp-2 mb-2 group-hover:text-emerald-800 transition-colors">
                  {product.title?.tr || 'İsimsiz Ürün'}
                </h3>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    {product.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} {product.currency === 'EUR' ? '€' : product.currency}
                  </span>
                  <button className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/products" className="inline-flex items-center justify-center py-3.5 px-8 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
            Tüm Koleksiyonu Görüntüle
          </Link>
        </div>
      </section>

      {/* Features/Trust Section */}
      <section className="bg-emerald-900 text-emerald-50 py-16 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-800 flex items-center justify-center mb-6 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-emerald-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Premium Kalite</h3>
              <p className="text-emerald-200/80 leading-relaxed">Özenle seçilmiş üreticilerden sertifikalı ve birinci sınıf yöresel lezzetler.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-800 flex items-center justify-center mb-6 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-emerald-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Hızlı ve Güvenli Teslimat</h3>
              <p className="text-emerald-200/80 leading-relaxed">Soğuk zincir opsiyonu ve global kargo ağımızla tazeliği korunarak kapınızda.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-800 flex items-center justify-center mb-6 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-emerald-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">%100 Güvenli Ödeme</h3>
              <p className="text-emerald-200/80 leading-relaxed">Stripe ve yerel ödeme altyapıları ile uluslararası standartlarda koruma.</p>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  )
}
