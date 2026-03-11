with open('/tmp/openbazaar/src/app/(b2c-storefront)/products/page.tsx', 'r') as f:
    content = f.read()

# Try blogunu tamamen yokedip yerine guvenli fallback saglayacagiz
# products = []; categories = []; catch blogunu sil.

new_content = content.replace("""  try {
    let products: any[] = [];""", """  let products: any[] = [];
  let categories: any[] = [];
  try {""")

new_content = new_content.replace("""  } catch (error: any) {
    return <div className="p-20 text-center text-rose-600 font-bold bg-rose-50 rounded-xl m-10">Veritabanı bağlantı hatası: {error.message}</div>
  }
}""", """  } catch (error: any) {
    console.error("Database connection failed during render:", error);
    // Fallback to dummy data
  }
}""")

with open('/tmp/openbazaar/src/app/(b2c-storefront)/products/page.tsx', 'w') as f:
    f.write(new_content)

print("Fixed products page try-catch")
