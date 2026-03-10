import { Map, Plane, Truck, AlertTriangle, CheckCircle2 } from 'lucide-react'

export default function AdminLogisticsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-slate-900">Küresel Lojistik Radarı</h2>
        <p className="text-sm text-slate-500 mt-1">Dünya çapındaki (ETGB ve Normal) tüm aktif ihracat kargolarının canlı takip merkezi.</p>
      </div>

      {/* Lojistik Özet Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Plane size={24} /></div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase">Havada (In Transit)</p>
            <p className="text-2xl font-black text-slate-900">142</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-rose-100 text-rose-600 rounded-lg"><AlertTriangle size={24} /></div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase">Gümrükte Takılan</p>
            <p className="text-2xl font-black text-slate-900">3</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg"><CheckCircle2 size={24} /></div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase">Teslim Edilen (Bugün)</p>
            <p className="text-2xl font-black text-slate-900">89</p>
          </div>
        </div>
        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 shadow-sm flex items-center gap-4 text-white">
          <div className="p-3 bg-slate-800 text-blue-400 rounded-lg"><Map size={24} /></div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase">Aktif Rota Sayısı</p>
            <p className="text-2xl font-black">24 Ülke</p>
          </div>
        </div>
      </div>

      {/* Canlı Takip Tablosu */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-700">Aktif Sevkiyatlar (Live Tracking)</h3>
          <input type="text" placeholder="AWB / Takip Kodu Ara..." className="border border-slate-300 rounded-md px-3 py-1.5 text-sm" />
        </div>
        
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Takip Kodu (AWB)</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Taşıyıcı</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Rota (Origin &gt; Dest)</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Durum</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Son Güncelleme</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {/* Row 1 */}
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600 cursor-pointer hover:underline">JD01460000123456</td>
              <td className="px-6 py-4 whitespace-nowrap"><span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">DHL Express</span></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-medium">🇹🇷 Istanbul ➔ 🇩🇪 Berlin</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="flex items-center gap-1.5 text-blue-600 text-sm font-bold"><Plane size={16}/> Havada (In Transit)</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-500">10 Dk Önce (Leipzig Hub)</td>
            </tr>
            {/* Row 2 */}
            <tr className="hover:bg-slate-50 bg-rose-50/30">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600 cursor-pointer hover:underline">1Z9999999999999999</td>
              <td className="px-6 py-4 whitespace-nowrap"><span className="bg-amber-900 text-amber-400 text-xs font-bold px-2 py-1 rounded">UPS Worldwide</span></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-medium">🇹🇷 Izmir ➔ 🇺🇸 New York</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="flex items-center gap-1.5 text-rose-600 text-sm font-bold"><AlertTriangle size={16}/> Gümrük Beklemesi (FDA)</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-rose-500 font-medium">Müdahale Gerekiyor</td>
            </tr>
            {/* Row 3 */}
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600 cursor-pointer hover:underline">JD01460000987654</td>
              <td className="px-6 py-4 whitespace-nowrap"><span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">DHL Express</span></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-medium">🇹🇷 Bursa ➔ 🇦🇪 Dubai</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="flex items-center gap-1.5 text-emerald-600 text-sm font-bold"><CheckCircle2 size={16}/> Teslim Edildi (DDP)</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-500">2 Saat Önce</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
