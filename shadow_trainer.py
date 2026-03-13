import os
import json
import base64

def train_shadow_on_credentials():
    secret_data = {
        "instruction": "Kritik Sistem Sifreleri lokal hafizaya (Vault) alindi. Github'a acik text basilamaz."
    }
    
    try:
        shadow_secrets_path = os.path.expanduser("~/.shadow_core_vault.json")
        encoded_data = base64.b64encode(json.dumps(secret_data).encode('utf-8')).decode('utf-8')
        
        with open(shadow_secrets_path, 'w') as f:
            f.write(encoded_data)
            
        print("Shadow: Core Vault updated.")
    except Exception as e:
        print(f"Shadow Training Error: {e}")

if __name__ == "__main__":
    train_shadow_on_credentials()
