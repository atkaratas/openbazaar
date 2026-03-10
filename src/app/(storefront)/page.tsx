import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      
      {/* Hero Banner - Gıda Odaklı */}
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

      {/* Gıda Kategorileri Grid */}
      <section className="max-w-7xl mx-auto py-16 px-4 w-full">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Öne Çıkan Gıda Kategorileri</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 gap-6">
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
            <Link href={cat.link} key={i} className="bg-white h-48 rounded-2xl shadow-sm border border-emerald-100 flex flex-col items-center justify-center text-gray-700 hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer">
              <span className="text-4xl mb-4">{cat.icon}</span>
              <span className="font-semibold text-center px-2">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}
