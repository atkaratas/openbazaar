with open('/tmp/openbazaar/src/app/(b2c-storefront)/products/page.tsx', 'r') as f:
    content = f.read()

# Prisma'da 'select' ve 'include' ayni anda olamaz. Bu Products sayfasinda da hataya sebep oluyordur. (Ana sayfada cozmustuk)
# Ayrica urunler DB'de 'isPublished: false' olabilir (seed kaynakli).

new_content = content.replace("""        // Vercel DB'de yeni kolonlar yok, select ile sadece var olanlari cek
        select: { id: true, titleTranslations: true, basePrice: true, baseCurrency: true, storeId: true, store: true, category: true, images: true },

        where: { id: { in: productIds } },
        include: { store: true, category: true }""", """        // Vercel DB'de yeni kolonlar yok, select ile sadece var olanlari cek
        select: { id: true, titleTranslations: true, basePrice: true, baseCurrency: true, storeId: true, store: true, category: true, images: true },
        where: { id: { in: productIds } }""")

new_content = new_content.replace("""        // Vercel DB'de yeni kolonlar yok, select ile sadece var olanlari cek
        select: { id: true, titleTranslations: true, basePrice: true, baseCurrency: true, storeId: true, store: true, category: true, images: true },

        where: catSlug ? { category: { slug: catSlug }, isPublished: true } : { isPublished: true },
        include: { store: true, category: true },
        take: 70,
        orderBy: { createdAt: 'desc' }""", """        // Vercel DB'de yeni kolonlar yok, select ile sadece var olanlari cek
        select: { id: true, titleTranslations: true, basePrice: true, baseCurrency: true, storeId: true, store: true, category: true, images: true },
        where: catSlug ? { category: { slug: catSlug } } : {},
        take: 70,
        orderBy: { createdAt: 'desc' }""")

with open('/tmp/openbazaar/src/app/(b2c-storefront)/products/page.tsx', 'w') as f:
    f.write(new_content)
