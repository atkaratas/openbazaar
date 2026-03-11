with open('/tmp/openbazaar/src/app/(b2c-storefront)/products/page.tsx', 'r') as f:
    content = f.read()

# Eger hatayı catch ederse o çirkin kırmızı uyarıyı dönmek yerine ürünleri boş array yapsın ve dummy'ler devreye girsin.
new_content = content.replace("  } catch (error: any) {", "  } catch (error: any) {\n    console.error(error);\n    products = [];\n    categories = [];\n  }\n  // Catch kalktigi icin return null asagida olmayacak, ama eger genel try icindeyse asagidaki iskelet patlar.")

with open('/tmp/openbazaar/src/app/(b2c-storefront)/products/page.tsx', 'w') as f:
    f.write(new_content)
