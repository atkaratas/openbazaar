import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      
      {/* Sol Menü (Koyu Lacivert / Kurumsal) */}
      <aside className="w-72 bg-slate-950 text-slate-300 flex flex-col shadow-2xl">
        <Link href="/" className="h-20 flex items-center px-8 bg-black border-b border-slate-800 hover:opacity-80 transition">
          <span className="text-2xl font-black text-white tracking-widest uppercase">
            OPEN<span className="text-blue-500">BAZAAR</span>
            <span className="block text-xs text-slate-500 font-mono tracking-normal mt-1">Control Tower</span>
          </span>
        </Link>
        
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-4">Operasyon Merkezi</div>
          <Link href="/admin/dashboard" className="block px-4 py-3 rounded-lg hover:bg-slate-900 hover:text-white transition-all">📈 Kokpit (Analytics)</Link>
          
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-6 mb-2 px-4">Tedarik & Gümrük</div>
          <Link href="/admin/sellers/pending" className="block px-4 py-3 rounded-lg hover:bg-slate-900 hover:text-white transition-all flex justify-between items-center">
            <span>🛡️ Onay Bekleyen Satıcılar</span>
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">14</span>
          </Link>
          <Link href="/admin/products/audit" className="block px-4 py-3 rounded-lg hover:bg-slate-900 hover:text-white transition-all">🏷️ Ürün & Katalog Denetimi</Link>
          
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-6 mb-2 px-4">Finans & Lojistik</div>
          <Link href="/admin/finance" className="block px-4 py-3 rounded-lg hover:bg-slate-900 hover:text-white transition-all">💰 Kasa & Komisyon Dağıtımı</Link>
          <Link href="/admin/logistics" className="block px-4 py-3 rounded-lg hover:bg-slate-900 hover:text-white transition-all">✈️ Küresel Lojistik Radarı</Link>
          <Link href="/admin/disputes" className="block px-4 py-3 rounded-lg hover:bg-slate-900 hover:text-white transition-all flex justify-between items-center">
            <span>⚖️ İtirazlar (Disputes)</span>
            <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">3</span>
          </Link>

          <div className="pt-6 mt-6 border-t border-slate-800">
            <Link href="/" className="block px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition-all">← Ana Vitrine Dön</Link>
          </div>
        </nav>
        
        <div className="p-6 bg-slate-900 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold border-2 border-slate-950 shadow-lg">TK</div>
            <div>
              <p className="text-white font-semibold text-sm">Talha K.</p>
              <p className="text-xs text-blue-400 font-mono">System Owner</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Ana İçerik Alanı */}
      <main className="flex-1 overflow-y-auto flex flex-col">
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-10 shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-800">Sistem Radarı</h1>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-full border border-green-200 animate-pulse">
              SYSTEM ONLINE
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-slate-500 uppercase font-bold">24 Saatlik Ciro (Global)</p>
              <p className="text-xl font-black text-slate-800">$142,500.00</p>
            </div>
          </div>
        </header>
        
        <div className="p-10 flex-1">
          {children}
        </div>
      </main>
    </div>
  )
}
