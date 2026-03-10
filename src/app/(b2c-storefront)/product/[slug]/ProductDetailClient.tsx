'use client'

import { useState } from 'react'
import { useCart } from '@/store/useCart'
import { ShoppingBag, Check } from 'lucide-react'

export default function ProductDetailClient({ product }: { product: any }) {
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const addItem = useCart((state) => state.addItem)

  const handleAddToCart = () => {
    addItem({ ...product, quantity, title: product.title })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const b2bPrice = (product.price * 0.75).toFixed(2) // %25 Toptan indirimi simülasyonu

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="bg-gray-100 rounded-3xl aspect-square flex items-center justify-center overflow-hidden shadow-inner">
        <img src={product.image} alt="Product" className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col justify-center">
        <div className="text-sm font-bold text-emerald-600 mb-2 uppercase tracking-wider">{product.storeName}</div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{product.title['tr']}</h1>
        <p className="text-slate-500 mb-8">{product.description['tr']}</p>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
          <div className="bg-white border-2 border-emerald-500 px-6 py-4 rounded-2xl shadow-sm w-full md:w-auto">
            <span className="text-xs text-emerald-600 block font-bold uppercase mb-1">B2C (Perakende)</span>
            <span className="text-3xl font-black text-slate-900">€ {product.price.toFixed(2)} <span className="text-sm font-medium text-slate-500">/ {product.unitType}</span></span>
          </div>
          <div className="bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl w-full md:w-auto">
            <span className="text-xs text-slate-500 block font-bold uppercase mb-1">B2B (Toptan - Min 50 {product.unitType})</span>
            <span className="text-2xl font-black text-slate-700">€ {b2bPrice} <span className="text-sm font-medium text-slate-500">/ {product.unitType}</span></span>
          </div>
        </div>

        {/* Adet Çoğaltma (Quantity Selector) */}
        <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border-2 border-slate-200 rounded-xl bg-white overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 text-slate-600 font-bold hover:bg-slate-100">-</button>
                <span className="px-4 font-black text-lg w-12 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 text-slate-600 font-bold hover:bg-slate-100">+</button>
            </div>
            <span className="text-sm font-medium text-slate-500">Stok: {product.stock} {product.unitType} mevcut</span>
        </div>

        <div className="space-y-3 mb-8">
          <button 
            onClick={handleAddToCart}
            className={`w-full font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 ${added ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
          >
            {added ? <><Check /> Sepete Eklendi</> : <><ShoppingBag /> Sepete Ekle (Perakende)</>}
          </button>
          
          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase">VEYA TOPTANCI İSENİZ</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <button onClick={() => setShowQuoteModal(true)} className="w-full bg-white border-2 border-slate-200 text-slate-700 font-bold py-4 rounded-xl hover:bg-slate-50 transition-colors">
            🤝 Satıcıdan Özel Fiyat İste (RFQ)
          </button>
        </div>

        {/* RFQ MODAL */}
        {showQuoteModal && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                <div className="bg-white p-8 rounded-3xl max-w-md w-full">
                    <h3 className="font-black text-xl mb-4">Teklif İste</h3>
                    <button onClick={() => setShowQuoteModal(false)} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold">Kapat (Test Arayüzü)</button>
                </div>
            </div>
        )}
      </div>
    </div>
  )
}
