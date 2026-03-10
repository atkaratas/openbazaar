'use client'

import { useState } from 'react'
import { useCart } from '@/store/useCart'
import { ShieldCheck, Truck, CreditCard, Lock } from 'lucide-react'

export default function CheckoutPage() {
  const { items, getTotal } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)

  const requiresColdChain = items.some(item => (item as any).isColdChain)

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // UI TEST MOCK: Doğrudan kendi yaptığımız efsanevi success sayfasına yönlendir
    setTimeout(() => {
        window.location.href = '/checkout/success'
    }, 1500)
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900">Güvenli Ödeme (Secure Checkout)</h1>
          <p className="text-sm text-slate-600 mt-1 flex items-center gap-2 font-medium">
            <Lock size={14} className="text-emerald-600" /> 256-bit SSL ile şifrelenmiştir. Merchant of Record: OpenBazaar
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-7 space-y-8">
            <section className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <span className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md">1</span>
                Teslimat Adresi (Shipping)
              </h2>
              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">Ad (First Name)</label>
                    <input type="text" className="w-full border-2 border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-base p-3 bg-white text-slate-900 font-bold placeholder-slate-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">Soyad (Last Name)</label>
                    <input type="text" className="w-full border-2 border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-base p-3 bg-white text-slate-900 font-bold placeholder-slate-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">Ülke (Country) - Gümrük İçin</label>
                  <select className="w-full border-2 border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-base p-3 bg-white text-slate-900 font-bold">
                    <option>Germany (DE)</option>
                    <option>United Kingdom (UK)</option>
                    <option>United States (US)</option>
                    <option>United Arab Emirates (UAE)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">Açık Adres (Street Address)</label>
                  <input type="text" placeholder="House number and street name" className="w-full border-2 border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-base p-3 bg-white text-slate-900 font-bold placeholder-slate-400" />
                </div>
              </form>
            </section>

            <section className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <span className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md">2</span>
                Lojistik Seçimi
              </h2>
              <div className="space-y-4">
                {requiresColdChain ? (
                  <div className="p-5 border-2 border-blue-500 bg-blue-50 rounded-xl flex justify-between items-center cursor-pointer shadow-sm">
                    <div className="flex items-center gap-4">
                      <Truck className="text-blue-600" size={28} />
                      <div>
                        <p className="font-black text-blue-900 text-lg">DHL Express Thermal (Soğuk Zincir)</p>
                        <p className="text-sm font-medium text-blue-700 mt-1">Sepetinizdeki gıdalar ısı sensörlü kutularda uçar.</p>
                      </div>
                    </div>
                    <span className="font-black text-blue-900 text-xl">€ 45.00</span>
                  </div>
                ) : (
                  <>
                    <label className="p-5 border-2 border-emerald-500 bg-emerald-50/50 rounded-xl flex justify-between items-center cursor-pointer shadow-sm">
                      <div className="flex items-center gap-4">
                        <input type="radio" name="shipping" className="text-emerald-600 focus:ring-emerald-500 h-5 w-5" defaultChecked />
                        <div>
                          <p className="font-black text-slate-900 text-lg">DHL Express Worldwide</p>
                          <p className="text-sm font-medium text-slate-600 mt-1">Hava kargo ile hızlı teslimat. (2-3 İş Günü)</p>
                        </div>
                      </div>
                      <span className="font-black text-slate-900 text-xl">€ 24.50</span>
                    </label>
                  </>
                )}
              </div>
            </section>

            <section className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <span className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md">3</span>
                Kredi Kartı
              </h2>
              <div className="p-8 border-2 border-dashed border-slate-300 bg-slate-50 rounded-2xl text-center flex flex-col items-center justify-center">
                <CreditCard size={48} className="text-slate-400 mb-4" />
                <p className="text-base font-bold text-slate-800 mb-2">Stripe Güvenli Ödeme Ağı</p>
                <p className="text-sm font-medium text-slate-500 max-w-md mx-auto">"Ödemeyi Tamamla" butonuna bastığınızda, 3D Secure işlemleri için Stripe sunucularına bağlanacaksınız.</p>
              </div>
            </section>

          </div>

          <div className="lg:col-span-5">
            <div className="bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-800 sticky top-24 text-white">
              <h2 className="text-xl font-black mb-6 border-b border-slate-800 pb-4">Sipariş Özeti</h2>
              
              <div className="space-y-4 mb-6 max-h-72 overflow-y-auto pr-2">
                {items.length === 0 ? (
                  <p className="text-sm text-slate-400 font-medium text-center py-4">Sepetiniz boş.</p>
                ) : (
                  items.map(item => (
                    <div key={item.id} className="flex gap-4 items-center bg-slate-800/50 p-3 rounded-xl border border-slate-800">
                      <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image || '/placeholder-food.jpg'} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <p className="text-sm font-bold text-white line-clamp-1">{item.title['en'] || item.title['tr']}</p>
                        <p className="text-xs text-slate-400 mt-1">Satıcı: {item.storeName}</p>
                        <p className="text-xs font-bold text-emerald-400 mt-1">Adet: {item.quantity} x €{item.price.toFixed(2)}</p>
                      </div>
                      <div className="font-black text-white text-lg">
                        €{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-slate-800 pt-6 space-y-4">
                <div className="flex justify-between text-sm text-slate-300 font-medium">
                  <span>Ara Toplam (Subtotal)</span>
                  <span>€{getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-300 font-medium">
                  <span>Uluslararası Kargo (Shipping)</span>
                  <span>€{requiresColdChain ? '45.00' : '24.50'}</span>
                </div>
                <div className="flex justify-between text-sm text-emerald-400 font-bold bg-emerald-900/30 p-2 rounded-lg">
                  <span>Gümrük Vergisi (DDP)</span>
                  <span>€0.00</span> 
                </div>
              </div>

              <div className="border-t border-slate-800 mt-6 pt-6 flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-slate-300">Genel Toplam</span>
                <span className="text-4xl font-black text-white">
                  €{(getTotal() + (requiresColdChain ? 45 : 24.5)).toFixed(2)}
                </span>
              </div>

              <button 
                onClick={handlePayment}
                disabled={items.length === 0 || isProcessing}
                className="w-full py-5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg rounded-2xl shadow-[0_0_20px_rgba(5,150,105,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {isProcessing ? 'Bankaya Bağlanılıyor (3D Secure)...' : 'Ödemeyi Tamamla (Pay Now)'}
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
