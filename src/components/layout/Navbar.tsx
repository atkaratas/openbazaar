'use client'
import Link from 'next/link'
import { useCart } from '@/store/useCart'

export default function Navbar() {
  const items = useCart((state) => state.items)
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <nav className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo (Ana Sayfaya Dönüş) */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <span className="text-2xl font-black tracking-tight text-slate-900 uppercase">
              OPEN<span className="text-emerald-500">BAZAAR</span>
            </span>
            <span className="hidden md:block text-sm font-medium text-gray-500 border-l pl-2 ml-2">
              Global Gıda Pazar Yeri
            </span>
          </Link>

          {/* Arama Çubuğu */}
          <div className="flex-1 max-w-2xl px-8 hidden md:flex">
            <div className="w-full relative">
              <input 
                type="text" 
                placeholder="Ürün, kategori veya marka arayın..." 
                className="w-full bg-gray-100 border-transparent rounded-full py-2 pl-4 pr-10 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              />
              <button className="absolute right-3 top-2 text-gray-400 hover:text-emerald-500">
                🔍
              </button>
            </div>
          </div>

          {/* Sağ Menü */}
          <div className="flex items-center gap-6">
            <Link href="/products" className="hidden sm:block text-sm font-bold text-gray-700 hover:text-emerald-600">
              Tüm Ürünler
            </Link>

            <Link href="/register/seller" className="hidden md:block text-sm font-bold text-emerald-600 hover:text-emerald-800">
              Satıcı Ol
            </Link>

            <Link href="/login" className="text-sm font-bold text-gray-700 hover:text-slate-900">
              Giriş Yap
            </Link>

            {/* Sepet / Checkout Yönlendirmesi */}
            <Link href="/checkout" className="relative cursor-pointer text-gray-700 hover:text-emerald-600 transition-colors">
              <span className="text-2xl">🛒</span>
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  )
}
