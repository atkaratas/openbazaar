import os
import re

for root, dirs, files in os.walk("src"):
    for file in files:
        if file.endswith(".tsx"):
            filepath = os.path.join(root, file)
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
            
            # Use 'use client' if we are adding onClick to buttons
            if '<button' in content and 'onClick=' not in content and 'use client' not in content:
                content = "'use client'\n\n" + content

            # Replace dead buttons with a mock alert
            # Find all <button ...> that do NOT have onClick or type="submit"
            
            def repl(match):
                btn = match.group(0)
                if 'onClick' not in btn and 'type="submit"' not in btn:
                    # Add onClick
                    return btn.replace('<button', '<button onClick={() => alert("Monkey Test: Bu butonun arkasındaki API / Fonksiyon şu an geliştirme aşamasındadır.")}')
                return btn

            new_content = re.sub(r'<button[^>]*>', repl, content)
            
            if content != new_content:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(new_content)

print("🐒 Monkey tüm kırık butonları 'Pop-up Alert' (Uyarı) ile yamadı.")
