with open('/tmp/openbazaar/src/app/(b2c-storefront)/products/page.tsx', 'r') as f:
    content = f.read()

# Eger DB cokmusse, query gelmisse Dummy datayi javascript filter ile filteleyen kodu yazalim.
# Su anki kodda `if (products.length === 0)` varken "kayisi" aratirsa products.length 0 oluyor, hepsi geri yukleniyor.

search_logic = """
  if (products.length === 0) {
    let dummyProducts = [
      { id: '1', titleTranslations: { tr: 'Malatya Gün Kurusu Jumbo Kayısı' }, basePrice: 12.50, baseCurrency: 'EUR', store: { name: 'Anadolu Organik' } },
      { id: '2', titleTranslations: { tr: 'Soğuk Sıkım Erken Hasat Zeytinyağı' }, basePrice: 45.00, baseCurrency: 'EUR', store: { name: 'Ege Bahçesi' } },
      { id: '3', titleTranslations: { tr: 'Antep Fıstığı Çifte Kavrulmuş (1 KG)' }, basePrice: 28.00, baseCurrency: 'EUR', store: { name: 'Antep Pazarı' } },
      { id: '4', titleTranslations: { tr: 'Geleneksel Çifte Kavrulmuş Lokum' }, basePrice: 15.00, baseCurrency: 'EUR', store: { name: 'Hacı Bekir' } },
      { id: '5', titleTranslations: { tr: 'Organik Çam Balı' }, basePrice: 35.00, baseCurrency: 'EUR', store: { name: 'Toros Arıcılık' } },
      { id: '6', titleTranslations: { tr: 'Taze Çekilmiş Türk Kahvesi' }, basePrice: 8.50, baseCurrency: 'EUR', store: { name: 'Kurukahveci' } },
      { id: '7', titleTranslations: { tr: 'Doğal Maraş Tarhanası' }, basePrice: 18.00, baseCurrency: 'EUR', store: { name: 'Yöresel Lezzetler' } },
      { id: '8', titleTranslations: { tr: 'Acı Pul Biber (İpek)' }, basePrice: 9.00, baseCurrency: 'EUR', store: { name: 'Baharatçı' } }
    ];
    
    if (query) {
      products = dummyProducts.filter(p => p.titleTranslations.tr.toLowerCase().includes(query.toLowerCase()));
    } else {
      products = dummyProducts;
    }
  }
"""

content = content.replace("""  if (products.length === 0) {
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
  }""", search_logic)

with open('/tmp/openbazaar/src/app/(b2c-storefront)/products/page.tsx', 'w') as f:
    f.write(content)

print("Arama bugi cozuldu")
