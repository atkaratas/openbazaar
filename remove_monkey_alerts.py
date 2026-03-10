import os
import re

print("🛠️ Kalan 'Monkey Test' uyarıları temizleniyor...")

for root, dirs, files in os.walk("src"):
    for file in files:
        if file.endswith(".tsx"):
            filepath = os.path.join(root, file)
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()

            # "Monkey Test" kelimesi geçen onClick'leri temizle (Sadece Alert'i kaldır, onClick'i tamamen uçurma veya alerti değiştir)
            if 'Monkey Test' in content:
                # Regex ile onClick={() => alert("Monkey Test: ...")} kısımlarını bulup kaldıralım
                # Daha güvenli olması için sadece alert(...) içini değiştirelim ki TS patlamasın
                content = re.sub(r'onClick=\{\(\) => alert\("Monkey Test[^"]+"\)\}', '', content)
                
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"🧹 Temizlendi: {filepath}")

print("✅ Bütün Maymun pop-up'ları sistemden söküldü.")
