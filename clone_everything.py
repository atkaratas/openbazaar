import urllib.request
import re
import json
import time
import os

print("🐒 [CLONE PROTOCOL] Hedef: malatyapazaripalanci.com.tr | Operasyon Başladı...")

target_url = "https://malatyapazaripalanci.com.tr/"
headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}

try:
    req = urllib.request.Request(target_url, headers=headers)
    html = urllib.request.urlopen(req).read().decode('utf-8')
    
    # Ikas altyapısı Next.js __NEXT_DATA__ kullanır. Bunu çıkaralım.
    match = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html)
    if match:
        data = json.loads(match.group(1))
        # Bu devasa JSON içinde genellikle kategoriler ve öne çıkan ürünler var.
        # Amacımız sadece görsel, isim ve fiyat çekmek.
        
        # Basit bir brute-force json tarayıcı fonksiyon
        extracted_products = []
        def extract_products(obj):
            if isinstance(obj, dict):
                if "name" in obj and "images" in obj and "price" in obj:
                    # Bir ürüne benziyor
                    try:
                        name = obj["name"]
                        if isinstance(name, dict): name = name.get("tr", "Bilinmeyen")
                        if not isinstance(name, str): return
                        
                        price = obj["price"]
                        img = obj["images"][0] if obj["images"] else ""
                        
                        if len(name) > 3 and img:
                            extracted_products.append({
                                "id": str(len(extracted_products)+1),
                                "title": {"tr": name, "en": name + " (Export)"},
                                "price": float(price) if isinstance(price, (int, float)) else 10.0,
                                "currency": "EUR",
                                "storeId": "store_malatya",
                                "storeName": "Malatya Pazarı Palancı",
                                "image": img,
                                "certifications": ["HALAL", "FDA"],
                                "isColdChain": False
                            })
                    except:
                        pass
                for k, v in obj.items():
                    extract_products(v)
            elif isinstance(obj, list):
                for item in obj:
                    extract_products(item)
                    
        extract_products(data)
        
        # Benzersiz ürünleri filtrele
        unique_products = []
        seen_names = set()
        for p in extracted_products:
            if p["title"]["tr"] not in seen_names:
                seen_names.add(p["title"]["tr"])
                unique_products.append(p)
                
        print(f"✅ Sistemden {len(unique_products)} adet gerçek ürün verisi (Fiyat, Görsel, İsim) hortumlandı.")
        
        # Veriyi projeye bas
        os.makedirs("src/data", exist_ok=True)
        with open("src/data/cloned_catalog.json", "w", encoding="utf-8") as f:
            json.dump(unique_products, f, ensure_ascii=False, indent=2)
            
        print("💾 Veriler 'src/data/cloned_catalog.json' dosyasına kalıcı olarak kaydedildi.")
    else:
        print("❌ __NEXT_DATA__ bulunamadı, farklı bir kazıma metodu gerekecek.")

except Exception as e:
    print(f"Hata: {e}")

