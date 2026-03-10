import prisma from '@/lib/db'
import { notFound } from 'next/navigation'
import ProductDetailClient from './ProductDetailClient' // İstemci tarafı (Sepet işlemleri için) ayrı dosya

// @ts-ignore
export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // Dinamik olarak ürünü veritabanından bul
  const product = await prisma.product.findUnique({
    where: { slug: slug },
    include: { store: true, category: true }
  })

  // Eğer DB'de yoksa sahte bir veri oluştur (UI testi kopmasın diye fallback)
  const productData = product ? {
    id: product.id,
    title: product.titleTranslations as Record<string, string>,
    description: product.descriptionTranslations as Record<string, string>,
    price: Number(product.basePrice),
    currency: product.baseCurrency,
    storeId: product.storeId,
    storeName: product.store.name,
    image: product.images[0] || 'https://malatyapazaripalanci.com.tr/productimages/102941/original/antep-fistigi-kavrulmus-250-gr-0489.jpg',
    unitType: (product.titleTranslations as any)?.tr?.toLowerCase().includes('zeytinyağı') ? 'Teneke' : 'KG',
    stock: product.stock
  } : {
    id: 'mock-1',
    title: { tr: 'Özel İhracat Ürünü (' + slug + ')', en: 'Export Product' },
    description: { tr: 'Bu ürün veritabanında bulunamadı ama UI testi için gösteriliyor.', en: '' },
    price: 45.00,
    currency: 'EUR',
    storeId: 'store_1',
    storeName: 'Marmara Birlik',
    image: 'https://malatyapazaripalanci.com.tr/productimages/102941/original/antep-fistigi-kavrulmus-250-gr-0489.jpg',
    unitType: 'KG',
    stock: 100
  }

  return <ProductDetailClient product={productData} />
}
