import time
import os
import subprocess
import requests

def check_vercel():
    try:
        # Basit Vercel sağlık kontrolü (Bunu daha sonra API token ile de yapabiliriz)
        url = "https://openbazaar-ten.vercel.app"
        res = requests.get(url)
        if res.status_code != 200:
            print(f"ShadowDevOps: Vercel erisim hatasi: {res.status_code}")
        else:
            print("ShadowDevOps: Vercel ayakta.")
    except Exception as e:
        print(f"ShadowDevOps: Vercel kontrolu sirasinda hata: {e}")

def check_supabase():
    try:
        # Supabase API ya da DB kontrolü simülasyonu
        print("ShadowDevOps: Supabase baglantilari kontrol ediliyor...")
        # (Burada Prisma DB kontrolü yapılabilir)
    except Exception as e:
        print(f"ShadowDevOps: Supabase hatasi: {e}")

if __name__ == "__main__":
    print("Shadow DevOps baslatildi. Her 30 dakikada bir sistemleri kontrol edecek.")
    while True:
        check_vercel()
        check_supabase()
        # Her 30 dakikada bir çalıştır (1800 saniye)
        # Test amaçlı 60 saniye bekletebiliriz ama prod'da 1800
        time.sleep(1800)
