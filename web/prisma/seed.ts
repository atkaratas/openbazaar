// --- KOD ADI: OB | VERİTABANI TOHUMLAMA (SEED) ---
// Sistemi kurduğumuzda ilk açılışta veritabanını test datasıyla dolduracak script.

import { PrismaClient, Role } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with test data...')

  // 1. Admin Kullanıcı (Sen)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@openbazaar.com' },
    update: {},
    create: {
      email: 'admin@openbazaar.com',
      passwordHash: 'hashed_password_123', // Gerçekte bcrypt ile şifrelenir
      role: Role.ADMIN,
      name: 'Talha (System Owner)',
    },
  })

  // 2. Örnek Bir Satıcı Firma
  const sellerUser = await prisma.user.upsert({
    where: { email: 'export@marmarabirlik.com' },
    update: {},
    create: {
      email: 'export@marmarabirlik.com',
      passwordHash: 'hashed_password_123',
      role: Role.SELLER,
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

  // 3. Kategoriler
  const category = await prisma.category.create({
    data: {
      slug: 'olive-oils',
      nameTranslations: {
        tr: 'Zeytinyağı',
        en: 'Olive Oils',
        ar: 'زيت الزيتون'
      }
    }
  })

  // 4. Test Ürünleri
  await prisma.product.create({
    data: {
      slug: 'erken-hasat-soguk-sikim-5l',
      storeId: store.id,
      categoryId: category.id,
      basePrice: 1500.00, // TRY bazında
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

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
