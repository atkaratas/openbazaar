import Link from 'next/link'

export default function B2BLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-slate-950 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/b2b" className="text-xl font-black tracking-widest text-emerald-400">OPENBAZAAR <span className="text-slate-400 text-sm font-medium">| WHOLESALE (B2B)</span></Link>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="/b2b/rfq" className="hover:text-emerald-400">Tekliflerim (RFQs)</Link>
            <Link href="/b2b/suppliers" className="hover:text-emerald-400">Doğrulanmış Üreticiler</Link>
            <Link href="/" className="text-slate-400 hover:text-white border-l border-slate-700 pl-6">B2C (Perakende) Müşteri Sitesine Dön</Link>
          </div>
        </div>
      </nav>
      {children}
    </div>
  )
}
