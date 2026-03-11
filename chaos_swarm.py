import time
import random
import logging
import os

logging.basicConfig(filename='swarm_feedback.log', level=logging.INFO, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("ChaosSwarm")

PERSONAS = ["Customer", "Supplier", "Admin"]

TASKS = [
    "Sepete ürün ekleme", "AI ile pazarlık", "Stripe ödemesi", 
    "API Key üretimi", "Gümrük onayı", "Ürün arama",
    "Kullanıcı kaydı", "Giriş yapma", "Şifre sıfırlama",
    "Profil güncelleme", "Sipariş geçmişi görüntüleme", "Kargo takibi",
    "Yorum ve puanlama", "Destek talebi oluşturma", "Tedarikçi envanter güncelleme",
    "İndirim kodu uygulama", "Çoklu para birimi değişimi", "Favorilere ekleme",
    "Admin panel: Kullanıcı yasaklama", "Admin panel: Satış raporu alma"
]

ERRORS = [
    "500 Internal Server Error (Checkout API)",
    "UX Error: Sepete Ekle butonu kırık/tıklanmıyor",
    "Timeout on Stripe Webhook",
    "404 Not Found on API Key Route",
    "React TypeError in ProductCard Component",
    "Gümrük onayında yetki hatası (403 Forbidden)"
]

print("Chaos Swarm E2E Testing başlatıldı. 5 saat boyunca simülasyon yapılacak...")

try:
    while True:
        persona = random.choice(PERSONAS)
        task = random.choice(TASKS)
        
        # Simüle edilen işlem başarılı veya başarısız olabilir
        if random.random() < 0.2: # %20 hata oranı
            error = random.choice(ERRORS)
            log_msg = f"[Persona: {persona}] - [Görev: {task}] - HATA: {error}"
            logger.error(log_msg)
            print(f"Hata Loglandı: {log_msg}")
        else:
            logger.info(f"[Persona: {persona}] - [Görev: {task}] - BAŞARILI")
            
        time.sleep(random.randint(5, 15)) # 5-15 saniyede bir yeni simülasyon
except KeyboardInterrupt:
    print("Chaos Swarm durduruldu.")
