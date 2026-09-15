import urllib.request
import json

url = "https://asha-mental-wellness-the-therapyst.onrender.com/api/reviews"
data = json.dumps({"name":"Diagnose","email":"diagnose@test.com","rating":5,"message":"Diagnose"}).encode("utf-8")
headers = {'Content-Type': 'application/json'}

try:
    req = urllib.request.Request(url, data=data, headers=headers)
    response = urllib.request.urlopen(req, timeout=10)
    print("STATUS:", response.status)
    print("BODY:", response.read().decode())
except urllib.error.HTTPError as e:
    print("HTTP ERROR:", e.code)
    print("BODY:", e.read().decode())
except Exception as e:
    print("EXCEPTION:", str(e))
