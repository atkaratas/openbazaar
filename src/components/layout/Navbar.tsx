import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-blue-600">OB</span>
            <span className="hidden md:block text-sm font-medium text-gray-500 border-l pl-2 ml-2">
              OpenBazaar
            </span>
          </div>

          {/* Arama Çubuğu (ElasticSearch Bağlantı Noktası) */}
          <div className="flex-1 max-w-2xl px-8 hidden md:flex">
            <div className="w-full relative">
              <input 
                type="text" 
                placeholder="Ürün, kategori veya marka arayın..." 
                className="w-full w-full bg-gray-100 border-transparent rounded-full py-2 pl-4 pr-10 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <button className="absolute right-3 top-2 text-gray-400 hover:text-blue-500">
                🔍
              </button>
            </div>
          </div>

          {/* Sağ Menü (Dil, Kur, Auth, Sepet) */}
          <div className="flex items-center gap-4">
            {/* Dil ve Kur Seçici (Placeholder) */}
            <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer">
              <span>🌐 EN | USD</span>
            </div>

            {/* Satıcı Ol Butonu */}
            <Link href="/seller/register" className="hidden md:block text-sm font-medium text-blue-600 hover:text-blue-800">
              Satıcı Ol (Sell Globally)
            </Link>

            {/* Kullanıcı Girişi */}
            <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Giriş Yap
            </Link>

            {/* Sepet */}
            <div className="relative cursor-pointer text-gray-700 hover:text-blue-600">
              🛒
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </div>
          </div>

        </div>
      </div>
    </nav>
  )
}
