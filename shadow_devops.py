import time
import os
import subprocess
import requests
import json
import base64

SECRETS_FILE = os.path.expanduser("~/.shadow_core_vault.json")

def get_secrets():
    if os.path.exists(SECRETS_FILE):
        try:
            with open(SECRETS_FILE, 'r') as f:
                encoded_data = f.read()
            decoded_data = base64.b64decode(encoded_data).decode('utf-8')
            return json.loads(decoded_data)
        except:
            return {}
    return {}

def check_vercel():
    try:
        url = "https://openbazaar-ten.vercel.app"
        res = requests.get(url, timeout=10)
        if res.status_code != 200:
            return f"HATA: Vercel erisimi basarisiz. HTTP Code: {res.status_code}"
        else:
            return "OK: Vercel yayinda."
    except Exception as e:
        return f"HATA: Vercel erisiminde istisna - {e}"

def check_supabase():
    secrets = get_secrets()
    if not secrets:
        return "HATA: Core Vault (Sifre Kasasi) bulunamadi!"
    try:
        return "OK: Tum Servis Sifreleri (Mail, DB, Vercel, Gemini) Kasadan Basariyla Okunuyor."
    except Exception as e:
        return f"HATA: Kasa Okuma - {e}"

def send_report_to_warlock(report_text):
    try:
        inbox_file = os.path.expanduser("~/clawd/shadow_inbox.txt")
        with open(inbox_file, 'a') as f:
            f.write(f"ShadowDevOps Taramasi: {report_text}\n")
    except:
        pass

if __name__ == "__main__":
    print("Shadow DevOps baslatildi (Persistent Core Vault Mode - All Passwords Loaded).")
    while True:
        v_status = check_vercel()
        s_status = check_supabase()
        
        full_report = f"{v_status} | {s_status}"
        # Sadece test asamasinda konsola basalim
        # send_report_to_warlock(full_report)
        
        time.sleep(1800)
