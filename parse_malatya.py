import os
import subprocess

# Malatya Pazarı kategorilerini veritabanı seed koduna veya ana sayfa UI koduna enjekte edelim
# src/app/(storefront)/page.tsx dosyasını güncelleyelim

file_path = "src/app/(storefront)/page.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Eski kategorileri yenileriyle değiştir
old_categories = """[
            { name: 'Zeytinyağı & Soslar', icon: '🫒', link: '/product/ornek-urun' },
            { name: 'Kuruyemiş & Atıştırmalık', icon: '🌰', link: '/product/ornek-urun' },
            { name: 'Geleneksel Tatlılar', icon: '🍯', link: '/product/ornek-urun' },
            { name: 'Baharat & Otlar', icon: '🌶️', link: '/product/ornek-urun' }
          ]"""

new_categories = """[
            { name: 'Premium Kuruyemiş', icon: '🌰', link: '/category/kuruyemis' },
            { name: 'Kuru Meyve & Kayısı', icon: '🍑', link: '/category/kurumeyve' },
            { name: 'Geleneksel Lokum', icon: '🍬', link: '/category/lokum' },
            { name: 'Ramazan Özel', icon: '🌙', link: '/category/ramazan-ozel' },
            { name: 'Antep Fıstığı', icon: '🥜', link: '/category/antep-fistigi' },
            { name: 'Ceviz & Badem', icon: '🥜', link: '/category/ceviz' },
            { name: 'Yöresel Kahveler', icon: '☕', link: '/category/kahve' },
            { name: 'Baharat & Salça', icon: '🌶️', link: '/category/baharat' }
          ]"""

if old_categories in content:
    content = content.replace(old_categories, new_categories)
    # Grid yapısını 8 kategoriye göre düzelt
    content = content.replace("grid-cols-2 md:grid-cols-4", "grid-cols-2 md:grid-cols-4 gap-4")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

subprocess.run(["git", "add", file_path])
subprocess.run(["git", "commit", "-m", "feat(ui): adopt Malatya Pazari category structures and aesthetics"])
subprocess.run(["git", "push", "origin", "main"])
