import requests
import json
import sys

url = "http://localhost:3006/api/chat"
query = sys.argv[1] if len(sys.argv) > 1 else "Türkiye'nin başkenti neresidir?"

payload = {
  "message": {
    "messageId": "msg-12345",
    "chatId": "chat-12345",
    "content": query
  },
  "optimizationMode": "speed",
  "chatModel": {
    "providerId": "f752058a-075b-4544-8912-172bdf0c894c",
    "key": "qwen2.5-coder:7b"
  },
  "embeddingModel": {
    "providerId": "f752058a-075b-4544-8912-172bdf0c894c",
    "key": "nomic-embed-text:latest"
  },
  "history": [],
  "sources": [],
  "files": []
}

res = requests.post(url, json=payload, stream=True)
full_text = ""

for line in res.iter_lines():
    if line:
        decoded_line = line.decode('utf-8')
        if decoded_line.startswith('data: '):
            data = json.loads(decoded_line[6:])
            if data.get('type') == 'message':
                full_text += data.get('data', '')

print("=== YANIT ===")
print(full_text)
