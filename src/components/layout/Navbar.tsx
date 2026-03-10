'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useCart } from '@/store/useCart'

export default function Navbar() {
  const items = useCart((state) => state.items)
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <nav className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <span className="text-2xl font-black tracking-tight text-slate-900 uppercase">
              OPEN<span className="text-emerald-500">BAZAAR</span>
            </span>
          </Link>

          {/* Çalışan Arama Çubuğu */}
          <div className="flex-1 max-w-2xl px-8 hidden md:flex">
            <form onSubmit={handleSearch} className="w-full relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Örn: Antep fıstığı, zeytinyağı, lokum..." 
                className="w-full bg-gray-100 border border-gray-200 rounded-full py-2.5 pl-5 pr-12 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-medium text-slate-700"
              />
              <button type="submit" className="absolute right-4 top-2.5 text-gray-500 hover:text-emerald-600 font-bold">
                🔍
              </button>
            </form>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/products" className="hidden sm:block text-sm font-bold text-gray-700 hover:text-emerald-600">
              Tüm Kataloğu Gör
            </Link>
            <Link href="/register/seller" className="hidden md:block text-sm font-bold text-emerald-600 hover:text-emerald-800">
              Tedarikçi Ol
            </Link>
            <Link href="/login" className="text-sm font-bold text-gray-700 hover:text-slate-900">
              Giriş
            </Link>
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
