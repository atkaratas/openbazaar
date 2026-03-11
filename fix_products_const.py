with open('/tmp/openbazaar/src/app/(b2c-storefront)/products/page.tsx', 'r') as f:
    content = f.read()

new_content = content.replace("const categories = await prisma.category.findMany({ take: 20 })", "let categories = await prisma.category.findMany({ take: 20 })")

with open('/tmp/openbazaar/src/app/(b2c-storefront)/products/page.tsx', 'w') as f:
    f.write(new_content)

print("Fixed products const categories assignment issue")
