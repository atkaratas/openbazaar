'use client'

import { useState } from 'react'
import { useCart } from '@/store/useCart'
import { ShieldCheck, Truck, CreditCard, Lock } from 'lucide-react'

export default function CheckoutPage() {
  const { items, getTotal } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)

  // Sepette soğuk zincir gerektiren ürün var mı? (Lojistik filtresi)
  const requiresColdChain = items.some(item => (item as any).isColdChain)

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    // Stripe API'sine (daha önce yazdığımız route.ts) POST atılacak
    setTimeout(() => setIsProcessing(false), 2000) // Simülasyon
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Güvenli Ödeme (Secure Checkout)</h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <Lock size={14} /> 256-bit SSL ile şifrelenmiştir. Merchant of Record: OpenBazaar
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* SOL KOLON: Formlar (Adres, Kargo, Kredi Kartı) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Teslimat Adresi */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                Teslimat Adresi (Shipping Address)
              </h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ad (First Name)</label>
                    <input type="text" className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2.5 border bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Soyad (Last Name)</label>
                    <input type="text" className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2.5 border bg-gray-50" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ülke (Country) - Gümrük Hesaplaması İçin</label>
                  <select className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2.5 border bg-gray-50">
                    <option>Germany (DE)</option>
                    <option>United Kingdom (UK)</option>
                    <option>United States (US)</option>
                    <option>United Arab Emirates (UAE)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Açık Adres (Street Address)</label>
                  <input type="text" placeholder="House number and street name" className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2.5 border bg-gray-50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Şehir (City)</label>
                    <input type="text" className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2.5 border bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Posta Kodu (ZIP Code)</label>
                    <input type="text" className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2.5 border bg-gray-50" />
                  </div>
                </div>
              </form>
            </section>

            {/* 2. Kargo Seçeneği */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                Lojistik Seçimi (Shipping Method)
              </h2>
              <div className="space-y-3">
                
                {requiresColdChain ? (
                  <div className="p-4 border-2 border-emerald-500 bg-emerald-50 rounded-lg flex justify-between items-center cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Truck className="text-emerald-600" />
                      <div>
                        <p className="font-bold text-emerald-900">DHL Express Thermal (Soğuk Zincir)</p>
                        <p className="text-xs text-emerald-700">Sepetinizdeki gıdalar ısı sensörlü kutularda uçar. (1-2 İş Günü)</p>
                      </div>
                    </div>
                    <span className="font-bold text-emerald-900">€ 45.00</span>
                  </div>
                ) : (
                  <>
                    <label className="p-4 border border-gray-200 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="shipping" className="text-blue-600 focus:ring-blue-500 h-4 w-4" defaultChecked />
                        <div>
                          <p className="font-bold text-gray-900">DHL Express Worldwide</p>
                          <p className="text-xs text-gray-500">Hava kargo ile hızlı teslimat. (2-3 İş Günü)</p>
                        </div>
                      </div>
                      <span className="font-bold text-gray-900">€ 24.50</span>
                    </label>
                    <label className="p-4 border border-gray-200 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50 opacity-60">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="shipping" className="text-blue-600 focus:ring-blue-500 h-4 w-4" />
                        <div>
                          <p className="font-bold text-gray-900">Standart Posta (PTT / Local Post)</p>
                          <p className="text-xs text-gray-500">Kara/Deniz yolu ile yavaş teslimat. (7-14 İş Günü)</p>
                        </div>
                      </div>
                      <span className="font-bold text-gray-900">€ 9.90</span>
                    </label>
                  </>
                )}
              </div>
            </section>

            {/* 3. Ödeme (Stripe Element Placeholder) */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                Kredi Kartı (Payment)
              </h2>
              <div className="p-6 border border-gray-200 bg-gray-50 rounded-lg text-center flex flex-col items-center justify-center">
                <CreditCard size={48} className="text-gray-400 mb-4" />
                <p className="text-sm font-medium text-gray-600 mb-2">Bu alana Stripe Payment Elements bileşeni (IFrame) yüklenecek.</p>
                <p className="text-xs text-gray-400">Kart numarası, CVC ve 3D Secure işlemleri doğrudan Stripe sunucularında gerçekleşir. Veritabanımızda kredi kartı verisi ASLA tutulmaz.</p>
              </div>
            </section>

          </div>

          {/* SAĞ KOLON: Sipariş Özeti (Order Summary) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6 border-b pb-4">Sipariş Özeti (Order Summary)</h2>
              
              {/* Sepet Kalemleri */}
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {items.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">Sepetiniz boş.</p>
                ) : (
                  items.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <img src={item.image || '/placeholder-food.jpg'} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <p className="text-sm font-bold text-gray-900 line-clamp-1">{item.title['en'] || item.title['tr']}</p>
                        <p className="text-xs text-gray-500">Satıcı: {item.storeName}</p>
                        <p className="text-xs font-medium text-gray-700 mt-1">Adet: {item.quantity} x €{item.price.toFixed(2)}</p>
                      </div>
                      <div className="font-bold text-gray-900 flex items-center">
                        €{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Fiyat Hesaplamaları */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Ara Toplam (Subtotal)</span>
                  <span className="font-medium">€{getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Uluslararası Kargo (Shipping)</span>
                  <span className="font-medium">€{requiresColdChain ? '45.00' : '24.50'}</span>
                </div>
                <div className="flex justify-between text-sm text-emerald-600 font-medium">
                  <span>Gümrük Vergisi (DDP - Duty Paid)</span>
                  <span>€0.00</span> {/* ETGB Mikro İhracat kapsamında hesaplanacak */}
                </div>
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-gray-900">Genel Toplam</span>
                <span className="text-2xl font-black text-blue-600">
                  €{(getTotal() + (requiresColdChain ? 45 : 24.5)).toFixed(2)}
                </span>
              </div>

              <button 
                onClick={handlePayment}
                disabled={items.length === 0 || isProcessing}
                className="w-full py-4 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {isProcessing ? 'Güvenli Bağlantı Kuruluyor...' : 'Ödemeyi Tamamla ve Sipariş Ver (Pay Now)'}
              </button>

              <div className="mt-6 flex items-center justify-center gap-4 text-gray-400">
                <ShieldCheck size={24} />
                <span className="text-xs font-medium">PCI-DSS Uyumlu Güvenli Ödeme Ağı</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
