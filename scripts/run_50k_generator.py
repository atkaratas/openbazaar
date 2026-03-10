import json
import random
import os

# Ana Kategoriler ve Alt Varyasyonlar
categories = ["Premium Kuruyemiş", "Gün Kurusu Meyve", "Zeytinyağı & Sos", "Geleneksel Lokum", "Yöresel Kahve", "Baharat", "Soğuk Zincir Süt", "Kuru Bakliyat"]
prefixes_tr = ["Organik", "Doğal", "Kavrulmuş", "Tuzlu", "Çifte Kavrulmuş", "Erken Hasat", "Gurme", "Taş Değirmen", "Glutensiz", "Vegan"]
prefixes_en = ["Organic", "Natural", "Roasted", "Salted", "Double Roasted", "Early Harvest", "Gourmet", "Stone Milled", "Gluten-Free", "Vegan"]
bases_tr = ["Antep Fıstığı", "Kayısı", "Zeytinyağı", "Lokum", "Türk Kahvesi", "Pul Biber", "Tulum Peyniri", "Nohut", "Fındık İçi", "Ceviz"]
bases_en = ["Pistachio", "Apricot", "Olive Oil", "Turkish Delight", "Turkish Coffee", "Red Pepper Flakes", "Tulum Cheese", "Chickpeas", "Hazelnut", "Walnut"]
suffixes = ["500g", "1KG", "2.5KG", "5KG", "10KG (Toptan)"]

products = []

print("⚙️ Motor çalıştı. 50.000 Gıda İhracat Ürünü algoritma ile türetiliyor...")

for i in range(1, 50001):
    base_idx = random.randint(0, len(bases_tr)-1)
    prefix_idx = random.randint(0, len(prefixes_tr)-1)
    suffix = random.choice(suffixes)
    
    title_tr = f"{prefixes_tr[prefix_idx]} {bases_tr[base_idx]} {suffix}"
    title_en = f"{prefixes_en[prefix_idx]} {bases_en[base_idx]} {suffix}"
    
    price = round(random.uniform(5.0, 150.0), 2)
    
    products.append({
        "id": f"PRD-50K-{i}",
        "titleTranslations": { "tr": title_tr, "en": title_en },
        "descriptionTranslations": { "tr": f"Türkiye'den ihraç edilen 1. sınıf {title_tr}.", "en": f"First class exported {title_en} from Turkey." },
        "basePrice": price,
        "baseCurrency": "EUR",
        "stock": random.randint(0, 10000),
        "categoryId": random.choice(categories), # Mock ID
        "isColdChain": "Soğuk Zincir" in random.choice(categories) or "Peynir" in title_tr,
        "certifications": random.sample(["HALAL", "FDA", "ORGANIC", "ISO22000"], k=random.randint(1,3)),
        "image": "https://malatyapazaripalanci.com.tr/productimages/102941/original/antep-fistigi-kavrulmus-250-gr-0489.jpg" # Placeholder mock image
    })

os.makedirs("data", exist_ok=True)
with open("data/products_50k.json", "w", encoding="utf-8") as f:
    json.dump(products, f, ensure_ascii=False)

print("✅ 50.000 ürünlük 'data/products_50k.json' dosyası (22MB) başarıyla oluşturuldu.")
