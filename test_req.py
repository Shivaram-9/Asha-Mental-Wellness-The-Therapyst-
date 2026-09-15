import urllib.request
import json

url = "https://asha-mental-wellness-the-therapyst.onrender.com/api/reviews"
data = json.dumps({"name":"Test","email":"test@test.com","rating":5,"message":"Test"}).encode("utf-8")
headers = {'Content-Type': 'application/json'}

try:
    req = urllib.request.Request(url, data=data, headers=headers)
    response = urllib.request.urlopen(req, timeout=15)
    print("STATUS:", response.status)
    print("BODY:", response.read().decode())
except urllib.error.URLError as e:
    print("ERROR:", str(e))
    if hasattr(e, 'read'):
        print("BODY:", e.read().decode())
except Exception as e:
    print("EXCEPTION:", str(e))
