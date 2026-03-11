with open('/tmp/openbazaar/src/app/(b2c-storefront)/page.tsx', 'r') as f:
    content = f.read()

# Eger hatayı fırlatıyorsa, bu try/catch disinda baska bir sorgu patliyor veya map esnasinda bir seyler yasanıyor.
# Ancak asıl sorun "Veritabanı bağlantı hatası..." yazısını dönmesi. Bu yazı "catch (error: any)" bloğunun return kısmından geliyor.

# products/page.tsx dosyasini kontrol edelim
