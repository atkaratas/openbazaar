'use client'

import Link from 'next/link'
import { useCart } from '@/store/useCart'
import { ShoppingBag, Snowflake } from 'lucide-react'

interface ProductCardProps {
  product: {
    id: string
    title: Record<string, string>
    price: number
    currency: string
    storeId: string
    storeName: string
    image: string
    certifications: string[]
    isColdChain: boolean
  }
  locale?: string
}

export default function ProductCard({ product, locale = 'en' }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Linke gitmeyi engelle
    e.stopPropagation()
    addItem({ ...product, quantity: 1, title: product.title })
    alert("🛒 Ürün sepete eklendi! Üst menüdeki sepet ikonuna tıklayarak ödemeye (Checkout) geçebilirsiniz.")
  }

  const displayTitle = product.title[locale] || product.title['tr'] || 'Unknown Product'
  const productSlug = product.title['en'] ? product.title['en'].toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'product'

  return (
    <Link href={`/product/${productSlug}`} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col h-full cursor-pointer">
      {/* Ürün Görseli */}
      <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
        <img 
          src={product.image || '/placeholder-food.jpg'} 
          alt={displayTitle}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.isColdChain && (
          <div className="absolute top-3 left-3 bg-blue-500/90 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
            <Snowflake size={12} /> Cold Chain
          </div>
        )}
      </div>

      {/* Ürün Detayları */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs font-medium text-emerald-600 mb-2 flex items-center justify-between">
          <span>{product.storeName}</span>
          <div className="flex gap-1 text-gray-400">
             {product.certifications?.includes('HALAL') && <span title="Halal">☪️</span>}
             {product.certifications?.includes('FDA') && <span title="FDA">🇺🇸</span>}
          </div>
        </div>
        
        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1 line-clamp-2">
          {displayTitle}
        </h3>
        
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-900">
              {product.price.toLocaleString('en-US', { style: 'currency', currency: product.currency })}
            </span>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors z-10"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </Link>
  )
}
