import { DollarSign, Package, ShoppingCart, TrendingUp } from 'lucide-react'

export default function SellerDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Mağaza Panosu</h2>
        <p className="text-sm text-gray-500 mt-1">Son 30 günlük satış ve operasyon özetiniz.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg"><DollarSign size={20} /></div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
          </div>
          <p className="text-sm font-medium text-gray-500 mt-4">Toplam Satış (Net)</p>
          <p className="text-2xl font-black text-gray-900 mt-1">€ 4,250.00</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><ShoppingCart size={20} /></div>
          </div>
          <p className="text-sm font-medium text-gray-500 mt-4">Bekleyen Siparişler</p>
          <p className="text-2xl font-black text-gray-900 mt-1">8</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><Package size={20} /></div>
          </div>
          <p className="text-sm font-medium text-gray-500 mt-4">Aktif Ürün Sayısı</p>
          <p className="text-2xl font-black text-gray-900 mt-1">124</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm text-white">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-slate-800 text-emerald-400 rounded-lg"><TrendingUp size={20} /></div>
          </div>
          <p className="text-sm font-medium text-slate-400 mt-4">Mağaza Skoru</p>
          <p className="text-2xl font-black mt-1">4.8 / 5.0</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
        <h3 className="font-bold text-gray-800 mb-4">Acil Aksiyon Bekleyenler</h3>
        <div className="space-y-3">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-bold text-amber-800">Stok Uyarısı</p>
              <p className="text-sm text-amber-700">"Kavrulmuş Antep Fıstığı" ürününüzde sadece 3 KG stok kaldı.</p>
            </div>
            <button className="px-4 py-2 bg-white text-amber-700 text-sm font-bold rounded shadow-sm border border-amber-200">Stok Güncelle</button>
          </div>
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-bold text-rose-800">Bekleyen B2B Teklifi (RFQ)</p>
              <p className="text-sm text-rose-700">Almanya'dan bir alıcı 500 adet lokum için fiyat teklifi bekliyor.</p>
            </div>
            <button className="px-4 py-2 bg-white text-rose-700 text-sm font-bold rounded shadow-sm border border-rose-200">Teklife Git</button>
          </div>
        </div>
      </div>
    </div>
  )
}
