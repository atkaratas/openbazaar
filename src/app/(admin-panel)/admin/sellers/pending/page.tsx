export default function PendingSellersPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Onay Bekleyen Tedarikçiler</h2>
        <p className="text-slate-500 mt-2 font-medium">Platformda küresel satış yapabilmek için Gümrük ve Gıda sertifikası onayı bekleyen firmalar.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-100 bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <div className="col-span-3">Firma Bilgileri</div>
          <div className="col-span-2">Kategori</div>
          <div className="col-span-3">Yüklenen Gıda Sertifikaları</div>
          <div className="col-span-2">Stripe Durumu</div>
          <div className="col-span-2 text-right">Aksiyon</div>
        </div>

        {/* Örnek Bekleyen Satıcı Satırı 1 */}
        <div className="grid grid-cols-12 gap-4 p-6 items-center border-b border-slate-100 hover:bg-slate-50 transition-colors">
          <div className="col-span-3">
            <p className="font-bold text-slate-900">Ege İncir & Zeytin A.Ş.</p>
            <p className="text-xs text-slate-500 font-mono mt-1">VKN: 1029384756</p>
          </div>
          <div className="col-span-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-emerald-100 text-emerald-800">
              Kuru Gıda / Yağlar
            </span>
          </div>
          <div className="col-span-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 cursor-pointer hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all">
              📄 FDA_Approval.pdf
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 cursor-pointer hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all">
              📄 Halal_Cert_2026.pdf
            </span>
          </div>
          <div className="col-span-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-200">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Verified (Bağlı)
            </span>
          </div>
          <div className="col-span-2 flex justify-end gap-2">
            <button className="px-3 py-1.5 bg-white border border-rose-200 text-rose-600 rounded text-sm font-bold shadow-sm hover:bg-rose-50 transition-colors">Reddet</button>
            <button className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors">Tüm Evrakları Onayla</button>
          </div>
        </div>

        {/* Örnek Bekleyen Satıcı Satırı 2 (Eksik Evrak) */}
        <div className="grid grid-cols-12 gap-4 p-6 items-center border-b border-slate-100 hover:bg-slate-50 transition-colors opacity-75">
          <div className="col-span-3">
            <p className="font-bold text-slate-900">Anadolu Süt Ürünleri</p>
            <p className="text-xs text-slate-500 font-mono mt-1">VKN: 9988776655</p>
            <p className="text-xs font-bold text-rose-500 mt-1">⚠️ Soğuk Zincir Gerektirir</p>
          </div>
          <div className="col-span-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
              Süt ve Süt Ürünleri
            </span>
          </div>
          <div className="col-span-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-rose-100 text-rose-800">
              Belge Yüklenmedi (Bekleniyor)
            </span>
          </div>
          <div className="col-span-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Pending (Eksik)
            </span>
          </div>
          <div className="col-span-2 flex justify-end gap-2">
            <button className="px-4 py-1.5 bg-slate-100 text-slate-400 rounded text-sm font-bold border border-slate-200 cursor-not-allowed">İşlem Yapılamaz</button>
          </div>
        </div>

      </div>
    </div>
  )
}
