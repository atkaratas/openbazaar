// --- KOD ADI: OB | KÜRESEL LOJİSTİK (DHL EXPRESS API) ---
// Yurt dışı (Mikro İhracat) kargo barkodu (Airway Bill - AWB) oluşturma ve Gümrük Beyanı (PLT - Paperless Trade).

import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

// DHL API Kimlik Bilgileri (Geliştirici Portalından)
const DHL_API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://express.api.dhl.com/mydhlapi/shipments' 
  : 'https://express.api.dhl.com/mydhlapi/test/shipments'
const DHL_API_KEY = process.env.DHL_API_KEY!
const DHL_ACCOUNT = process.env.DHL_ACCOUNT_NUMBER!

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { orderId, storeId } = await req.json()

    // 1. Veritabanından (Prisma) sipariş detaylarını, müşteri (Alıcı) adresini ve satıcı (Gönderici) deposunu çek.
    // 2. Ürünlerin GTİP kodlarını, net/brüt ağırlıklarını ve gıda menşeini (Origin: TR) hesapla.
    // 3. Sipariş toplamının Mikro İhracat (ETGB - 15000 EUR / 300 KG) sınırında olduğunu doğrula.

    // Simüle Edilmiş DHL İstek Gövdesi (Payload)
    const dhlPayload = {
      plannedShippingDateAndTime: new Date(Date.now() + 86400000).toISOString(), // Yarın
      pickup: {
        isRequested: false, // Satıcı kendisi şubeye bırakacak veya periyodik alım var
      },
      productCode: 'P', // P = DHL Express Worldwide (B2C/B2B İhracat Standardı)
      localProductCode: 'P',
      getRateEstimates: false,
      accounts: [
        {
          typeCode: 'shipper',
          number: DHL_ACCOUNT,
        },
      ],
      // Gümrük İşlemleri (ETGB - Mikro İhracat ZORUNLU ALANLAR)
      customsDeclarations: {
        lineItems: [
          {
            number: 1,
            description: 'Early Harvest Cold Pressed Olive Oil (Erken Hasat Zeytinyağı)',
            price: 45.00,
            quantity: { value: 2, unitOfMeasurement: 'PCS' },
            commodityCodes: [
              { typeCode: 'outbound', value: '150920000011' }, // Gerçek GTİP Kodu (İhracat Gümrüğü)
            ],
            exportReasonType: 'permanent', // Kalıcı İhracat (İade/Tamir değil)
            manufacturerCountry: 'TR',     // Türk Malı (Menşei Şahadetnamesi / EUR.1 için)
            weight: { netValue: 2.5, grossValue: 2.8 }, // Kilo sınırları (300 KG kontrolü)
          },
        ],
        invoice: {
          number: `INV-${orderId}`, // Senin keseceğin e-İhracat Fatura Numarası
          date: new Date().toISOString().split('T')[0],
        },
        // PLT (Paperless Trade): DHL gümrük memuruna faturayı elektronik iletir, kağıda gerek kalmaz
        isCustomsDeclarable: true,
      },
      // Gönderici ve Alıcı Adresleri (Simüle edildi)
      customerDetails: {
        shipperDetails: {
          postalAddress: {
            postalCode: '34000',
            cityName: 'Istanbul',
            countryCode: 'TR',
            addressLine1: 'Marmara Birlik Fabrika Yolu No:1',
          },
          contactInformation: { email: 'export@marmarabirlik.com.tr', phone: '+905550000000', companyName: 'Marmara Birlik' },
        },
        receiverDetails: {
          postalAddress: {
            postalCode: '10115',
            cityName: 'Berlin',
            countryCode: 'DE',
            addressLine1: 'Mitte Strasse 12',
          },
          contactInformation: { email: 'klaus@example.com', phone: '+491510000000', companyName: 'Klaus B2C' },
        },
      },
      // Kargo Koli (Package) Bilgileri
      packages: [
        {
          weight: 2.8,
          dimensions: { length: 20, width: 20, height: 30 }, // Desi (Volumetric Weight) hesabı
        },
      ],
    }

    // 4. DHL API'sine İstek At (Gerçek ortamda fetch kullanılır, burada simüle ediyoruz)
    /*
    const dhlResponse = await fetch(DHL_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(DHL_API_KEY).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dhlPayload),
    })
    const data = await dhlResponse.json()
    // data.trackingNumber -> DHL Takip Numarası
    // data.documents -> AWB (Uçak Konşimentosu) ve Gümrük Etiketi PDF'leri (Base64)
    */

    const mockDhlResponse = {
      trackingNumber: 'JD014600000000000001',
      dispatchConfirmationNumber: 'PRG123456',
      labelUrl: 'https://example.com/dhl-label-123.pdf', // Satıcı bunu yazdırıp koliye yapıştıracak
      status: 'ETGB_READY', // Mikro İhracat beyanı havaalanına elektronik iletildi
    }

    // 5. Veritabanında Siparişi (Shipment) "SHIPPED" yap ve Takip Kodunu Kaydet
    // await prisma.shipment.create({ ... })

    return NextResponse.json(mockDhlResponse)
  } catch (error: any) {
    console.error('DHL API Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
