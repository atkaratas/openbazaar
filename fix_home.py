with open('/tmp/openbazaar/src/app/(b2c-storefront)/page.tsx', 'r') as f:
    content = f.read()

new_content = content.replace("products = await prisma.product.findMany({", """products = await prisma.product.findMany({
      select: { id: true, titleTranslations: true, basePrice: true, baseCurrency: true, storeId: true, store: true, images: true, createdAt: true },
""")

with open('/tmp/openbazaar/src/app/(b2c-storefront)/page.tsx', 'w') as f:
    f.write(new_content)
