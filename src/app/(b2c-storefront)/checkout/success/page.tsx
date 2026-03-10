'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, Download, Package, Plane, Truck, FileText, Loader2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/store/useCart'

export default function CheckoutSuccessPage() {
  const [status, setStatus] = useState<'processing' | '3d_secure' | 'success'>('processing')
  const { clearCart } = useCart()

  // Gerçekçi bir 3D Secure ve Banka Onay simülasyonu
  useEffect(() => {
    // 1. İşleniyor (Stripe Callback)
    const t1 = setTimeout(() => setStatus('3d_secure'), 2000)
    // 2. 3D Secure Doğrulaması (Mock)
    const t2 = setTimeout(() => {
      setStatus('success')
      clearCart() // Sipariş bitince sepeti boşalt
    }, 4500)

    return () => { clearTimeout(t1); clearTimeout(t2); }
  }, [clearCart])

  if (status === 'processing') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-6" />
        <h2 className="text-2xl font-bold text-gray-900">Ödemeniz İşleniyor...</h2>
        <p className="text-gray-500 mt-2">Lütfen bu sayfayı kapatmayın veya yenilemeyin.</p>
      </div>
    )
  }

  if (status === '3d_secure') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-200 max-w-md w-full text-center">
          <ShieldIcon className="w-16 h-16 text-emerald-500 mx-auto mb-6 animate-pulse" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">3D Secure Banka Doğrulaması</h2>
          <p className="text-sm text-gray-500 mb-6">Kart bankanızla şifreli iletişim kuruluyor. Şifreniz doğrulandıktan sonra işlem tamamlanacak.</p>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-2 overflow-hidden">
            <div className="bg-emerald-500 h-2 rounded-full animate-progress"></div>
          </div>
        </div>
      </div>
    )
  }

  // MOCK DATA: Gerçekte URL paramından veya DB'den Order ID ile çekilir
  const orderNo = "ORD-" + Math.floor(Math.random() * 1000000)
  const dhlTracking = "JD0146" + Math.floor(Math.random() * 100000000)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Başarı Başlığı */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-100 mb-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Ödeme Başarılı!</h1>
          <p className="text-lg text-gray-500 mt-3">Teşekkürler. Siparişiniz alındı ve satıcıya iletildi.</p>
        </div>

        {/* Fiş / Fatura Kartı (Receipt) */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden mb-8">
          <div className="bg-slate-900 px-8 py-6 flex justify-between items-center text-white">
            <div>
              <p className="text-sm font-medium text-slate-400">Sipariş Numarası</p>
              <p className="text-xl font-bold font-mono tracking-wider">{orderNo}</p>
            </div>
            <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg font-bold transition-colors" onClick={() => alert('PDF Fatura indiriliyor...')}>
              <Download size={18} /> Faturayı İndir (PDF)
            </button>
          </div>
          
          <div className="p-8">
            <div className="flex justify-between border-b border-gray-100 pb-6 mb-6">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Satıcı (İhracatçı)</p>
                <p className="font-bold text-gray-900">Malatya Pazarı Palancı A.Ş.</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Toplam Tutar</p>
                <p className="text-2xl font-black text-emerald-600">€ 38.90</p>
                <p className="text-xs font-bold text-gray-400 mt-1">DDP (Gümrük Vergisi Ödenmiş)</p>
              </div>
            </div>
            
            <div className="space-y-4">
               <div className="flex items-center justify-between text-sm font-medium text-gray-700 bg-gray-50 p-4 rounded-xl">
                 <div className="flex items-center gap-3">
                   <FileText className="text-blue-500" size={20} />
                   <span>Elektronik Ticaret Gümrük Beyannamesi (ETGB)</span>
                 </div>
                 <span className="text-emerald-600 font-bold bg-emerald-100 px-2 py-1 rounded">Onaylandı</span>
               </div>
            </div>
          </div>
        </div>

        {/* Kargo ve Lojistik Takip (Tracking Timeline) */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Plane className="text-blue-600" /> Uluslararası Lojistik Takibi
          </h3>
          
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-blue-800 uppercase">Taşıyıcı Firma</p>
              <p className="font-black text-blue-900">DHL Express Worldwide</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-blue-800 uppercase">Takip Kodu (AWB)</p>
              <p className="font-mono font-bold text-blue-900 text-lg cursor-pointer hover:underline">{dhlTracking}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative pl-4 space-y-8 border-l-2 border-gray-200 ml-4">
            
            <div className="relative">
              <div className="absolute -left-[25px] bg-emerald-500 rounded-full w-4 h-4 border-4 border-white shadow"></div>
              <p className="font-bold text-gray-900">Sipariş Alındı</p>
              <p className="text-sm text-gray-500">Ödemeniz onaylandı. Satıcı siparişi hazırlıyor.</p>
            </div>

            <div className="relative">
              <div className="absolute -left-[25px] bg-blue-500 rounded-full w-4 h-4 border-4 border-white shadow animate-pulse"></div>
              <p className="font-bold text-gray-900 text-blue-600">Kurye Bekleniyor</p>
              <p className="text-sm text-gray-500">DHL kuryesi paketi teslim almak üzere yola çıktı.</p>
            </div>

            <div className="relative opacity-40">
              <div className="absolute -left-[25px] bg-gray-300 rounded-full w-4 h-4 border-4 border-white"></div>
              <p className="font-bold text-gray-700">İhracat Gümrüğü (İstanbul, TR)</p>
              <p className="text-sm text-gray-500">ETGB beyannamesi ile gümrükten çıkış yapılacak.</p>
            </div>

            <div className="relative opacity-40">
              <div className="absolute -left-[25px] bg-gray-300 rounded-full w-4 h-4 border-4 border-white"></div>
              <p className="font-bold text-gray-700">Teslimat (Almanya, DE)</p>
              <p className="text-sm text-gray-500">Tahmini Teslimat: 2 İş Günü</p>
            </div>

          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/products" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline">
            Alışverişe Dön <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  )
}

function ShieldIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}
