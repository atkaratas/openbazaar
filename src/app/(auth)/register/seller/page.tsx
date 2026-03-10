'use client'

import { ShieldCheck, Building2, Globe } from 'lucide-react'

export default function SellerRegisterPage() {
  return (
    <div className="min-h-screen bg-emerald-900 flex flex-col md:flex-row">
      
      {/* Sol Bilgi Alanı */}
      <div className="md:w-1/2 p-12 flex flex-col justify-center text-emerald-50">
        <h1 className="text-4xl font-black text-white mb-6">Dünyaya Açılan<br/>Kapınız: OpenBazaar</h1>
        <p className="text-lg text-emerald-100 mb-8 max-w-lg">
          Türkiye'nin eşsiz gıda ürünlerini 140'tan fazla ülkeye, gümrük ve lojistik dertleriyle uğraşmadan tek tıkla satın.
        </p>
        <ul className="space-y-4">
          <li className="flex items-center gap-3"><Globe className="text-emerald-400"/> Milyonlarca global müşteriye anında erişim.</li>
          <li className="flex items-center gap-3"><ShieldCheck className="text-emerald-400"/> Gümrük beyannameleri (ETGB) ve kargo bizden.</li>
          <li className="flex items-center gap-3"><Building2 className="text-emerald-400"/> Toptan (B2B) veya Perakende (B2C) satış özgürlüğü.</li>
        </ul>
      </div>

      {/* Sağ Form Alanı */}
      <div className="md:w-1/2 bg-white p-12 flex flex-col justify-center rounded-l-3xl shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tedarikçi Başvurusu</h2>
        <p className="text-sm text-gray-500 mb-8">Formu doldurun, belgelerinizi yükleyin ve ihracata başlayın.</p>

        <form className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Şirket Ünvanı</label>
              <input type="text" className="w-full border-gray-300 rounded-md focus:ring-emerald-500 p-2.5 border bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vergi Numarası (VKN)</label>
              <input type="text" className="w-full border-gray-300 rounded-md focus:ring-emerald-500 p-2.5 border bg-gray-50" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-Posta (Kurumsal)</label>
            <input type="email" className="w-full border-gray-300 rounded-md focus:ring-emerald-500 p-2.5 border bg-gray-50" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
              <input type="password" className="w-full border-gray-300 rounded-md focus:ring-emerald-500 p-2.5 border bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ana Kategori</label>
              <select className="w-full border-gray-300 rounded-md focus:ring-emerald-500 p-2.5 border bg-gray-50">
                <option>Kuru Gıda</option>
                <option>Zeytinyağı & Soslar</option>
                <option>Atıştırmalık & Tatlı</option>
                <option>Soğuk Zincir (Süt/Et)</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button type="button" onClick={() => { alert("Tedarikçi formu onay bekliyor havuzuna gönderildi (Simülasyon)."); window.location.href="/admin/sellers/pending" }} className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-lg shadow-md hover:bg-emerald-700 transition-colors">
              Başvuruyu Tamamla (Onaya Gönder)
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
