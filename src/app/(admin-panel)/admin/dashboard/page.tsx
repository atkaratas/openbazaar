'use client'

import { BarChart3, Users, DollarSign, Globe2, PackageX, TrendingUp, ShieldCheck } from 'lucide-react'

export default function AdminDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Operasyon Kokpiti</h2>
          <p className="text-slate-500 mt-2 font-medium">Küresel satış ve satıcı metriklerinin canlı (Real-time) izleme paneli.</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-white border border-slate-200 text-sm font-medium text-slate-700 py-2 px-4 rounded-lg shadow-sm">
            <option>Son 24 Saat</option>
            <option>Bu Hafta</option>
            <option>Bu Ay</option>
            <option>Tüm Zamanlar</option>
          </select>
          <button onClick={() => alert("Monkey Test: Bu butonun arkasındaki API / Fonksiyon şu an geliştirme aşamasındadır.")} className="bg-slate-900 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-slate-800 transition">Rapor İndir</button>
        </div>
      </div>

      {/* 1. KPI Kartları (Top Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><DollarSign size={24} /></div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12.5%</span>
          </div>
          <p className="text-sm font-medium text-slate-500">Global Ciro (Brüt)</p>
          <p className="text-3xl font-black text-slate-900 mt-1">$142,500.00</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><TrendingUp size={24} /></div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+8.2%</span>
          </div>
          <p className="text-sm font-medium text-slate-500">Platform Komisyon Geliri</p>
          <p className="text-3xl font-black text-slate-900 mt-1">$21,375.00</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Users size={24} /></div>
            <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded-full">14 Bekleyen</span>
          </div>
          <p className="text-sm font-medium text-slate-500">Aktif Türk Tedarikçi</p>
          <p className="text-3xl font-black text-slate-900 mt-1">1,204</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><Globe2 size={24} /></div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">140 Ülke</span>
          </div>
          <p className="text-sm font-medium text-slate-500">Canlı Sipariş (Son 24s)</p>
          <p className="text-3xl font-black text-slate-900 mt-1">843</p>
        </div>
      </div>

      {/* 2. Grafikler ve Kritik Uyarılar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Satış Grafiği (Mock) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-96 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2"><BarChart3 size={20} /> İhracat Hacmi (Aylık)</h3>
          <div className="flex-1 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 font-medium">
            (Burası Recharts veya Chart.js kütüphanesi ile veritabanından çekilecek dinamik çubuk grafik alanıdır)
          </div>
        </div>

        {/* Aksiyon Bekleyenler (To-Do) */}
        <div className="bg-slate-950 p-6 rounded-2xl shadow-lg border border-slate-900 flex flex-col text-slate-300">
          <h3 className="text-lg font-bold text-white mb-6">Kritik Aksiyonlar</h3>
          <div className="space-y-4 flex-1">
            
            <a href="/admin/sellers/pending" className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-slate-800 hover:border-blue-500/50 transition cursor-pointer group">
              <div className="bg-rose-500/20 text-rose-500 p-2 rounded-lg group-hover:scale-110 transition"><ShieldCheck size={20} /></div>
              <div>
                <p className="text-white font-bold">14 Firma Onay Bekliyor</p>
                <p className="text-xs text-slate-500">Gümrük sertifikaları incelenecek.</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-slate-800 hover:border-blue-500/50 transition cursor-pointer group">
              <div className="bg-amber-500/20 text-amber-500 p-2 rounded-lg group-hover:scale-110 transition"><PackageX size={20} /></div>
              <div>
                <p className="text-white font-bold">3 Sipariş İtirazı (Dispute)</p>
                <p className="text-xs text-slate-500">Müşteri iptal/iade talepleri.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-slate-800 hover:border-blue-500/50 transition cursor-pointer group opacity-50">
              <div className="bg-emerald-500/20 text-emerald-500 p-2 rounded-lg"><DollarSign size={20} /></div>
              <div>
                <p className="text-white font-bold">Stripe Payouts (Sorunsuz)</p>
                <p className="text-xs text-slate-500">Tüm satıcı ödemeleri yapıldı.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
