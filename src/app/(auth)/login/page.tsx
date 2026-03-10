'use client'

import Link from 'next/link'
import { Lock, Mail } from 'lucide-react'

export default function LoginPage() {
  const handleLogin = () => {
    // Şimdilik UI Testi (Mock) için doğrudan admin paneline yönlendir
    window.location.href = '/admin/sellers/pending'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        
        <div className="p-8 text-center bg-slate-900">
          <h2 className="text-2xl font-black text-white tracking-widest uppercase">
            OPEN<span className="text-emerald-400">BAZAAR</span>
          </h2>
          <p className="text-sm text-slate-300 mt-2 font-medium">Küresel Pazar Yerine Giriş</p>
        </div>

        <div className="p-8">
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1">E-Posta Adresi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={16} className="text-slate-500" />
                </div>
                <input 
                  type="email" 
                  defaultValue="admin@openbazaar.com"
                  className="w-full pl-10 border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-3 border bg-white text-slate-900 font-medium" 
                />
              </div>
            </div>

            <div>
              <label className="flex justify-between text-sm font-bold text-slate-800 mb-1">
                Şifre
                <a href="#" className="text-emerald-600 hover:underline text-xs font-semibold">Şifremi Unuttum</a>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={16} className="text-slate-500" />
                </div>
                <input 
                  type="password" 
                  defaultValue="123456"
                  className="w-full pl-10 border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-3 border bg-white text-slate-900 font-bold tracking-widest" 
                />
              </div>
            </div>

            <button 
              type="button" 
              onClick={handleLogin}
              className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-lg shadow-md hover:bg-emerald-700 transition-colors text-lg"
            >
              Sisteme Giriş Yap
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4 border-gray-300"></span>
            <span className="text-xs text-center text-slate-500 uppercase font-bold">Veya Şununla Bağlan</span>
            <span className="border-b w-1/5 lg:w-1/4 border-gray-300"></span>
          </div>

          <div className="mt-6 space-y-3">
            <button onClick={() => alert("Monkey Test: Bu butonun arkasındaki API / Fonksiyon şu an geliştirme aşamasındadır.")} className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 text-slate-700 font-bold py-3 rounded-lg hover:bg-gray-50 transition-colors">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              Google ile Devam Et
            </button>
            <button onClick={() => alert("Monkey Test: Bu butonun arkasındaki API / Fonksiyon şu an geliştirme aşamasındadır.")} className="w-full flex items-center justify-center gap-2 bg-slate-950 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-colors">
              <img src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="Apple" className="w-5 h-5 invert" />
              Apple ile Devam Et
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-slate-600 font-medium">
            Hesabınız yok mu? <br/>
            <Link href="/register/buyer" className="text-emerald-600 font-bold hover:underline">Müşteri Ol</Link> veya <Link href="/register/seller" className="text-blue-600 font-bold hover:underline">Tedarikçi Ol</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
