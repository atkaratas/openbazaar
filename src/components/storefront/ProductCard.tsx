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
    certifications?: string[]
    isColdChain?: boolean
    unitType?: string // Yeni eklenen birim (KG, Adet)
  }
  locale?: string
}

export default function ProductCard({ product, locale = 'en' }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() 
    e.stopPropagation()
    addItem({ ...product, quantity: 1, title: product.title })
    // Gerçekçi ama sessiz bildirim
    const btn = e.currentTarget as HTMLButtonElement
    const originalText = btn.innerHTML
    btn.innerHTML = '✅'
    btn.classList.add('bg-emerald-600', 'text-white')
    setTimeout(() => {
      btn.innerHTML = originalText
      btn.classList.remove('bg-emerald-600', 'text-white')
    }, 1500)
  }

  const displayTitle = product.title[locale] || product.title['tr'] || 'Unknown Product'
  // Real slug for DB query
  const productSlug = product.title['en'] ? product.title['en'].toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + product.id.toLowerCase() : product.id

  return (
    <Link href={`/product/${productSlug}`} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col h-full cursor-pointer relative pb-4">
      <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
        <img 
          src={product.image || '/placeholder-food.jpg'} 
          alt={displayTitle}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.isColdChain && (
          <div className="absolute top-3 left-3 bg-blue-500/90 text-white text-[10px] font-bold px-1.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
            <Snowflake size={10} /> Soğuk Zincir
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs font-medium text-emerald-600 mb-2 flex items-center justify-between">
          <span className="truncate">{product.storeName}</span>
          <div className="flex gap-1 text-gray-400 flex-shrink-0">
             {product.certifications?.includes('HALAL') && <span title="Halal">☪️</span>}
             {product.certifications?.includes('FDA') && <span title="FDA">🇺🇸</span>}
          </div>
        </div>
        
        <h3 className="font-bold text-slate-800 text-sm leading-tight mb-2 line-clamp-2">
          {displayTitle}
        </h3>
        
        <div className="mt-auto pt-3 flex items-end justify-between border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-lg font-black text-slate-900">
              {product.price.toLocaleString('en-US', { style: 'currency', currency: product.currency })}
              <span className="text-[10px] text-gray-400 font-normal ml-1">/ {product.unitType || 'KG'}</span>
            </span>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="h-8 w-8 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors z-10"
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>
    </Link>
  )
}
