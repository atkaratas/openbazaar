import time
import requests
import json
from datetime import datetime

LOG_FILE = "monkey_e2e.log"
BASE_URL = "http://localhost:3000" # Local test URL
# If testing Vercel directly, change to https://openbazaar-ten.vercel.app

def log_event(action, status, detail=""):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOG_FILE, "a") as f:
        f.write(f"[{timestamp}] [MONKEY] {action} -> STATUS: {status} | {detail}\n")

# Mock initial log
log_event("E2E_SIMULATION_START", "INFO", "Form doldurma, onay ve dosya yükleme simülasyonu başlatıldı.")
