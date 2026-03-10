import os
import re

print("🐒 [Chaos Monkey] Sisteme sızıldı. Kodlar taranıyor...")

dead_buttons = 0
dead_links = 0
total_files = 0

for root, dirs, files in os.walk("src"):
    for file in files:
        if file.endswith(".tsx"):
            total_files += 1
            filepath = os.path.join(root, file)
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
                
                # Find buttons without onClick or type="submit"
                buttons = re.findall(r'<button[^>]*>', content)
                for btn in buttons:
                    if 'onClick' not in btn and 'type="submit"' not in btn:
                        print(f"❌ Kırık Buton Bulundu -> {filepath}: {btn}")
                        dead_buttons += 1
                
                # Find links with href="#" or missing href
                links = re.findall(r'<Link[^>]*>', content)
                for link in links:
                    if 'href="#"' in link or 'href=""' in link or 'href' not in link:
                        print(f"❌ Kırık Link Bulundu -> {filepath}: {link}")
                        dead_links += 1
                        
print(f"\n🎯 [Monkey Raporu]: {total_files} dosya tarandı.")
print(f"Ölü Buton (Tıklanmayan): {dead_buttons}")
print(f"Ölü Link (Boşluğa Giden): {dead_links}")
