import ProductCard from '@/components/storefront/ProductCard'
import clonedData from '@/data/cloned_catalog.json'

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 w-full">
      <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Global Katalog (Tüm Ürünler)</h1>
          <p className="text-gray-500 mt-1">Türkiye'nin onaylı ihracatçılarından toptan ve perakende lezzetler.</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-white border border-gray-300 text-sm font-medium py-2 px-4 rounded-lg shadow-sm">
            <option>Sırala: Çok Satanlar</option>
            <option>Fiyat: Düşükten Yükseğe</option>
            <option>Fiyat: Yüksekten Düşüğe</option>
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sol Filtreleme (Kategori Ağacı Placeholder) */}
        <aside className="w-64 hidden lg:block flex-shrink-0">
          <h3 className="font-bold text-gray-900 mb-4">Kategoriler</h3>
          <ul className="space-y-3 text-sm text-gray-600 font-medium">
            <li className="text-emerald-600 font-bold cursor-pointer">Tüm Gıda Ürünleri</li>
            <li className="cursor-pointer hover:text-emerald-500 pl-4 border-l border-gray-200">Premium Kuruyemiş</li>
            <li className="cursor-pointer hover:text-emerald-500 pl-4 border-l border-gray-200">Gün Kurusu Meyveler</li>
            <li className="cursor-pointer hover:text-emerald-500 pl-4 border-l border-gray-200">Zeytinyağı & Soslar</li>
            <li className="cursor-pointer hover:text-emerald-500 pl-4 border-l border-gray-200">Geleneksel Tatlılar (Lokum)</li>
          </ul>

          <h3 className="font-bold text-gray-900 mt-8 mb-4">Gümrük & Sertifika</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded text-emerald-500 focus:ring-emerald-500" /> FDA (ABD Onaylı)</label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded text-emerald-500 focus:ring-emerald-500" /> Helal Sertifikalı</label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded text-emerald-500 focus:ring-emerald-500" /> Sadece Soğuk Zincir</label>
          </div>
        </aside>

        {/* Ürün Listesi Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {clonedData.map((product: any) => (
            <ProductCard key={product.id} product={product} locale="tr" />
          ))}
        </div>
      </div>
    </div>
  )
}
