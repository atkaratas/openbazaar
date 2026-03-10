#!/bin/bash
# Anlık Hata ve Düzeltme Loglarını Gösterme Betiği
echo "--- MONKEY (E2E TEST) HATA LOGLARI ---"
tail -n 10 monkey_e2e.log 2>/dev/null || echo "Henüz E2E hatası yakalanmadı."

echo -e "\n--- SHADOW (GELİŞTİRME/DÜZELTME) LOGLARI ---"
tail -n 10 dev_loop.log 2>/dev/null || echo "Geliştirme logu boş."

echo -e "\n--- SON 3 GITHUB COMMIT (DÜZELTMELER) ---"
git log -n 3 --oneline
