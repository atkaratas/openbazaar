export default function SellerSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Mağaza Ayarları</h2>
        <p className="text-sm text-gray-500 mt-1">İhracat bilgilerinizi, finansal cüzdanınızı ve şirket logonuzu güncelleyin.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-4">Temel Bilgiler</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Mağaza Adı</label>
            <input type="text" defaultValue="Marmara Birlik A.Ş." className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Vergi Numarası (VKN)</label>
            <input type="text" defaultValue="1234567890" disabled className="w-full border border-gray-200 bg-gray-50 rounded-lg p-3 text-sm text-gray-500 cursor-not-allowed" />
            <p className="text-xs text-gray-400 mt-1">Vergi numarası değiştirilemez, onaylıdır.</p>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Mağaza Kısa Açıklaması (İngilizce Önerilir)</label>
            <textarea rows={3} defaultValue="Dünyanın en büyük zeytin ve zeytinyağı üreticisi kooperatiflerinden biri." className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-emerald-500"></textarea>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-200">
        <h3 className="text-lg font-bold text-blue-900 mb-4 border-b border-blue-100 pb-4">Stripe Connect (Finansal Ayarlar)</h3>
        <div className="flex items-center justify-between bg-blue-50 p-4 rounded-xl border border-blue-100">
          <div>
            <p className="font-bold text-blue-900">Uluslararası Ödeme Alma Yetkisi</p>
            <p className="text-sm text-blue-700">Stripe hesabınız OpenBazaar'a başarıyla bağlıdır.</p>
          </div>
          <button className="bg-white border border-blue-200 text-blue-700 px-4 py-2 rounded-lg font-bold shadow-sm">Bağlantıyı Yönet</button>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-slate-900 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:bg-slate-800">Tüm Ayarları Kaydet</button>
      </div>
    </div>
  )
}
