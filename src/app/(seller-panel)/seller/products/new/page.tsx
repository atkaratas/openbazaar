'use client'

export default function NewProductPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Yeni Gıda Ürünü Ekle</h2>
          <p className="text-sm text-gray-500 mt-1">OpenBazaar global kataloğuna (PIM) ihracat ürünü girişi.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => alert("Monkey Test: Bu butonun arkasındaki API / Fonksiyon şu an geliştirme aşamasındadır.")} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50">Taslak Kaydet</button>
          <button onClick={() => alert("Monkey Test: Bu butonun arkasındaki API / Fonksiyon şu an geliştirme aşamasındadır.")} className="px-4 py-2 bg-emerald-600 rounded-md text-white text-sm font-medium shadow-sm hover:bg-emerald-700">Onaya Gönder</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Sol Kolon (Temel Bilgiler & Fiyat) */}
        <div className="col-span-2 space-y-6">
          {/* Kutu 1: Temel Bilgiler */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Temel Bilgiler (Çoklu Dil)</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Adı (Türkçe)</label>
                <input type="text" placeholder="Örn: Erken Hasat Soğuk Sıkım Zeytinyağı" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Title (İngilizce - Zorunlu)</label>
                <input type="text" placeholder="Örn: Early Harvest Cold Pressed Olive Oil" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama & İçindekiler (Alerjen Uyarısı İçermeli)</label>
                <textarea rows={4} placeholder="İçindekiler, besin değerleri, alerjen (örn: Eser miktarda fındık içerebilir)..." className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-2 border" />
              </div>
            </div>
          </div>

          {/* Kutu 2: B2B ve B2C Fiyatlandırma */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Fiyatlandırma & Stok</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Perakende Fiyat (B2C)</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">₺</span>
                  </div>
                  <input type="number" placeholder="0.00" className="w-full pl-7 pr-12 border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-2 border" />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <select className="h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md focus:ring-emerald-500 focus:border-emerald-500">
                      <option>TRY</option>
                      <option>USD</option>
                      <option>EUR</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Toptan Fiyat (B2B)</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">₺</span>
                  </div>
                  <input type="number" placeholder="0.00" className="w-full pl-7 border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-2 border" />
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Toptan Sipariş Adedi (MOQ)</label>
                <input type="number" defaultValue="10" className="w-1/3 border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-2 border" />
                <span className="ml-2 text-sm text-gray-500">adet/koli</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Kolon (Lojistik & Gümrük Belgeleri) */}
        <div className="col-span-1 space-y-6">
          {/* Kutu 3: Gıda & Lojistik Hassasiyeti */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-200">
            <h3 className="text-lg font-semibold text-emerald-900 mb-4 border-b border-emerald-100 pb-2">❄️ Lojistik & Gıda</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div>
                  <p className="text-sm font-medium text-gray-900">Soğuk Zincir</p>
                  <p className="text-xs text-gray-500">Termal kargo gerektirir.</p>
                </div>
                {/* Tailwind Toggle (Stylized) */}
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input type="checkbox" id="toggle1" className="checked:bg-emerald-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                  <label htmlFor="toggle1" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Raf Ömrü (Gün)</label>
                <input type="number" placeholder="Örn: 365" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-2 border" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Birim Ağırlık (Brüt KG)</label>
                <input type="number" step="0.01" placeholder="Örn: 1.2" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-2 border" />
                <p className="text-xs text-gray-400 mt-1">Uluslararası kargo desi hesabı için zorunlu.</p>
              </div>
            </div>
          </div>

          {/* Kutu 4: Sertifikasyonlar (Dosya Yükleme) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100">
            <h3 className="text-lg font-semibold text-red-900 mb-4 border-b border-red-100 pb-2">📄 Gümrük & Sertifika</h3>
            <p className="text-xs text-gray-600 mb-4">Ürünün yurt dışına çıkabilmesi için en az bir uluslararası kalite/sağlık belgesi zorunludur.</p>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500" /> FDA Onay Belgesi (ABD)
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500" /> Helal Sertifikası (Orta Doğu)
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500" /> Organik Tarım Belgesi
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500" /> ISO 22000 (Global)
              </label>
            </div>

            <div className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer transition-colors">
              <span className="text-2xl mb-2 block">📥</span>
              <p className="text-sm font-medium text-gray-600">PDF Belgelerini Sürükle</p>
              <p className="text-xs text-gray-400">veya seçmek için tıkla (Max 5MB)</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
