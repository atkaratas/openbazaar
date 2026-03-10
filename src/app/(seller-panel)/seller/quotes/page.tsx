'use client'

export default function SellerQuotesPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">B2B Teklif Talepleri (RFQ)</h2>
        <p className="text-sm text-gray-500 mt-1">Yüksek adetli siparişler için global toptancılardan gelen pazarlık talepleri.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Örnek Teklif Kartı */}
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-6 items-start md:items-center">
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded border border-amber-200 animate-pulse">YENİ TEKLİF</span>
              <span className="text-sm text-gray-500">10 Dk Önce</span>
            </div>
            <h3 className="font-bold text-lg text-gray-900">Naturel Sızma Zeytinyağı (5L)</h3>
            <p className="text-sm text-gray-600 mt-1">
              <strong className="text-gray-900">Alıcı:</strong> Hasan LLC (Almanya 🇩🇪) <br/>
              <strong className="text-gray-900">Talep Edilen Miktar:</strong> 500 Adet <br/>
              <strong className="text-gray-900">Alıcının Hedef Fiyatı:</strong> €28.00 / adet <span className="text-xs text-gray-400">(Sizin Liste Toptan Fiyatınız: €32.50)</span>
            </p>
            <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-gray-700 italic">
              "Merhaba, Münih'teki market zincirimiz için 500 adet deneme siparişi vermek istiyoruz. Fiyatı 28 Euro'ya çekerseniz nakliyeyi biz halledeceğiz (EXW)."
            </div>
          </div>

          <div className="w-full md:w-72 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <p className="text-sm font-bold text-gray-900 mb-3">Teklifinize Cevap Verin</p>
            <div className="relative mb-3">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">€</span>
              <input type="number" defaultValue="30.00" className="w-full pl-8 border-gray-300 rounded-md focus:ring-blue-500 text-sm p-2 border bg-white font-bold" />
            </div>
            <textarea rows={2} placeholder="Kabul / Ret notunuz..." className="w-full border-gray-300 rounded-md focus:ring-blue-500 text-sm p-2 border bg-white mb-3"></textarea>
            <div className="flex gap-2">
              <button onClick={() => alert("Monkey Test: Bu butonun arkasındaki API / Fonksiyon şu an geliştirme aşamasındadır.")} className="flex-1 bg-white border border-rose-200 text-rose-600 text-xs font-bold py-2 rounded-md hover:bg-rose-50">Reddet</button>
              <button onClick={() => alert("Monkey Test: Bu butonun arkasındaki API / Fonksiyon şu an geliştirme aşamasındadır.")} className="flex-1 bg-blue-600 text-white text-xs font-bold py-2 rounded-md hover:bg-blue-700">Teklifi İlet</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
