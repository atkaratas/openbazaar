with open('/tmp/openbazaar/src/components/layout/Footer.tsx', 'r') as f:
    content = f.read()

new_content = content.replace('href="/register/seller"', 'href="/seller/register"')

with open('/tmp/openbazaar/src/components/layout/Footer.tsx', 'w') as f:
    f.write(new_content)

with open('/tmp/openbazaar/src/app/(b2c-storefront)/page.tsx', 'r') as f:
    content2 = f.read()

new_content2 = content2.replace('href="/register/seller"', 'href="/seller/register"')

with open('/tmp/openbazaar/src/app/(b2c-storefront)/page.tsx', 'w') as f:
    f.write(new_content2)
    
print("Fixed seller registration links")
