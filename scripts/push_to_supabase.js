const { Client } = require('pg');
const fs = require('fs');
require('dotenv').config({ path: '.env' }); // Eğer rootta yoksa

async function main() {
    // 50k dosyasını oku
    console.log("Veri dosyası okunuyor...");
    const rawData = fs.readFileSync('data/products_50k.json');
    const products = JSON.parse(rawData);
    
    // DB Bağlantısı
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });
    
    await client.connect();
    console.log("Supabase Veritabanına Bağlanıldı. Veriler pompalanıyor...");
    
    // Marmara Birlik Store ID'sini bulalım (veya varsayılan bir tane bulalım)
    const res = await client.query('SELECT id FROM "Store" LIMIT 1');
    const storeId = res.rows.length > 0 ? res.rows[0].id : null;
    
    const catRes = await client.query('SELECT id FROM "Category" LIMIT 1');
    const categoryId = catRes.rows.length > 0 ? catRes.rows[0].id : null;
    
    if (!storeId || !categoryId) {
        console.log("❌ Hata: Mağaza veya Kategori ID bulunamadı. Önce db push ve seed yapılmış olmalı.");
        process.exit(1);
    }

    // Supabase (Postgres) limiti gereği, 50.000 ürünü tek tek atmak yerine 1000'erlik batchler halinde (Toplu SQL) atacağız.
    // Fakat çok zaman almaması için şimdilik (gösteri amaçlı) ilk 5.000 tanesini hızlıca basıyoruz. 
    // Tamamı basılmak istenirse döngü sonuna kadar (50k) gider.
    const BATCH_SIZE = 1000;
    const TARGET_LIMIT = 5000; // Simülasyon hızı için 5000 (Artırılabilir)
    
    let inserted = 0;
    for (let i = 0; i < TARGET_LIMIT; i += BATCH_SIZE) {
        const chunk = products.slice(i, i + BATCH_SIZE);
        
        let valueStrings = [];
        let values = [];
        let paramIndex = 1;
        
        for (const p of chunk) {
            valueStrings.push(`($${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, NOW(), NOW())`);
            
            // Generate valid slug from title
            const slug = p.titleTranslations.en.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + p.id.toLowerCase();
            
            values.push(
                p.id, 
                slug, 
                JSON.stringify(p.titleTranslations), 
                JSON.stringify(p.descriptionTranslations),
                p.basePrice,
                p.baseCurrency,
                p.stock,
                true, // isPublished
                storeId,
                categoryId
            );
        }
        
        const query = `
            INSERT INTO "Product" (id, slug, "titleTranslations", "descriptionTranslations", "basePrice", "baseCurrency", stock, "isPublished", "storeId", "categoryId", "createdAt", "updatedAt")
            VALUES ${valueStrings.join(', ')}
            ON CONFLICT (id) DO NOTHING;
        `;
        
        await client.query(query, values);
        inserted += chunk.length;
        console.log(`✅ ${inserted} adet ürün Supabase'e işlendi...`);
    }
    
    console.log("🔥 Veritabanı enjeksiyonu tamamlandı!");
    await client.end();
}

main().catch(console.error);
