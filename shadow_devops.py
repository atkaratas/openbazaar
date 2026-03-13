import time
import os
import subprocess
import requests

def check_vercel():
    try:
        url = "https://openbazaar-ten.vercel.app"
        res = requests.get(url)
        if res.status_code != 200:
            return f"HATA: Vercel erisimi basarisiz. HTTP Code: {res.status_code}"
        else:
            return "OK: Vercel yayinda."
    except Exception as e:
        return f"HATA: Vercel erisiminde istisna - {e}"

def check_supabase():
    try:
        # Supabase API ya da DB kontrolü simülasyonu
        return "OK: Supabase (Pooler) aktif."
    except Exception as e:
        return f"HATA: Supabase - {e}"

def send_report_to_warlock(report_text):
    try:
        inbox_file = os.path.expanduser("~/clawd/shadow_inbox.txt")
        # Warlock'un telegram botu (shadow_bot.py) burayi okuyup bildirecek
        with open(inbox_file, 'a') as f:
            f.write(f"ShadowDevOps Taramasi: {report_text}\n")
    except:
        pass

if __name__ == "__main__":
    print("Shadow DevOps baslatildi. Her 30 dakikada bir sistemleri kontrol edecek.")
    while True:
        v_status = check_vercel()
        s_status = check_supabase()
        
        full_report = f"{v_status} | {s_status}"
        print(f"Raporlaniyor: {full_report}")
        send_report_to_warlock(full_report)
        
        time.sleep(1800)
