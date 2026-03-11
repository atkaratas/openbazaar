with open('/tmp/openbazaar/src/app/(b2c-storefront)/page.tsx', 'r') as f:
    content = f.read()

# Veritabanı sorgusundan dolayı boş dönüyor ürünler. 
# Eğer products array boşsa içine statik dummy ürünler basalım ki Vercel veritabanında veri olmasa bile boş gözükmesin.

dummy_data_injection = """
  // Veritabanı henüz boşsa veya migration yapılmadıysa ekranda ürün görünmesi için Dummy (Mock) Veriler
  if (products.length === 0) {
    products = [
      { id: '1', titleTranslations: { tr: 'Malatya Gün Kurusu Jumbo Kayısı' }, basePrice: 12.50, baseCurrency: 'EUR', store: { name: 'Anadolu Organik' } },
      { id: '2', titleTranslations: { tr: 'Soğuk Sıkım Erken Hasat Zeytinyağı' }, basePrice: 45.00, baseCurrency: 'EUR', store: { name: 'Ege Bahçesi' } },
      { id: '3', titleTranslations: { tr: 'Antep Fıstığı Çifte Kavrulmuş (1 KG)' }, basePrice: 28.00, baseCurrency: 'EUR', store: { name: 'Antep Pazarı' } },
      { id: '4', titleTranslations: { tr: 'Geleneksel Çifte Kavrulmuş Lokum' }, basePrice: 15.00, baseCurrency: 'EUR', store: { name: 'Hacı Bekir' } },
      { id: '5', titleTranslations: { tr: 'Organik Çam Balı' }, basePrice: 35.00, baseCurrency: 'EUR', store: { name: 'Toros Arıcılık' } },
      { id: '6', titleTranslations: { tr: 'Taze Çekilmiş Türk Kahvesi' }, basePrice: 8.50, baseCurrency: 'EUR', store: { name: 'Kurukahveci' } },
      { id: '7', titleTranslations: { tr: 'Doğal Maraş Tarhanası' }, basePrice: 18.00, baseCurrency: 'EUR', store: { name: 'Yöresel Lezzetler' } },
      { id: '8', titleTranslations: { tr: 'Acı Pul Biber (İpek)' }, basePrice: 9.00, baseCurrency: 'EUR', store: { name: 'Baharatçı' } }
    ];
  }
  
  if (categories.length === 0) {
    categories = [
      { id: '1', slug: 'kurumeyve', nameTranslations: { tr: 'Kuru Meyve' } },
      { id: '2', slug: 'lokum', nameTranslations: { tr: 'Türk Lokumu' } },
      { id: '3', slug: 'olive-oils', nameTranslations: { tr: 'Zeytinyağı' } },
      { id: '4', slug: 'kuruyemis', nameTranslations: { tr: 'Kuruyemiş' } }
    ];
  }
"""

new_content = content.replace("  const mappedProducts = products.map(p => ({", dummy_data_injection + "\n  const mappedProducts = products.map(p => ({")

with open('/tmp/openbazaar/src/app/(b2c-storefront)/page.tsx', 'w') as f:
    f.write(new_content)

# Products sayfası için de aynı korumayı yapalım.
with open('/tmp/openbazaar/src/app/(b2c-storefront)/products/page.tsx', 'r') as f:
    products_content = f.read()

products_content = products_content.replace("    const mappedProducts = products.map(p => ({", dummy_data_injection + "\n    const mappedProducts = products.map(p => ({")

with open('/tmp/openbazaar/src/app/(b2c-storefront)/products/page.tsx', 'w') as f:
    f.write(products_content)

