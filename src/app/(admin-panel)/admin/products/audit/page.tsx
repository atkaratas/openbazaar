'use client'

export default function AdminProductsAudit() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Katalog & Ürün Denetimi</h2>
          <p className="text-sm text-slate-500 mt-1">Satıcıların yüklediği yeni ürünlerin içerik, çeviri ve fiyat kontrolleri.</p>
        </div>
        <button  className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition">
          Toplu Onayla (AI Scan)
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-100 flex gap-6 items-center">
          <div className="w-16 h-16 bg-slate-100 rounded-lg flex-shrink-0"></div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-slate-900">Kuru İncir (Jumbo Boy) 1KG</h3>
            <p className="text-sm text-slate-500">Satıcı: Ege İncir A.Ş.</p>
            <div className="mt-2 text-xs font-mono bg-slate-100 p-2 rounded text-slate-700">
              EN: Dried Figs (Jumbo Size) 1KG | AR: تين مجفف (حجم جامبو) 1 كجم
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 uppercase font-bold">Liste Fiyatı (B2C)</p>
            <p className="text-xl font-black text-emerald-600">€ 18.50</p>
          </div>
          <div className="flex gap-2 ml-4">
             <button  onClick={() => alert("Ürün reddedildi (Mock)")} className="px-4 py-2 border border-rose-200 text-rose-600 rounded-lg text-sm font-bold hover:bg-rose-50">Reddet</button>
             <button  onClick={() => alert("Ürün başarıyla yayına alındı (Mock)")} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800">Yayına Al</button>
          </div>
        </div>
      </div>
    </div>
  )
}
