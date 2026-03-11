import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck, Star, MapPin, ShieldCheck, Leaf, Factory, ShoppingBag } from 'lucide-react';

export default function StorefrontPage({ params }: { params: { storeId: string } }) {
  // In a real app, you would fetch the store data using params.storeId
  // Mock Data for the storefront
  const store = {
    id: params.storeId,
    name: 'Anadolu Organik Çiftliği',
    logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200&h=200',
    coverImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfefcb38?auto=format&fit=crop&q=80&w=1200&h=400',
    rating: 4.8,
    reviewsCount: 342,
    location: 'Malatya, Türkiye',
    joined: '2021',
    description: "Anadolu'nun bereketli topraklarından özenle seçilmiş, tamamen doğal ve organik yöntemlerle yetiştirdiğimiz ürünlerimizi dünya sofralarına taşıyoruz. Kurutulmuş meyveler, kuruyemişler ve yöresel lezzetlerimizde geleneksel yöntemleri modern kalite standartlarıyla harmanlıyoruz.",
    certificates: [
      { id: 1, name: 'FDA Approved', icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
      { id: 2, name: 'Helal Sertifikası', icon: BadgeCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      { id: 3, name: 'ISO 9001:2015', icon: Factory, color: 'text-indigo-600', bg: 'bg-indigo-50' },
      { id: 4, name: 'Organik Tarım', icon: Leaf, color: 'text-green-600', bg: 'bg-green-50' }
    ],
    products: [
      { id: 1, name: 'Jumbo Gün Kurusu Kayısı', price: '$12.99', image: 'https://images.unsplash.com/photo-1596422846543-74c6fc0e241e?auto=format&fit=crop&q=80&w=400&h=400', category: 'Kuru Meyve', rating: 4.9 },
      { id: 2, name: 'Organik Ceviz İçi', price: '$18.50', image: 'https://images.unsplash.com/photo-1595166665795-3ab8deca10fc?auto=format&fit=crop&q=80&w=400&h=400', category: 'Kuruyemiş', rating: 4.7 },
      { id: 3, name: 'Doğal Dut Kurusu', price: '$9.90', image: 'https://images.unsplash.com/photo-1623956660142-6eeb9b2de218?auto=format&fit=crop&q=80&w=400&h=400', category: 'Kuru Meyve', rating: 4.8 },
      { id: 4, name: 'Kavrulmuş Fındık', price: '$15.00', image: 'https://images.unsplash.com/photo-1590005354167-6da97ce231ce?auto=format&fit=crop&q=80&w=400&h=400', category: 'Kuruyemiş', rating: 4.6 },
      { id: 5, name: 'Organik Kuru İncir', price: '$14.25', image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=400&h=400', category: 'Kuru Meyve', rating: 4.9 },
      { id: 6, name: 'Antep Fıstığı', price: '$22.50', image: 'https://images.unsplash.com/photo-1563114773-84221bd62bf3?auto=format&fit=crop&q=80&w=400&h=400', category: 'Kuruyemiş', rating: 4.9 },
    ]
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="relative h-64 md:h-80 w-full overflow-hidden">
          <Image 
            src={store.coverImage} 
            alt={`${store.name} Cover`} 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-16 sm:-mt-24 pb-8 flex flex-col sm:flex-row items-center sm:items-end gap-6">
            {/* Logo */}
            <div className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden shrink-0">
              <Image 
                src={store.logo} 
                alt={store.name} 
                fill 
                className="object-cover" 
              />
            </div>
            
            {/* Info */}
            <div className="flex-1 text-center sm:text-left pt-2 sm:pt-0 pb-2">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center sm:justify-start gap-2">
                {store.name}
                <BadgeCheck className="w-6 h-6 text-blue-500" />
              </h1>
              
              <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-medium text-gray-900">{store.rating}</span>
                  <span>({store.reviewsCount} Değerlendirme)</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full" />
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{store.location}</span>
                </div>
              </div>
            </div>
            
            <div className="w-full sm:w-auto flex gap-3">
              <button className="flex-1 sm:flex-none px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                Mesaj Gönder
              </button>
              <button className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                Takip Et
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Sidebar: About & Badges */}
        <div className="lg:col-span-1 space-y-6">
          {/* About Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Hakkımızda</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {store.description}
            </p>
            <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between text-sm">
              <span className="text-gray-500">Katılım Tarihi</span>
              <span className="font-medium text-gray-900">{store.joined}</span>
            </div>
          </div>

          {/* Certificates Badges */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Sertifikalar & Onaylar</h2>
            <div className="space-y-3">
              {store.certificates.map(cert => {
                const Icon = cert.icon;
                return (
                  <div key={cert.id} className={`flex items-center gap-3 p-3 rounded-lg border border-gray-50 ${cert.bg}`}>
                    <Icon className={`w-5 h-5 ${cert.color}`} />
                    <span className="text-sm font-medium text-gray-800">{cert.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Content: Product Grid */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Tüm Ürünler
            </h2>
            <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none shadow-sm">
              <option>En Popüler</option>
              <option>Fiyat: Düşükten Yükseğe</option>
              <option>Fiyat: Yüksekten Düşüğe</option>
              <option>Yeni Eklenenler</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {store.products.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs text-blue-600 font-medium mb-1">{product.category}</div>
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem] mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-xs font-medium text-gray-700">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-gray-900">{product.price}</span>
                    <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors">
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}