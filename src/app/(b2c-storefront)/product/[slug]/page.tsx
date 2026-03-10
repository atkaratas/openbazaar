import prisma from '@/lib/db'
import ProductDetailClient from './ProductDetailClient' 

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> | any }) {
  try {
    const resolvedParams = params instanceof Promise ? await params : params;
    const slug = resolvedParams?.slug

    if (!slug) return <div className="p-20 text-center">Geçersiz Ürün</div>

    const product = await prisma.product.findUnique({
      where: { slug: slug },
      include: { store: true, category: true }
    })

    const productData = product ? {
      id: product.id,
      title: product.titleTranslations as Record<string, string>,
      description: product.descriptionTranslations as Record<string, string>,
      price: Number(product.basePrice),
      currency: product.baseCurrency,
      storeId: product.storeId,
      storeName: product.store?.name || 'OpenBazaar Satıcısı',
      image: (product.images && product.images.length > 0) ? product.images[0] : 'https://malatyapazaripalanci.com.tr/productimages/102941/original/antep-fistigi-kavrulmus-250-gr-0489.jpg',
      unitType: ((product.titleTranslations as any)?.tr || '').toLocaleLowerCase('tr-TR').includes('zeytinyağı') ? 'Teneke' : 'KG',
      stock: product.stock
    } : {
      id: 'mock-1',
      title: { tr: 'Özel İhracat Ürünü', en: 'Export Product' },
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
  } catch (error: any) {
    return <div className="p-20 text-center text-rose-600 font-bold bg-rose-50 rounded-xl m-10">Sistemsel Hata (Product API): {error.message}</div>
  }
}
