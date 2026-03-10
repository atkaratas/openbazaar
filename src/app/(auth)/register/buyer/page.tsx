'use client'

import { ShoppingBag, Globe, ShieldCheck } from 'lucide-react'

export default function BuyerRegisterPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col md:flex-row">
      
      {/* Sol Bilgi Alanı */}
      <div className="md:w-1/2 p-12 flex flex-col justify-center text-slate-50">
        <h1 className="text-4xl font-black text-white mb-6">Global Lezzetlere<br/>Ulaşın</h1>
        <p className="text-lg text-slate-300 mb-8 max-w-lg">
          Türkiye'nin en seçkin gıda ve içecek ürünlerini, toptan veya perakende olarak, gümrük garantisiyle kapınıza kadar getirin.
        </p>
        <ul className="space-y-4">
          <li className="flex items-center gap-3"><ShoppingBag className="text-emerald-400"/> Gümrük vergisi ödenmiş (DDP) teslimat.</li>
          <li className="flex items-center gap-3"><ShieldCheck className="text-emerald-400"/> Soğuk zincir güvencesiyle tazelik garantisi.</li>
          <li className="flex items-center gap-3"><Globe className="text-emerald-400"/> Toptan alımlarda doğrudan satıcıyla pazarlık (RFQ).</li>
        </ul>
      </div>

      {/* Sağ Form Alanı */}
      <div className="md:w-1/2 bg-white p-12 flex flex-col justify-center rounded-l-3xl shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Müşteri Kaydı (B2C & B2B)</h2>
        <p className="text-sm text-gray-500 mb-8">Kayıt olun ve dünyadaki en iyi lezzetleri sepetinize ekleyin.</p>

        <form className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Adınız</label>
              <input type="text" className="w-full border-gray-300 rounded-md focus:ring-emerald-500 p-2.5 border bg-slate-50 text-slate-900" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Soyadınız</label>
              <input type="text" className="w-full border-gray-300 rounded-md focus:ring-emerald-500 p-2.5 border bg-slate-50 text-slate-900" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">E-Posta</label>
            <input type="email" className="w-full border-gray-300 rounded-md focus:ring-emerald-500 p-2.5 border bg-slate-50 text-slate-900" />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Şifre</label>
            <input type="password" className="w-full border-gray-300 rounded-md focus:ring-emerald-500 p-2.5 border bg-slate-50 text-slate-900" />
          </div>

          <div className="pt-4">
            <button type="button" className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-lg shadow-md hover:bg-emerald-700 transition-colors">
              Hesabı Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
