import requests

url = "http://localhost:4000/search"
params = {
  "q": "Türkiye'nin başkenti neresidir?",
  "format": "json"
}

try:
    res = requests.get(url, params=params)
    data = res.json()
    print("SearXNG Arama Başarılı:", len(data.get("results", [])))
    print(data.get("results", [])[0].get("title"))
    print(data.get("results", [])[0].get("url"))
except Exception as e:
    print(e)
