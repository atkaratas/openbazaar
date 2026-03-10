'use client'

import { useState } from 'react'
import { Bot, TrendingUp, ShieldAlert, PackagePlus, Save, AlertTriangle } from 'lucide-react'

export default function AIAgentSettingsPage() {
  const [floorPrice, setFloorPrice] = useState(50)
  const [targetPrice, setTargetPrice] = useState(80)

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Otonom AI Satış Temsilcisi</h1>
          <p className="text-slate-500 mt-1">Yapay zeka botunuz, B2B müşterilerle sizin adınıza pazarlık yapsın.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg">
          <Save size={20} /> Ayarları Kaydet
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sol Kolon - Fiyat Sınırları */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <TrendingUp className="text-blue-500" /> Pazarlık Sınırları (Floor & Ceiling)
            </h2>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-rose-50 border-2 border-rose-100 p-4 rounded-xl">
                <label className="block text-sm font-bold text-rose-800 mb-2 flex items-center gap-1">
                  <ShieldAlert size={16} /> Taban Fiyat (Floor)
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-rose-900">€</span>
                  <input 
                    type="number" 
                    value={floorPrice}
                    onChange={(e) => setFloorPrice(Number(e.target.value))}
                    className="w-full bg-white border border-rose-200 rounded-lg p-2 font-black text-lg text-slate-900 focus:ring-rose-500 focus:border-rose-500"
                  />
                </div>
                <p className="text-xs text-rose-600 mt-2 font-medium">Yapay zeka bu fiyatın altına ASLA inmez. Zarar etmezsiniz.</p>
              </div>

              <div className="bg-emerald-50 border-2 border-emerald-100 p-4 rounded-xl">
                <label className="block text-sm font-bold text-emerald-800 mb-2 flex items-center gap-1">
                  <TrendingUp size={16} /> Hedef Fiyat (Target)
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-emerald-900">€</span>
                  <input 
                    type="number" 
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(Number(e.target.value))}
                    className="w-full bg-white border border-emerald-200 rounded-lg p-2 font-black text-lg text-slate-900 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <p className="text-xs text-emerald-600 mt-2 font-medium">Yapay zeka pazarlığa bu fiyattan (veya üstünden) başlar.</p>
              </div>
            </div>

            {targetPrice <= floorPrice && (
              <div className="bg-amber-100 text-amber-800 p-3 rounded-lg text-sm font-bold flex items-center gap-2">
                <AlertTriangle size={18} /> UYARI: Hedef fiyat, taban fiyattan yüksek olmalıdır!
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <PackagePlus className="text-purple-500" /> Çapraz Satış & Bundle (Upselling)
            </h2>
            <p className="text-sm text-slate-500 mb-4">Botunuz müşteriyi ikna etmek için "Bunun yanında x de alırsanız toplam fiyat y olur" şeklinde paket teklifleri sunar.</p>
            
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                  <tr>
                    <th className="p-3 font-bold">Ana Ürün</th>
                    <th className="p-3 font-bold">Yanına Önerilecek (Bundle)</th>
                    <th className="p-3 font-bold">Paket İndirimi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-medium text-slate-900">Kavrulmuş Kayısı 5KG</td>
                    <td className="p-3 font-medium text-slate-900">Ceviz İçi 2KG</td>
                    <td className="p-3 text-emerald-600 font-bold">%10</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-900">Zeytinyağı 10L</td>
                    <td className="p-3 font-medium text-slate-900">Kekik 1KG</td>
                    <td className="p-3 text-emerald-600 font-bold">%15</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button className="mt-4 text-purple-600 font-bold text-sm hover:underline">+ Yeni Kural Ekle</button>
          </div>
        </div>

        {/* Sağ Kolon - Bot Karakteri */}
        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl text-white">
            <div className="flex items-center gap-4 border-b border-slate-700 pb-4 mb-4">
              <div className="bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center">
                <Bot size={28} className="text-white" />
              </div>
              <div>
                <h3 className="font-black text-lg">AI Satış Modeli</h3>
                <p className="text-slate-400 text-xs font-medium">Durum: Aktif (24/7 Yayında)</p>
              </div>
            </div>
            
            <label className="block text-sm font-bold text-slate-300 mb-2">Pazarlık Karakteri (Persona)</label>
            <select className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white font-medium focus:ring-emerald-500 outline-none mb-6">
              <option>Agresif Satıcı (Hızlı Kapatır)</option>
              <option>Esnek Tüccar (Müşteriyi Mutlu Eder)</option>
              <option>Katı Kurumsal (Fiyatı Zor Düşürür)</option>
            </select>

            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <p className="text-xs text-slate-400 font-mono mb-2">Canlı Simülasyon Testi</p>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 mb-2">
                <span className="text-xs text-blue-400 font-bold">Müşteri:</span>
                <p className="text-sm">"100 KG kayısı alacağım ama fiyatı 40€ yaparsan."</p>
              </div>
              <div className="bg-emerald-900/30 p-3 rounded-lg border border-emerald-800/50">
                <span className="text-xs text-emerald-400 font-bold">Senin Botun:</span>
                <p className="text-sm">"Maalesef 40€ kurtarmaz, ancak 100 KG kayısının yanına 10 KG Ceviz eklerseniz, kayısıyı size özel {floorPrice}€'dan bırakabilirim. Ne dersiniz?"</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
