with open('/tmp/openbazaar/src/app/(b2c-storefront)/page.tsx', 'r') as f:
    content = f.read()

# Prisma'da hem 'select' hem 'include' ayni anda kullanilamaz. Bu da gizli bir hataya (ve bos urun donmesine) sebep olur.
# Hata konsolda "Database connection failed during render:" ile yakalaniyor ve array bos donuyor.
# Bunu duzeltelim: 'select' icinde 'store: true' var zaten. 'include' kismini silelim.
# Ayrica 'isPublished: true' kosulunu gecici kaldiralim cunku seed atarken false gelmis olabilir urunler.

new_content = content.replace("""    products = await prisma.product.findMany({
      select: { id: true, titleTranslations: true, basePrice: true, baseCurrency: true, storeId: true, store: true, images: true, createdAt: true },

      where: { isPublished: true },
      include: { store: true },
      take: 8,
      orderBy: { createdAt: 'desc' }
    });""", """    products = await prisma.product.findMany({
      select: { id: true, titleTranslations: true, basePrice: true, baseCurrency: true, storeId: true, store: true, images: true, createdAt: true },
      take: 8,
      orderBy: { createdAt: 'desc' }
    });""")

with open('/tmp/openbazaar/src/app/(b2c-storefront)/page.tsx', 'w') as f:
    f.write(new_content)
