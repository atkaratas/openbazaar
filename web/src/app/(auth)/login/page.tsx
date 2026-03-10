'use client'

import Link from 'next/link'
import { Lock, Mail } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        <div className="p-8 text-center bg-slate-950">
          <h2 className="text-2xl font-black text-white tracking-widest uppercase">
            OPEN<span className="text-blue-500">BAZAAR</span>
          </h2>
          <p className="text-sm text-slate-400 mt-2">Küresel Pazar Yerine Giriş</p>
        </div>

        <div className="p-8">
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-Posta Adresi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={16} className="text-gray-400" />
                </div>
                <input type="email" placeholder="ornek@sirket.com" className="w-full pl-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2.5 border bg-gray-50" />
              </div>
            </div>

            <div>
              <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                Şifre
                <a href="#" className="text-blue-600 hover:underline text-xs">Şifremi Unuttum</a>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <input type="password" placeholder="••••••••" className="w-full pl-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2.5 border bg-gray-50" />
              </div>
            </div>

            <button type="button" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
              Giriş Yap
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <span className="text-xs text-center text-gray-500 uppercase font-medium">Veya Şununla Bağlan</span>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>

          <div className="mt-6 space-y-3">
            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              Google ile Devam Et
            </button>
            <button className="w-full flex items-center justify-center gap-2 bg-black text-white font-medium py-2.5 rounded-lg hover:bg-gray-900 transition-colors">
              <img src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="Apple" className="w-5 h-5 invert" />
              Apple ile Devam Et
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600">
            Hesabınız yok mu? <br/>
            <Link href="/register/buyer" className="text-blue-600 font-bold hover:underline">Müşteri Ol</Link> veya <Link href="/register/seller" className="text-emerald-600 font-bold hover:underline">Tedarikçi (Satıcı) Ol</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
