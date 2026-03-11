import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='bg-slate-900 text-white py-12'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>OpenBazaar Global © 2026 - Saf B2C Alışveriş Deneyimi</p>
        <div className="mt-4 text-xs text-slate-500 flex justify-center gap-4">
          <Link href="/register/seller" className="hover:text-slate-300 transition-colors">
            Partners (Tedarikçi Girişi / Kaydı)
          </Link>
          <Link href="/admin" className="hover:text-slate-300 transition-colors">
            Yönetim
          </Link>
        </div>
      </div>
    </footer>
  )
}
