import Link from 'next/link'
import prisma from '@/lib/db'

export default async function FreshSidebar() {
  let categories: any[] = [];
  try {
    categories = await prisma.category.findMany({
      where: { parentId: null },
      take: 15,
      orderBy: { createdAt: 'desc' }
    });
  } catch (e) {
    console.error("Sidebar category fetch error:", e);
  }

  // Fallback if empty
  if (categories.length === 0) {
    categories = [
      { slug: 'meyve-sebze', nameTranslations: { tr: 'Meyve & Sebze' } },
      { slug: 'sut-urunleri', nameTranslations: { tr: 'Süt Ürünleri' } },
      { slug: 'et-tavuk', nameTranslations: { tr: 'Et & Tavuk' } },
      { slug: 'temel-gida', nameTranslations: { tr: 'Temel Gıda' } },
      { slug: 'atistirmalik', nameTranslations: { tr: 'Atıştırmalık' } },
      { slug: 'dondurulmus', nameTranslations: { tr: 'Dondurulmuş' } },
    ];
  }

  return (
    <div className="w-64 flex-shrink-0 bg-white border-r border-gray-200 h-full min-h-screen py-6 px-4 hidden lg:block sticky top-0 overflow-y-auto">
      <h3 className="font-extrabold text-[#5B821D] text-lg mb-4 pl-2 uppercase tracking-tight">Kategoriler</h3>
      <ul className="space-y-1">
        {categories.map((c, i) => (
          <li key={i}>
            <Link 
              href={`/products?category=${c.slug}`}
              className="block px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-[#F3F7ED] hover:text-[#5B821D] rounded-lg transition-colors"
            >
              {c.nameTranslations?.tr || c.slug}
            </Link>
          </li>
        ))}
      </ul>
      
      <div className="mt-8 pt-6 border-t border-gray-100">
        <h3 className="font-bold text-gray-900 text-sm mb-3 pl-2">Özel Diyetler</h3>
        <ul className="space-y-1">
          <li>
            <Link href="/products?tag=organic" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              Organik Sertifikalı
            </Link>
          </li>
          <li>
            <Link href="/products?tag=gluten-free" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              Glutensiz
            </Link>
          </li>
          <li>
            <Link href="/products?tag=vegan" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              Vegan
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}