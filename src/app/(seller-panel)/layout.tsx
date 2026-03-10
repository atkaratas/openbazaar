'use client'

import Link from 'next/link'

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      
      {/* Sol Menü (Sidebar) */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <Link href="/" className="h-16 flex items-center px-6 bg-slate-950 hover:opacity-80 transition">
          <span className="text-xl font-bold text-white tracking-wide">OB | <span className="text-emerald-400 font-medium">Tedarikçi</span></span>
        </Link>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <Link href="/seller/dashboard" className="block px-4 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors">📊 Pano (Dashboard)</Link>
          <Link href="/seller/products" className="block px-4 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors">📦 Ürünlerim</Link>
          <Link href="/seller/orders" className="block px-4 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors">🛒 Sipariş Yönetimi (OMS)</Link>
          <Link href="/seller/finance" className="block px-4 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors">💳 Finans & Cüzdan</Link>
          <Link href="/seller/settings" className="block px-4 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors">⚙️ Mağaza Ayarları</Link>
          <div className="pt-6 mt-6 border-t border-slate-800">
            <Link href="/" className="block px-4 py-2 rounded-md text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">← Ana Vitrine Dön</Link>
            <Link href="/b2b" className="block px-4 py-2 rounded-md text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">← B2B Portala Git</Link>
          </div>
        </nav>
        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">MB</div>
            <div className="text-sm">
              <p className="text-white font-medium">Marmara Birlik</p>
              <p className="text-xs text-slate-500">ID: #9023</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Ana İçerik Alanı */}
      <main className="flex-1 overflow-y-auto flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800">Yönetim Masası</h1>
          <div className="flex items-center gap-4">
            <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-amber-200">2 Bekleyen Onay</span>
            <button className="text-gray-500 hover:text-gray-700" onClick={() => alert("Monkey Test temizlendi. Bildirim paneli bağlanacak.")}>🔔</button>
          </div>
        </header>
        <div className="p-8 flex-1">
          {children}
        </div>
      </main>
      
    </div>
  )
}
