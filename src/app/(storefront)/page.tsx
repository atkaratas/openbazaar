import Link from 'next/link'
import ProductCard from '@/components/storefront/ProductCard'

export default function HomePage() {
  // Malatya Pazarı simülasyon verileri
  const mockProducts = [
    {
      id: '1',
      title: { tr: 'Kavrulmuş Antep Fıstığı (Duble Boy) 1 KG', en: 'Roasted Pistachios (Double Size) 1 KG' },
      price: 24.50, // EUR bazında simülasyon (yaklaşık 850 TL)
      currency: 'EUR',
      storeId: 'store_1',
      storeName: 'Malatya Pazarı Palancı',
      image: 'https://malatyapazaripalanci.com.tr/productimages/102941/original/antep-fistigi-kavrulmus-250-gr-0489.jpg',
      certifications: ['HALAL', 'ISO'],
      isColdChain: false
    },
    {
      id: '2',
      title: { tr: 'Jumbo Gün Kurusu Kayısı 1 KG', en: 'Jumbo Sun-Dried Apricots 1 KG' },
      price: 12.90, // EUR (yaklaşık 450 TL)
      currency: 'EUR',
      storeId: 'store_1',
      storeName: 'Malatya Pazarı Palancı',
      image: 'https://malatyapazaripalanci.com.tr/productimages/102941/original/gun-kurusu-kayisi-250-gr-0504.jpg',
      certifications: ['ORGANIC', 'HALAL'],
      isColdChain: false
    },
    {
      id: '3',
      title: { tr: 'Kavrulmuş Tuzlu Badem 500g', en: 'Roasted Salted Almonds 500g' },
      price: 7.20, // EUR (yaklaşık 250 TL)
      currency: 'EUR',
      storeId: 'store_1',
      storeName: 'Malatya Pazarı Palancı',
      image: 'https://malatyapazaripalanci.com.tr/productimages/102941/original/badem-kavrulmus-250-gr-0498.jpg',
      certifications: ['HALAL'],
      isColdChain: false
    },
    {
      id: '4',
      title: { tr: 'Geleneksel Çifte Kavrulmuş Lokum 500g', en: 'Double Roasted Turkish Delight 500g' },
      price: 5.50, // EUR (yaklaşık 180 TL)
      currency: 'EUR',
      storeId: 'store_1',
      storeName: 'Malatya Pazarı Palancı',
      image: 'https://malatyapazaripalanci.com.tr/productimages/102941/original/cifte-kavrulmus-lokum-250-gr-0471.jpg',
      certifications: ['HALAL', 'FDA'],
      isColdChain: false
    }
  ]

  return (
    <div className="flex flex-col items-center justify-center">
      
      {/* Hero Banner */}
      <section className="w-full bg-emerald-700 text-white py-20 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Türkiye'nin Eşsiz Lezzetleri Dünyaya Açılıyor
        </h1>
        <p className="text-xl md:text-2xl font-light mb-10 max-w-3xl mx-auto text-emerald-100">
          En kaliteli Türk gıda üreticilerini global alıcılarla buluşturan B2B ve B2C Pazar Yeri. Tarladan ve atölyeden, doğrudan sınır ötesine.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/product/ornek-urun" className="bg-white text-emerald-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-all">
            Lezzetleri Keşfet
          </Link>
          <Link href="/register/seller" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-all">
            Tedarikçi Ol
          </Link>
        </div>
      </section>

      {/* Popüler Ürünler (Veri Çekildi) */}
      <section className="max-w-7xl mx-auto py-16 px-4 w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">En Çok Satan İhracat Ürünleri</h2>
            <p className="text-gray-500 mt-1">Malatya Pazarı Palancı ve diğer premium tedarikçilerden.</p>
          </div>
          <Link href="/product/ornek-urun" className="text-emerald-600 font-bold hover:underline">
            Tümünü Gör →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {mockProducts.map(product => (
            <ProductCard key={product.id} product={product} locale="tr" />
          ))}
        </div>
      </section>

      {/* Gıda Kategorileri Grid */}
      <section className="max-w-7xl mx-auto py-16 px-4 w-full bg-gray-50 rounded-3xl mt-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Öne Çıkan Gıda Kategorileri</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Premium Kuruyemiş', icon: '🌰', link: '/category/kuruyemis' },
            { name: 'Kuru Meyve & Kayısı', icon: '🍑', link: '/category/kurumeyve' },
            { name: 'Geleneksel Lokum', icon: '🍬', link: '/category/lokum' },
            { name: 'Ramazan Özel', icon: '🌙', link: '/category/ramazan-ozel' },
            { name: 'Antep Fıstığı', icon: '🥜', link: '/category/antep-fistigi' },
            { name: 'Ceviz & Badem', icon: '🥜', link: '/category/ceviz' },
            { name: 'Yöresel Kahveler', icon: '☕', link: '/category/kahve' },
            { name: 'Baharat & Salça', icon: '🌶️', link: '/category/baharat' }
          ].map((cat, i) => (
            <Link href={cat.link} key={i} className="bg-white h-32 rounded-2xl shadow-sm border border-emerald-100 flex flex-col items-center justify-center text-gray-700 hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer">
              <span className="text-3xl mb-2">{cat.icon}</span>
              <span className="font-semibold text-center px-2 text-sm">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}
