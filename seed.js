const { PrismaClient } = require('@prisma/client')
require('dotenv').config({ path: ".env.local" })

// Prisma v7 uses standard constructor if datasource is in prisma.config.ts but since we run raw script we just omit options that throw
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with test data...')

  const admin = await prisma.user.upsert({
    where: { email: 'admin@openbazaar.com' },
    update: {},
    create: {
      email: 'admin@openbazaar.com',
      passwordHash: 'hashed_password_123',
      role: 'ADMIN',
      name: 'Talha (System Owner)',
    },
  })

  const sellerUser = await prisma.user.upsert({
    where: { email: 'export@marmarabirlik.com' },
    update: {},
    create: {
      email: 'export@marmarabirlik.com',
      passwordHash: 'hashed_password_123',
      role: 'SELLER',
      name: 'Hasan Bey',
    },
  })

  const store = await prisma.store.upsert({
    where: { ownerId: sellerUser.id },
    update: {},
    create: {
      ownerId: sellerUser.id,
      name: 'Marmara Birlik A.Ş.',
      description: 'Dünyanın en büyük zeytin üreticisi kooperatiflerinden biri.',
      taxId: '1234567890',
      stripeAccountId: 'acct_1MockStripeId',
      isVerified: true,
    },
  })

  const category = await prisma.category.upsert({
    where: { slug: 'olive-oils' },
    update: {},
    create: {
      slug: 'olive-oils',
      nameTranslations: {
        tr: 'Zeytinyağı',
        en: 'Olive Oils',
        ar: 'زيت الزيتون'
      }
    }
  })

  await prisma.product.upsert({
    where: { slug: 'erken-hasat-soguk-sikim-5l' },
    update: {},
    create: {
      slug: 'erken-hasat-soguk-sikim-5l',
      storeId: store.id,
      categoryId: category.id,
      basePrice: 1500.00,
      baseCurrency: 'TRY',
      stock: 500,
      isPublished: true,
      titleTranslations: {
        tr: 'Erken Hasat Soğuk Sıkım Zeytinyağı 5L',
        en: 'Early Harvest Cold Pressed Olive Oil 5L',
      },
      descriptionTranslations: {
        tr: 'Ege yöresinin en kaliteli zeytinlerinden...',
        en: 'Made from the highest quality Aegean olives...',
      },
      images: ['https://example.com/olive-oil.jpg'],
    }
  })

  console.log('Seed completed successfully.')
}

main().catch(console.error).finally(() => prisma.$disconnect())
