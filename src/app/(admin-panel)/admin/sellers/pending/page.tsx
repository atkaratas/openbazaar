'use client'
import { useState } from 'react'

export default function PendingSellersPage() {
  // Satıcıları bir state (durum) içine alalım ki onaylayınca ekrandan kaybolsunlar (Gerçekçi UI hissi)
  const [sellers, setSellers] = useState([
    {
      id: 1,
      name: 'Ege İncir & Zeytin A.Ş.',
      vkn: '1029384756',
      category: 'Kuru Gıda / Yağlar',
      docs: ['FDA_Approval.pdf', 'Halal_Cert_2026.pdf'],
      stripe: 'Verified',
      status: 'ready'
    },
    {
      id: 2,
      name: 'Anadolu Süt Ürünleri',
      vkn: '9988776655',
      category: 'Süt ve Süt Ürünleri',
      docs: [],
      stripe: 'Pending',
      status: 'missing',
      coldChain: true
    }
  ])

  const handleApprove = (id: number, name: string) => {
    alert(`✅ ${name} firmasının tüm gümrük evrakları onaylandı. Satıcı mağazası global yayına açıldı!`)
    setSellers(sellers.filter(s => s.id !== id))
  }

  const handleReject = (id: number, name: string) => {
    const reason = prompt(`${name} firmasını reddetme sebebinizi girin (Örn: Evraklar sahte/eksik):`)
    if (reason) {
      alert(`❌ Firma reddedildi ve sistemden uzaklaştırıldı. Sebep: ${reason}`)
      setSellers(sellers.filter(s => s.id !== id))
    }
  }

  const openDoc = (docName: string) => {
    alert(`📄 [SİMÜLASYON] ${docName} adlı belge PDF Görüntüleyici'de açılıyor... (Gerçek sistemde AWS S3'ten çekilecek)`)
  }

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

        {sellers.length === 0 && (
          <div className="p-8 text-center text-slate-500 font-medium">
            Şu an onay bekleyen hiçbir firma yok. Her şey temiz.
          </div>
        )}

        {sellers.map(seller => (
          <div key={seller.id} className={`grid grid-cols-12 gap-4 p-6 items-center border-b border-slate-100 transition-colors ${seller.status === 'missing' ? 'opacity-75 bg-slate-50/50' : 'hover:bg-slate-50'}`}>
            <div className="col-span-3">
              <p className="font-bold text-slate-900">{seller.name}</p>
              <p className="text-xs text-slate-500 font-mono mt-1">VKN: {seller.vkn}</p>
              {seller.coldChain && <p className="text-xs font-bold text-rose-500 mt-1">⚠️ Soğuk Zincir Gerektirir</p>}
            </div>
            
            <div className="col-span-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${seller.status === 'ready' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
                {seller.category}
              </span>
            </div>
            
            <div className="col-span-3 flex flex-wrap gap-2">
              {seller.docs.length > 0 ? (
                seller.docs.map(doc => (
                  <button onClick={() => openDoc(doc)} key={doc} className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 cursor-pointer hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all shadow-sm">
                    📄 {doc}
                  </button>
                ))
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-rose-100 text-rose-800">
                  Belge Yüklenmedi
                </span>
              )}
            </div>

            <div className="col-span-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${seller.stripe === 'Verified' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${seller.stripe === 'Verified' ? 'bg-green-500' : 'bg-amber-500'}`}></span> 
                {seller.stripe === 'Verified' ? 'Verified (Bağlı)' : 'Pending (Eksik)'}
              </span>
            </div>

            <div className="col-span-2 flex justify-end gap-2">
              {seller.status === 'ready' ? (
                <>
                  <button onClick={() => handleReject(seller.id, seller.name)} className="px-3 py-1.5 bg-white border border-rose-200 text-rose-600 rounded text-sm font-bold shadow-sm hover:bg-rose-50 transition-colors">Reddet</button>
                  <button onClick={() => handleApprove(seller.id, seller.name)} className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors">Tüm Evrakları Onayla</button>
                </>
              ) : (
                <button  className="px-4 py-1.5 bg-slate-100 text-slate-400 rounded text-sm font-bold border border-slate-200 cursor-not-allowed">İşlem Yapılamaz</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {approvedSellers.length > 0 && (
        <div className="mt-12 bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-emerald-200">
            <h2 className="text-lg font-bold text-emerald-900">Onaylanmış Satıcılar</h2>
          </div>
          <div className="p-0">
            {approvedSellers.map(seller => (
              <div key={seller.id} className="p-6 border-b border-emerald-100 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-emerald-900">{seller.name}</h3>
                  <p className="text-xs font-mono text-emerald-700 mt-1">VKN: {seller.vkn}</p>
                </div>
                <span className="bg-emerald-200 text-emerald-800 text-xs font-bold px-2 py-1 rounded">Aktif Satışta</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

  )
}
