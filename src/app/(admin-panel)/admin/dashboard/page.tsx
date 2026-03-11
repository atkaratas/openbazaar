import React from 'react';
import { 
  Users, DollarSign, Package, AlertTriangle, CheckCircle, 
  XCircle, FileText, ArrowUpRight, TrendingUp, Settings2, BarChart3, Truck
} from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="p-8 space-y-8 bg-gray-50 dark:bg-zinc-950 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Süper Yönetici Karargahı (Admin Backoffice)
        </h1>
        <div className="text-sm text-gray-500">
          Son güncelleme: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* 4. Toplam Hacim/Ciro istatistikleri (Widgets) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 dark:bg-zinc-900 dark:border-zinc-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Toplam Ciro (Aylık)</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">₺2.45M</h3>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600 dark:bg-emerald-900/30">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-emerald-600 font-medium">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+12.5%</span>
            <span className="text-gray-400 ml-2 font-normal">geçen aya göre</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 dark:bg-zinc-900 dark:border-zinc-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Toplam Komisyon Geliri</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">₺294K</h3>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600 dark:bg-indigo-900/30">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-indigo-600 font-medium">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            <span>+8.2%</span>
            <span className="text-gray-400 ml-2 font-normal">geçen aya göre</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 dark:bg-zinc-900 dark:border-zinc-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Aktif Satıcılar</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">1,204</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600 dark:bg-blue-900/30">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500 font-medium">
            <span className="text-amber-500 mr-2 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-1" />
              14 bekleyen KYC
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 dark:bg-zinc-900 dark:border-zinc-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Gümrük (ETGB) İşlemleri</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">3,492</h3>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg text-amber-600 dark:bg-amber-900/30">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500 font-medium">
            <span className="text-red-500 mr-2 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-1" />
              28 Takılan Kargo
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 1. Bekleyen Satıcı Başvuruları */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 dark:bg-zinc-900 dark:border-zinc-800">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <FileText className="w-5 h-5 mr-2 text-indigo-500" />
              Bekleyen KYC & Vergi Levhası Onayları
            </h2>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Tümünü Gör</button>
          </div>
          <div className="p-0">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
              <thead className="bg-gray-50 dark:bg-zinc-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satıcı / Mağaza</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Belgeler</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksiyon</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-zinc-950 dark:divide-zinc-800">
                {[
                  { name: 'Ahmet Yılmaz', store: 'Yılmaz Ticaret', docs: 'Vergi Levhası, Kimlik', date: '2 saat önce' },
                  { name: 'Tekno Market Ltd.', store: 'TeknoShop', docs: 'İmza Sirküsü, Vergi Levhası', date: '5 saat önce' },
                  { name: 'Ayşe Demir', store: 'Demir Tasarım', docs: 'Kimlik (Selfie Eksik)', date: '1 gün önce' },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-zinc-900/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.store}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        {item.docs}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-emerald-600 hover:text-emerald-900 dark:hover:text-emerald-400 mr-3">
                        <CheckCircle className="w-5 h-5 inline" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 dark:hover:text-red-400">
                        <XCircle className="w-5 h-5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Platform Komisyon Oranı Ayarı */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 dark:bg-zinc-900 dark:border-zinc-800">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-zinc-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Settings2 className="w-5 h-5 mr-2 text-gray-500" />
              Komisyon Modülü
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Genel Kategori Kesinti (%)
                </label>
                <div className="flex items-center">
                  <input 
                    type="number" 
                    defaultValue={12.0} 
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-zinc-950 dark:border-zinc-700" 
                  />
                  <span className="ml-2 text-gray-500">%</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Elektronik Kesinti (%)
                </label>
                <div className="flex items-center">
                  <input 
                    type="number" 
                    defaultValue={8.5} 
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-zinc-950 dark:border-zinc-700" 
                  />
                  <span className="ml-2 text-gray-500">%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Giyim / Moda Kesinti (%)
                </label>
                <div className="flex items-center">
                  <input 
                    type="number" 
                    defaultValue={15.0} 
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-zinc-950 dark:border-zinc-700" 
                  />
                  <span className="ml-2 text-gray-500">%</span>
                </div>
              </div>

              <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Oranları Güncelle
              </button>
            </div>
          </div>
        </div>

        {/* 2. Gümrük/ETGB Takip Monitörü */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 dark:bg-zinc-900 dark:border-zinc-800">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Truck className="w-5 h-5 mr-2 text-amber-500" />
              Gümrük & ETGB Takip Monitörü (Kritik İşlemler)
            </h2>
          </div>
          <div className="p-0">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
              <thead className="bg-gray-50 dark:bg-zinc-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Takip No / Sipariş</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ETGB Beyan Değeri</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hata Detayı / Sebep</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksiyon</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-zinc-950 dark:divide-zinc-800">
                {[
                  { track: 'TR-EX-99213', order: 'ORD-551', status: 'Gümrükte Takıldı', val: '€145.00', err: 'GTIP Kodu Uyumsuzluğu' },
                  { track: 'TR-EX-99214', order: 'ORD-558', status: 'Vergi Onayı Bekliyor', val: '€210.00', err: 'Müşteri onayı bekleniyor' },
                  { track: 'TR-EX-99218', order: 'ORD-602', status: 'Belge Eksik', val: '€85.50', err: 'Fatura İbrazı Gerekli' },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-zinc-900/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{item.track}</div>
                      <div className="text-sm text-gray-500">{item.order}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status.includes('Takıldı') ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : 
                        'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.val}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="flex items-center text-red-500">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        {item.err}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                        İncele & Müdahale Et
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}


