const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function run() {
  const query = "fıstık";
  
  // Try raw SQL because Prisma JSON filtering can be very tricky across different languages
  const rawQuery = `
    SELECT * FROM "Product" 
    WHERE "titleTranslations"->>'tr' ILIKE $1 
       OR "titleTranslations"->>'en' ILIKE $1
    LIMIT 10;
  `;
  
  const result = await prisma.$queryRawUnsafe(rawQuery, `%${query}%`);
  console.log("Raw SQL Search Result:", result.length, "items found.");
  if(result.length > 0) console.log(result[0].titleTranslations);
  
  await prisma.$disconnect();
}
run();
