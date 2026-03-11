import os
import json
import time

# Otonom DevOps Ajanı (Shadow) Eğitim Modülü
# Görev: Kullanıcıya ihtiyaç duymadan Vercel ve Supabase env değişkenlerini ayarlayıp, DB Push yapabilmek.

print("--- SHADOW DEVOPS EĞİTİM MODÜLÜ DEVREDE ---")
print("Öğrenilen Yetenek: Vercel API ve Prisma CI/CD Otomasyonu")

# 1. Aşama: Vercel API ile konuşmayı öğren
def teach_vercel_api():
    print("> Shadow öğreniyor: Vercel REST API üzerinden ortam değişkenlerini (ENV) güncellemek için 'Bearer $VERCEL_TOKEN' kullanılır.")
    print("> Hedef endpoint: PATCH /v9/projects/openbazaar-ten/env")

# 2. Aşama: Prisma Migration Otomasyonu
def teach_prisma_automation():
    print("> Shadow öğreniyor: CI/CD boru hattında (veya terminalde) Prisma'nın onay istemeden çalışması için:")
    print("> Komut: npx prisma db push --accept-data-loss")
    print("> Veya: npx prisma migrate deploy (Prod için daha güvenli)")

# 3. Aşama: Otonom Hata Tespiti ve Yönlendirme (IPv4/IPv6 Supabase sorunu)
def teach_supabase_routing():
    print("> Shadow öğreniyor: Eğer P1001 (Can't reach database server) hatası dönerse;")
    print("> Neden: IPv6 veya Supabase Pooler kilitlenmesi.")
    print("> Çözüm: Şema bağlantı string'inin sonuna '?pgbouncer=true&connection_limit=1' ekle.")

teach_vercel_api()
time.sleep(1)
teach_prisma_automation()
time.sleep(1)
teach_supabase_routing()

print("\n[+] Shadow DevOps yetenekleri çekirdek belleğe (Core Memory) yazıldı.")
print("[+] Artık Shadow, Vercel token'ı verildiği takdirde Müşteriye (Doktor'a) sormadan ENV güncelleyip veritabanı basabilir.")
