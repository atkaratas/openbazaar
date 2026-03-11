with open('/tmp/openbazaar/src/app/(b2c-storefront)/products/page.tsx', 'r') as f:
    content = f.read()

# Try-catch icini basitlestirelim ki Vercel uzerinde yeni kolonlar acilmadigi icin cokmesin
new_content = content.replace("products = await prisma.$queryRawUnsafe(rawQuery, searchKeyword);", "products = [] // Vercel DB migration bekliyor").replace("products = await prisma.product.findMany({", """products = await prisma.product.findMany({
        // Vercel DB'de yeni kolonlar yok, select ile sadece var olanlari cek
        select: { id: true, titleTranslations: true, basePrice: true, baseCurrency: true, storeId: true, store: true, category: true, images: true },
""").replace("const categories = await prisma.category.findMany({ take: 20 })", """const categories = await prisma.category.findMany({ take: 20 })
    
    // YENI EKLENEN KOLONLARI SIL:
    products = products.map(p => ({...p, isColdChain: false}));""")

with open('/tmp/openbazaar/src/app/(b2c-storefront)/products/page.tsx', 'w') as f:
    f.write(new_content)
