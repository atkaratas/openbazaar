'use client'

import { useState } from 'react'
import { Shield, Truck, PackageCheck, AlertTriangle } from 'lucide-react'
import { useCart } from '@/store/useCart'

export default function ProductDetailClient({ product }: { product: any }) {
  const [qty, setQty] = useState(1)
  const addItem = useCart((state) => state.addItem)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.titleTranslations,
      price: Number(product.basePrice),
      currency: product.baseCurrency,
      quantity: qty,
      image: (product.images && product.images.length > 0) ? product.images[0] : '/placeholder-food.jpg',
      storeId: product.storeId,
      storeName: product.store?.name || 'Tedarikçi',
      isColdChain: product.isColdChain || false
    })
    alert('✅ Sepete eklendi!')
  }

  const isB2bEligible = product.moq && product.moq > 1
  const b2bDiscount = 0.25 // %25 İndirim varsayımı
  const b2bPrice = Number(product.basePrice) * (1 - b2bDiscount)
  
  // Anlık toplam fiyat hesaplama (müşterinin ekranda görmesi için)
  const totalPrice = (Number(product.basePrice) * qty).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Sol Kolon - Görseller */}
        <div className="space-y-4">
          <div className="aspect-square w-full rounded-2xl bg-white border border-gray-100 overflow-hidden relative shadow-sm">
            {product.isColdChain && (
              <span className="absolute top-4 left-4 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 z-10">
                ❄️ Soğuk Zincir
              </span>
            )}
            <img 
              src={(product.images && product.images.length > 0) ? product.images[0] : 'https://malatyapazaripalanci.com.tr/productimages/102941/original/antep-fistigi-kavrulmus-250-gr-0489.jpg'}
              alt={product.titleTranslations?.tr || 'Ürün'}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Sağ Kolon - Detaylar */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
              {product.titleTranslations?.tr}
            </h1>
            <p className="text-lg text-gray-500 mt-2">
              Satıcı: <span className="font-bold text-emerald-700">{product.store?.name || 'OpenBazaar Tedarikçisi'}</span>
            </p>
          </div>

          {/* Fiyat Kartı */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8 space-y-4 shadow-sm">
            <div className="flex items-end justify-between border-b border-slate-200 pb-4">
              <div>
                <p className="text-sm font-bold text-slate-500 mb-1">B2C (Perakende)</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-900">€ {Number(product.basePrice).toFixed(2)}</span>
                  <span className="text-slate-500 font-medium">/ Adet</span>
                </div>
              </div>
            </div>

            {isB2bEligible && (
              <div className="flex items-center justify-between bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <div>
                  <p className="text-sm font-bold text-emerald-800 mb-1 flex items-center gap-1">
                    <PackageCheck size={16} /> B2B (Toptan - Min {product.moq} Adet)
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-emerald-700">€ {b2bPrice.toFixed(2)}</span>
                    <span className="text-emerald-600 font-medium">/ Adet</span>
                  </div>
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg text-sm shadow-md transition-all">
                  Teklif İste
                </button>
              </div>
            )}
          </div>

          {/* Sepete Ekle Formu */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 items-end">
            <div className="w-full sm:w-auto">
              <label className="block text-sm font-bold text-gray-700 mb-2">Adet Seçiniz</label>
              <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden bg-white h-14 w-full sm:w-40">
                <button 
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-2 text-xl font-bold text-slate-600 hover:bg-slate-50 w-12 h-full flex items-center justify-center transition-colors"
                >-</button>
                <div className="flex-1 text-center font-black text-xl text-slate-900">{qty}</div>
                <button 
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-2 text-xl font-bold text-slate-600 hover:bg-slate-50 w-12 h-full flex items-center justify-center transition-colors"
                >+</button>
              </div>
            </div>
            
            <div className="flex-1 w-full flex flex-col items-end">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Toplam Tutar</span>
              <span className="text-3xl font-black text-emerald-600 mb-2">€ {totalPrice}</span>
              
              <button 
                onClick={handleAddToCart}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black text-lg h-14 rounded-xl shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>🛒</span> Sepete Ekle
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Stok: <span className="font-bold text-gray-700">{Math.floor(Math.random() * 5000) + 100} Adet</span> mevcut
          </div>

          {/* Güven Rozetleri */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-200 pt-8">
            <div className="flex items-start gap-3">
              <Shield className="text-emerald-500 mt-1" size={24} />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">OpenBazaar Garantisi</h4>
                <p className="text-xs text-gray-500 mt-1">Ürün teslim edilene kadar paranız havuzda güvende kalır.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Truck className="text-blue-500 mt-1" size={24} />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Gümrük Dahil (DDP)</h4>
                <p className="text-xs text-gray-500 mt-1">Avrupa kapı teslim fiyatıdır. Sürpriz vergi çıkmaz.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
