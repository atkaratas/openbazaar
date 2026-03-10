# OpenBazaar (Kod Adı: OB)
**Vizyon:** Türkiye'deki gıda üreticilerinin ve markalarının yurt dışına (B2B ve B2C) e-ihracat yapmasını sağlayan, global ölçekli bir Gıda Pazar Yeri (Food & Beverage Marketplace) platformu.

## 🏗️ Mimari (Tech Stack) - Taslak
* **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Shadcn UI
* **Backend:** Node.js (veya Next.js Server Actions/API Routes)
* **Veritabanı:** PostgreSQL (Supabase veya Prisma ORM ile)
* **Ödeme Altyapısı:** Stripe Connect (Çoklu satıcı para dağıtımı) veya yerel alternatifler
* **Kimlik Doğrulama:** Supabase Auth / NextAuth

## 🧩 Sistem Modülleri (Architecture Map)
1. **Vitrin (Storefront/B2C):** Son kullanıcı arayüzü, çoklu dil, kur çevirimi.
2. **Katalog Yönetimi (PIM):** Gıda sertifikasyonları, raf ömrü, soğuk zincir yönetimi, içindekiler (alerjen).
3. **Tedarikçi Paneli (Seller Dashboard):** Ürün yükleme (Sertifika onaylı), stok, finans ve sipariş takibi.
4. **Sipariş Yönetimi (OMS):** Parçalı sipariş takibi, fatura, gümrük etiketleme.
5. **Arama Motoru (Search):** ElasticSearch (veya Algolia/Meilisearch).
6. **Yönetim Paneli (Admin Backoffice):** Satıcı onayı, gümrük belge denetimi, komisyon yönetimi.
7. **Ödeme ve Cüzdan (Checkout & Wallet):** Stripe Connect, müşteri bakiyesi.
8. **Lojistik (Shipping Integrations):** Isı sensörlü (Cold Chain) kargo firmaları ve uluslararası kargo API entegrasyonu.
9. **Muhasebe/ERP (Integration Hub):** Logo, SAP, Mikro entegrasyonları.
10. **Web App (PWA):** Satıcılar ve Alıcılar için push bildirim destekli Mobil Web Uygulaması.
11. **Pazarlama ve Kampanya Motoru (Promo Engine):** Adminlerin vitrin afişlerini (Banner) yönettiği, global indirim kodlarını (Kuponlar), sepette %X indirim kampanyalarını, satıcı bazlı "Flash Sale" (Flaş İndirim) etkinliklerini ve e-posta pazarlama (Newsletter) operasyonlarını kurguladığı dinamik pazarlama yönetim altyapısı.
