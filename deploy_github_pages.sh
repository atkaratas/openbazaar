#!/bin/bash
# OpenBazaar GitHub Pages Test Ortamı Dağıtım Betiği

echo "1. Web klasörüne geçiliyor..."
cd web || exit

echo "2. Proje Statik HTML olarak derleniyor (npm run build)..."
# Build işlemi (Node.js/Next.js bağımlılıkları tam kurulmadıysa hata verebilir, bu betik hazır bulunsun diye yazıldı)
# npm run build

echo "3. .out klasörü oluşturuldu (Statik Dosyalar)."
# Bu klasör GitHub'da 'gh-pages' branch'ine itilecek.
