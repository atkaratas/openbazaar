export default function B2BHomePage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="bg-slate-900 rounded-3xl p-12 text-center text-white mb-12 shadow-xl">
        <h1 className="text-4xl font-black mb-4">Global Toptan Gıda Tedariği</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-8">Sadece onaylı işletmeler (B2B) için. Palet bazında veya konteyner hacminde üreticiden doğrudan fiyat alın.</p>
        <div className="flex justify-center gap-4">
          <button className="bg-emerald-500 text-slate-900 font-bold px-8 py-3 rounded-lg hover:bg-emerald-400 transition">Hemen Teklif İste (RFQ)</button>
        </div>
      </div>
      
      {/* B2B Toptan Fiyatlı Ürünler Listesi Gelecek */}
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Öne Çıkan İhracatçılar (Doğrulanmış)</h2>
      <div className="grid grid-cols-3 gap-6">
         <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded">FDA Onaylı</span>
            <h3 className="font-bold text-lg mt-3">Marmara Birlik A.Ş.</h3>
            <p className="text-sm text-slate-500 mb-4">Min. Sipariş: 1 Palet</p>
            <button className="w-full border border-slate-300 text-slate-700 py-2 rounded font-medium hover:bg-slate-50">Tedarikçi Kataloğunu Gör</button>
         </div>
      </div>
    </div>
  )
}
