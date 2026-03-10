import Link from 'next/link'

export default function SellerProductsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ürün Kataloğum</h2>
          <p className="text-sm text-gray-500 mt-1">Platformda listelenen tüm ürünlerinizin fiyat ve stok yönetimi.</p>
        </div>
        <Link href="/seller/products/new" className="bg-emerald-600 text-white font-bold px-6 py-2 rounded-lg shadow-md hover:bg-emerald-700 transition">
          + Yeni Ürün Ekle
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Ürün Görseli & Adı</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">B2C (Perakende)</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">B2B (Toptan)</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Stok</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Durum</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">İşlem</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Kavrulmuş Antep Fıstığı 1KG</p>
                  <p className="text-xs text-gray-500">ID: PRD-50K-1</p>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">€ 24.50</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€ 18.00 <br/><span className="text-[10px]">Min: 50</span></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-emerald-600">850 KG</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">Yayında</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900">Düzenle</button>
              </td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Çiğ Badem İçi 500g</p>
                  <p className="text-xs text-gray-500">ID: PRD-50K-2</p>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">€ 12.00</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-rose-600">0 KG</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2 py-1 rounded">Stok Yok</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900">Düzenle</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
