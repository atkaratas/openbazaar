import Link from 'next/link'
import { LayoutDashboard, Package, Settings, LogOut, ExternalLink, Bot, Webhook } from 'lucide-react'

export default function SellerPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-black tracking-tight uppercase flex flex-col">
            <span className="text-slate-400 text-xs tracking-widest mb-1">Satıcı Paneli</span>
            <span>OPEN<span className="text-emerald-500">BAZAAR</span></span>
          </h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/seller/dashboard" className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors font-medium">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/seller/products" className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors font-medium">
            <Package size={20} /> Ürünlerim (Katalog)
          </Link>
          <Link href="/seller/ai-agent" className="flex items-center gap-3 px-3 py-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-900/30 rounded-lg transition-colors font-bold bg-slate-800/50">
            <Bot size={20} /> AI Satış Botu (Yeni)
          </Link>
          <Link href="/seller/api-settings" className="flex items-center gap-3 px-3 py-2 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-900/30 rounded-lg transition-colors font-medium">
            <Webhook size={20} /> API & Webhooks
          </Link>
          <Link href="/seller/settings" className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors font-medium">
            <Settings size={20} /> Mağaza Ayarları
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-sm font-medium">
            <ExternalLink size={18} /> Ana Vitrine Dön
          </Link>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-lg transition-colors text-sm font-bold text-left">
            <LogOut size={18} /> Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}
