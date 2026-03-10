const { Client } = require('pg');
require('dotenv').config();

async function run() {
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();
    
    const categories = [
        { id: 'cat_2', slug: 'kurumeyve', tr: 'Kuru Meyve & Kayısı', en: 'Dried Fruits' },
        { id: 'cat_3', slug: 'lokum', tr: 'Geleneksel Lokum', en: 'Turkish Delight' },
        { id: 'cat_4', slug: 'ramazan-ozel', tr: 'Ramazan Özel', en: 'Ramadan Specials' },
        { id: 'cat_5', slug: 'antep-fistigi', tr: 'Antep Fıstığı', en: 'Pistachio' },
        { id: 'cat_6', slug: 'ceviz', tr: 'Ceviz & Badem', en: 'Walnut & Almond' },
        { id: 'cat_7', slug: 'kahve', tr: 'Yöresel Kahveler', en: 'Local Coffees' },
        { id: 'cat_8', slug: 'baharat', tr: 'Baharat & Salça', en: 'Spices & Paste' }
    ];
    
    console.log("Kategoriler ekleniyor...");
    for (const cat of categories) {
        await client.query(`
            INSERT INTO "Category" (id, slug, "nameTranslations") 
            VALUES ($1, $2, $3)
            ON CONFLICT (slug) DO NOTHING;
        `, [cat.id, cat.slug, JSON.stringify({tr: cat.tr, en: cat.en})]);
    }
    
    console.log("5000 ürün bu yeni kategorilere rastgele dağıtılıyor...");
    await client.query(`
        UPDATE "Product" 
        SET "categoryId" = (
            SELECT id FROM "Category" ORDER BY RANDOM() LIMIT 1
        )
        WHERE "categoryId" = 'cat_1';
    `);
    
    console.log("Kategori ağacı başarıyla inşa edildi ve ürünler dağıtıldı!");
    await client.end();
}

run().catch(console.error);
