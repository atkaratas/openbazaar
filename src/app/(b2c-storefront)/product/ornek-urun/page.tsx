'use client'
import { useState } from 'react'

export default function ProductDetailPage() {
  const [showQuoteModal, setShowQuoteModal] = useState(false)

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Sol: Ürün Resmi */}
      <div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center">
        <span className="text-gray-400">Ürün Görseli (Zeytinyağı 5L Teneke)</span>
      </div>

      {/* Sağ: Satın Alma / Teklif Bölümü */}
      <div className="flex flex-col justify-center">
        <div className="text-sm font-bold text-emerald-600 mb-2">Marmara Birlik A.Ş.</div>
        <h1 className="text-3xl font-black text-gray-900 mb-4">Naturel Sızma Zeytinyağı (5L)</h1>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-100 px-4 py-2 rounded-lg">
            <span className="text-xs text-blue-700 block font-bold uppercase">B2C (Perakende)</span>
            <span className="text-2xl font-black text-blue-900">€ 45.00 <span className="text-sm font-normal">/ adet</span></span>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-lg">
            <span className="text-xs text-emerald-700 block font-bold uppercase">B2B (Toptan - Min 50 Adet)</span>
            <span className="text-2xl font-black text-emerald-900">€ 32.50 <span className="text-sm font-normal">/ adet</span></span>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <button onClick={() => alert("Monkey Test: Bu butonun arkasındaki API / Fonksiyon şu an geliştirme aşamasındadır.")} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 shadow-md">
            Sepete Ekle (Perakende Alım)
          </button>
          
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium">veya toptancı mısınız?</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <button 
            onClick={() => setShowQuoteModal(true)}
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 shadow-md flex items-center justify-center gap-2"
          >
            🤝 Özel Fiyat Teklifi İste (Request a Quote)
          </button>
        </div>

        {/* RFQ MODAL (Kavramsal) */}
        {showQuoteModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Özel Fiyat Teklifi İste</h3>
              <p className="text-sm text-gray-500 mb-6">Marmara Birlik A.Ş. firmasına yüksek adetli alımlar için doğrudan teklif gönderin.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hedef Miktar (Adet/Koli)</label>
                  <input type="number" defaultValue={500} className="w-full border-gray-300 rounded-md focus:ring-emerald-500 p-2.5 border bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hedef Fiyatınız (Birim Başına - Opsiyonel)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">€</span>
                    <input type="number" placeholder="Örn: 28.00" className="w-full pl-8 border-gray-300 rounded-md focus:ring-emerald-500 p-2.5 border bg-gray-50" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mesajınız & Teslimat Şartları</label>
                  <textarea rows={3} placeholder="FOB İzmir teslim veya CIF Berlin fiyatı verir misiniz?" className="w-full border-gray-300 rounded-md focus:ring-emerald-500 p-2.5 border bg-gray-50"></textarea>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button onClick={() => setShowQuoteModal(false)} className="flex-1 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg font-bold hover:bg-gray-50">İptal</button>
                  <button onClick={() => alert("Monkey Test: Bu butonun arkasındaki API / Fonksiyon şu an geliştirme aşamasındadır.")} className="flex-1 bg-emerald-600 text-white py-2.5 rounded-lg font-bold hover:bg-emerald-700 shadow-md">Teklifi Gönder</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
