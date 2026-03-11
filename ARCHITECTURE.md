# OpenBazaar Mimari ve İş Mantığı Dokümantasyonu

Bu doküman, OpenBazaar (Kod Adı: TGM - Turk Global Market) projesinin mevcut mimarisini, iş mantığını ve öne çıkan modüllerini (AI Müzakere Motoru, Checkout ve Kampanya yönetimi) detaylandırmak amacıyla hazırlanmıştır.

## 1. Genel Mimari ve Teknoloji Yığını

- **Framework:** Next.js (App Router mimarisi)
- **Veritabanı ve ORM:** PostgreSQL ve Prisma (`prisma/schema.prisma` dosyasından görüldüğü üzere).
- **Stil ve Arayüz:** TailwindCSS, Lucide-React (İkonlar).
- **Global State Yönetimi:** Zustand (`src/store/useCart.ts` üzerinden).
- **Çoklu Dil (i18n):** Ürün veritabanında JSON tabanlı çoklu dil desteği (Örn: `titleTranslations`, `descriptionTranslations`).
- **Çoklu Para Birimi:** Ürünler satıcının yerel para birimiyle (`baseCurrency`) kaydedilip, sipariş esnasında veya arayüzde dinamik kurlarla hedef kura (`paymentCurrency`) dönüştürülecek şekilde yapılandırılmış.

## 2. Dizin Yapısı ve İşlevleri

- **`/prisma/schema.prisma`:** Projenin çekirdek veri modeli. B2C/B2B desteği, Kullanıcı, Mağaza (Store), Ürün (Product), Sipariş (Order), Cüzdan (Wallet) ve Reinforcement Learning (RL) telemetri kayıtlarını barındırır.
- **`/src/app/(b2c-storefront)/`:** Müşterilere yönelik vitrin arayüzleri. (Anasayfa, Ürün Detayı, Checkout)
- **`/src/app/(seller-panel)/`:** İhracatçı ve satıcıların mağaza yönetimi, ürün girişi ve otonom AI ayarlarını yaptığı panel.
- **`/src/app/(admin-panel)/`:** Platform yöneticisinin lojistik, finans ve satıcı onay süreçlerini yürüttüğü alan.
- **`/src/app/api/`:** Next.js Route Handler'ları. Stripe entegrasyonu, ERP/Akinsoft senkronizasyonu ve kargo/lojistik API'leri için altyapı.

## 3. Temel İş Mantığı (Business Logic)

### Ürün ve Fiyatlandırma
Platform hem **B2C (Perakende)** hem de **B2B (Toptan)** satışa uygundur. B2C satışlarda temel perakende fiyatı gösterilir. Eğer ürün için Minimum Sipariş Miktarı (MOQ) 1'den büyükse, ürün B2B şartlarını sağlar ve "Toptan Alım" seçenekleri aktif hale gelir.

### Lojistik ve Soğuk Zincir
Ürünlerin `isColdChain` (Soğuk Zincir) bayrağı bulunmaktadır. Bir sipariş sepetinde en az bir tane soğuk zincir ürünü varsa:
- Sadece "DHL Express Thermal" (Isı sensörlü kargo) opsiyonu sunulur ve kargo ücreti daha yüksektir (Örn: 45€).
- Soğuk zincir gerektirmeyen ürünlerde ise standart hava kargo ("DHL Express Worldwide", 24.5€) seçilir.
- "Gümrük Vergisi (DDP)" vurgusu ile kullanıcıya sürpriz vergi çıkmayacağı güvencesi verilir.

## 4. AI Müzakere Motoru (AI Negotiation Bridge)

**Konum:** `/src/app/(b2c-storefront)/product/[slug]/ProductDetailClient.tsx`

Toptan alımlarda (B2B), alıcı ve satıcı arasındaki pazarlık sürecini otomatize eden bir yapay zeka satış temsilcisi bulunur.

1. **Tetiklenme:** Kullanıcı MOQ değerini sağladığında "AI ile Pazarlık Yap" butonu görünür.
2. **Deneyim:** Açılan modal içerisinde otonom bir AI ajanı (Satıcıyı temsilen) kullanıcıyı karşılar.
3. **Müzakere Simülasyonu:** 
   - Kullanıcı miktar veya fiyat beklentisini chate yazar.
   - Sistem bir gecikme (`setTimeout`) ve yazıyor (`isTyping`) animasyonu eşliğinde dinamik olarak pazarlığı simüle eder.
   - Yapay zeka anlaşmaya varırsa, o anki oturuma özel bir indirim kodu üretir. Örneğin: `AI-DEAL-30`.
4. **Entegrasyon:** Anlaşma sağlandığında elde edilen bu kod, kullanıcı tarafından doğrudan sepete aktarılır.

## 5. Checkout ve Kampanya Modülü

**Konum:** `/src/app/(b2c-storefront)/checkout/page.tsx`

Checkout sayfası, güvenli ödeme adımını ve kampanya yönetimini içerir.

- **Sepet Özeti:** Zustand üzerinden gelen ürünler listelenir, miktar güncellemeleri ve ürün çıkarma işlemleri yapılabilir.
- **Kampanya Uygulama (Discount Engine):** 
  - Statik Kodlar: `B2B20` (%20 indirim), `OPENBAZAAR15` (%15 indirim).
  - Dinamik AI Kodları: AI Müzakere motorundan gelen kodlar regex (`/AI-DEAL-(\d+)/i`) ile parse edilir. Kodun içindeki sayısal değer (Örn: 30), sepette yüzde (%) bazında indirim olarak uygulanır.
- **Tutar Hesaplaması:** 
  `Ara Toplam (Subtotal) - Kampanya İndirimi + Lojistik (Shipping)` formülüyle nihai sepet tutarı (Grand Total) hesaplanır.
- **Ödeme Entegrasyonu:** Stripe simülasyonu çalıştırılır ve başarılı ödemeler `checkout/success` rotasına yönlendirilir.

---
*Bu dokümantasyon, /tmp/openbazaar dizinindeki kaynak kodlar incelenerek oluşturulmuştur.*