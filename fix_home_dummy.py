with open('/tmp/openbazaar/src/app/(b2c-storefront)/page.tsx', 'r') as f:
    content = f.read()

# Eger products boş gelirse, frontend'de null image yuzunden patliyor olabilir. ProductCard yerine dummy eklemis agent ama map'te sikinti olabilir. 
# map: image: p.images?.[0] || '...' yapiyor. Dummy verilerde images yok, direk store id vs de yok. map hata verebilir.

# map icini biraz daha guvenli yapalim.
new_content = content.replace("image: p.images?.[0] || 'https://malatyapazaripalanci.com.tr/productimages/102941/original/antep-fistigi-kavrulmus-250-gr-0489.jpg',", "image: (p.images && p.images.length > 0) ? p.images[0] : 'https://malatyapazaripalanci.com.tr/productimages/102941/original/antep-fistigi-kavrulmus-250-gr-0489.jpg',")

with open('/tmp/openbazaar/src/app/(b2c-storefront)/page.tsx', 'w') as f:
    f.write(new_content)

print("Home page dummy image map fixed")
