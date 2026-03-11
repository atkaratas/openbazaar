# OpenBazaar B2B/B2C Platformu - Tedarikçiler İçin API Entegrasyon Rehberi

Tedarikçilerin (satıcı ve ihracatçılar) kendi kullandıkları **Muhasebe/ERP sistemleri** (Örn: Akınsoft Wolvox, Logo, Mikro, Nebim vb.) ile OpenBazaar'ı çift yönlü konuşturması için hazırlanmış resmi API referansıdır.

Bu doküman, OpenBazaar'ın mağazalardaki **stok ve fiyat verilerini anlık güncellemek** (Ürün Senkronizasyonu) ile mağazaya düşen **yeni siparişleri çekmek** (Sipariş Senkronizasyonu) için dış entegratörlere sunduğu REST API uç noktalarını (Endpoints) içerir.

## 1. Yetkilendirme (Authentication)

Tüm API uç noktaları için satıcı paneli (Seller Panel) ayarlarından elde edilen bir API Anahtarına ihtiyaç vardır. Bu anahtar `HTTP Headers` üzerinden iletilmelidir.

**Gerekli Header:**
- `x-akinsoft-api-key` veya `x-openbazaar-api-key`: `OBZ_SEC_9x8A...`
- `Content-Type`: `application/json`

---

## 2. Ürün ve Stok Eşitleme (PIM / ERP Sync)

Kritik Kural: ERP sistemlerinden gelen ürün isimleri genelde kısaltmalar ("ULKER CIKOLATALI GFRT") içerir. OpenBazaar çoklu dil destekleyen bir PIM (Product Information Management) sistemine sahiptir (Örn: "Ülker Chocolate Wafer 35g"). Bu nedenle API ile **yalnızca fiyat ve stok miktarı** güncellenmeli, ürün SEO'su ve ürün detay verileri ezilmemelidir.

### 2.1. Toplu Fiyat ve Stok Güncelleme
**Endpoint:** `POST /api/integrations/akinsoft/sync`  
*(Veya diğer ERP'ler için genel `POST /api/erp/sync/products`)*

**Açıklama:** Mağazanın ERP sistemindeki stok bakiyelerini ve satış fiyatlarını toplu olarak OpenBazaar'a iletir.

#### İstek Örneği (Payload)
```json
{
  "syncType": "STOCK_UPDATE",
  "data": [
    {
      "STOKKODU": "8690504100511", 
      "SATIS_FIYATI1": 145.50, 
      "MEVCUT": 500
    },
    {
      "STOKKODU": "8690504100528", 
      "SATIS_FIYATI1": 22.00, 
      "MEVCUT": 0
    }
  ]
}
```
*Not: `STOKKODU` barkod veya SKU (Stock Keeping Unit) numarasıdır. `SATIS_FIYATI1` satıcının ürünleri satmak istediği baz para birimindeki (Genellikle TRY) fiyattır.*

#### Başarılı Cevap Örneği (Response)
```json
{
  "status": "success",
  "message": "Akınsoft Wolvox ERP stokları OpenBazaar a başarıyla eşitlendi.",
  "metrics": {
    "processed": 2,
    "success": 2,
    "failed": 0
  }
}
```

---

## 3. Sipariş Çekme (Order Fetching)

Müşteriler, dünyanın herhangi bir yerinden yerel kurlarla (EUR, USD, GBP) alışveriş yaparlar. Siparişler oluşturulur ve ödemesi garanti altına alınır (Stripe/Havuz). ERP sistemleri bu siparişleri periyodik çekerek (veya Webhook kullanarak) muhasebeleştirebilir.

### 3.1. Yeni (Bekleyen) Siparişleri Listeleme
**Endpoint:** `GET /api/erp/sync/orders?status=PENDING`

**Açıklama:** Satıcının mağazasına (Store) düşmüş ancak henüz ERP'ye aktarılmamış/faturalanmamış siparişleri getirir.

#### Başarılı Cevap Örneği (Response)
```json
{
  "status": "success",
  "orders": [
    {
      "orderId": "ORD-2024-X9A21",
      "createdAt": "2024-11-20T14:30:00Z",
      "buyerName": "John Doe",
      "shippingAddress": {
        "country": "Germany (DE)",
        "street": "Musterstraße 1",
        "city": "Berlin",
        "zipCode": "10115"
      },
      "items": [
        {
          "STOKKODU": "8690504100511",
          "quantity": 2,
          "priceAtPurchase": 145.50
        }
      ],
      "paymentCurrency": "EUR",
      "totalPaid": 15.00
    }
  ]
}
```
*Not: Sipariş muhasebe sistemine çekildiğinde `POST /api/erp/sync/orders/ack` endpointine sipariş ID'leri yollanarak "İşlendi" (Acknowledged) olarak işaretlenmelidir.*

---

## 4. Hata Kodları ve Çözüm Yolları

- `401 Unauthorized`: API Anahtarı eksik veya geçersiz. Mağaza ayarlarınızdan (Seller Panel) yeni bir anahtar üretip doğruluğunu kontrol edin.
- `400 Bad Request`: JSON formatı hatalı veya zorunlu alanlar (`syncType`, `data`) eksik gönderilmiş.
- `404 Not Found`: Gönderilen `STOKKODU` OpenBazaar veritabanında eşleştirilemedi. Ürünlerin barkodları kontrol edilmelidir.
- `429 Too Many Requests`: Dakika başına düşen API sınırını (Rate Limit) aştınız. Senkronizasyon sıklığını düşürün (Örn: Dakikada 1 yerine, 15 dakikada 1 toplu gönderim).
- `500 Internal Server Error`: OpenBazaar veritabanında geçici bir sorun veya eş zamanlı kayıt (`ErpSyncLog`) engeli. Birkaç dakika sonra tekrar deneyin.
