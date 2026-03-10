#!/bin/bash
# 15 Dakikada Bir Rapor Atan Script (15 mins = 900 seconds)

# Telegram Bot Token ve Chat ID (Shadow botuna atacağız, o da iletecek veya doğrudan Warlock'un API'si olmadığı için OpenClaw komutu gibi log bırakacağız). 
# Kullanıcı Telegram'da olduğu için, curl ile Telegram API'sine direkt mesaj atmak en sağlamıdır.
# Şifreler ve Tokenlar shadow_bot.py içinden biliniyor:
TOKEN="8592266746:AAFS4hdNN_fwtWkc5olS_mrVBIFfzynBe2M"
CHAT_ID="5612386936"

# 2 Saat = 120 dakika = 8 adet 15 dakikalık periyot
for i in {1..8}
do
    sleep 900 # 15 dakika bekle
    
    # Rapor verilerini topla
    COMMIT_COUNT=$(git log --since="15 minutes ago" --oneline | wc -l | tr -d ' ')
    ERROR_COUNT=$(grep -c "Hata" monkey_e2e.log 2>/dev/null || echo "0")
    DEV_LOG_TAIL=$(tail -n 3 dev_loop.log 2>/dev/null || echo "Geliştirme devam ediyor.")
    
    MESSAGE="📊 *Warlock - Otonom Geliştirme Raporu ($i/8)*%0A%0A"
    MESSAGE+="Geçen 15 dakikada yapılanlar:%0A"
    MESSAGE+="🔹 Github'a atılan yeni Commit sayısı: $COMMIT_COUNT%0A"
    MESSAGE+="🔹 Chaos Monkey'nin bulduğu hata sayısı: $ERROR_COUNT%0A%0A"
    MESSAGE+="*Son İşlemler:*%0A\`$DEV_LOG_TAIL\`%0A%0A"
    MESSAGE+="Sistem kendi kendini kodlamaya devam ediyor. ⚛️"
    
    # Telegram'a gönder
    curl -s -X POST "https://api.telegram.org/bot$TOKEN/sendMessage" \
        -d chat_id="$CHAT_ID" \
        -d text="$MESSAGE" \
        -d parse_mode="Markdown" > /dev/null
done
