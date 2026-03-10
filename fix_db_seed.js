const { Client } = require('pg');
require('dotenv').config();

async function run() {
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();
    
    await client.query(`
        INSERT INTO "User" (id, email, "passwordHash", role, name, "updatedAt") 
        VALUES ('22222222-2222-2222-2222-222222222222', 'seller@openbazaar.com', 'hash', 'SELLER', 'Toptan Satici', NOW())
        ON CONFLICT (email) DO NOTHING;
    `);
    
    // updatedAt 'Store' tablosunda eklememiş olabiliriz schema'da.
    await client.query(`
        INSERT INTO "Store" (id, name, "ownerId", "isVerified") 
        VALUES ('store_1', 'Malatya Pazari Palanci', '22222222-2222-2222-2222-222222222222', true)
        ON CONFLICT (name) DO NOTHING;
    `);
    
    await client.query(`
        INSERT INTO "Category" (id, slug, "nameTranslations") 
        VALUES ('cat_1', 'kuruyemis', '{"tr":"Kuruyemiş","en":"Nuts"}')
        ON CONFLICT (slug) DO NOTHING;
    `);
    
    console.log("Satıcı ve Kategori şeması düzeltildi.");
    await client.end();
}

run().catch(console.error);
