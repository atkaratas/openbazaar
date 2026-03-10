const { Client } = require('pg');
require('dotenv').config();

async function run() {
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();
    
    console.log("Ürün resimleri kategorilerine göre düzeltiliyor...");

    const updates = [
        { keyword: '%Kayısı%', img: 'https://malatyapazaripalanci.com.tr/productimages/102941/original/gun-kurusu-kayisi-250-gr-0504.jpg' },
        { keyword: '%Lokum%', img: 'https://malatyapazaripalanci.com.tr/productimages/102941/original/cifte-kavrulmus-lokum-250-gr-0471.jpg' },
        { keyword: '%Badem%', img: 'https://malatyapazaripalanci.com.tr/productimages/102941/original/badem-kavrulmus-250-gr-0498.jpg' },
        { keyword: '%Fındık%', img: 'https://malatyapazaripalanci.com.tr/productimages/102941/original/findik-kavrulmus-250-gr-0500.jpg' },
        { keyword: '%Ceviz%', img: 'https://malatyapazaripalanci.com.tr/productimages/102941/original/ceviz-ici-250-gr-0478.jpg' },
        { keyword: '%Zeytinyağı%', img: 'https://malatyapazaripalanci.com.tr/productimages/102941/original/sizma-zeytinyagi-500-ml-0551.jpg' }, // Placeholder if not exist
        { keyword: '%Kahve%', img: 'https://malatyapazaripalanci.com.tr/productimages/102941/original/turk-kahvesi-100-gr-0538.jpg' } // Placeholder
    ];

    for (const u of updates) {
        const query = `
            UPDATE "Product" 
            SET images = ARRAY[$1] 
            WHERE "titleTranslations"->>'tr' ILIKE $2;
        `;
        const res = await client.query(query, [u.img, u.keyword]);
        console.log(`- '${u.keyword}' için ${res.rowCount} ürünün resmi güncellendi.`);
    }

    console.log("✅ Tüm resimler başarıyla değiştirildi!");
    await client.end();
}

run().catch(console.error);
