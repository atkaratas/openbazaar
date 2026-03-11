import re

with open('/tmp/openbazaar/src/app/(b2c-storefront)/products/page.tsx', 'r') as f:
    content = f.read()

# Try blogunu tamamen yokedelim, yerine sadece DB cagirisi kalsin ve eger bos gelirse dummy uretilsin. Catch return icine degil sadece konsola hata bassin.
# Sadece products = await kisimlarini try catch icine alacagiz, return disarida kalacak.

# Su an `return` kismimiz try blogunun icinde kaldi, bu yuzden eger catch calisirsa, asagidaki dummy verileri ureten if bloklari ve mappedProducts calismiyor, fonksyion null donuyor.

new_content = content.replace("""  } catch (error: any) {
    console.error("Database connection failed during render:", error);
    // Fallback to dummy data
  }
}""", "")

# Try-catch kapatmasını `if(categories.length === 0)` oncesine tasiyalim
new_content = new_content.replace("""    // YENI EKLENEN KOLONLARI SIL:
    products = products.map(p => ({...p, isColdChain: false}));""", """    // YENI EKLENEN KOLONLARI SIL:
    products = products.map(p => ({...p, isColdChain: false}));
  } catch (error: any) {
    console.error("Database connection failed during render:", error);
  }""")

with open('/tmp/openbazaar/src/app/(b2c-storefront)/products/page.tsx', 'w') as f:
    f.write(new_content)
    
print("Fixed Try Catch Scope in products")
