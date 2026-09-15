import urllib.request
import json
import time

url = "https://asha-mental-wellness-the-therapyst.onrender.com/api/reviews"
data = json.dumps({"name":"Test","email":"test@test.com","rating":5,"message":"Test"}).encode("utf-8")
headers = {'Content-Type': 'application/json'}

start = time.time()
try:
    req = urllib.request.Request(url, data=data, headers=headers)
    response = urllib.request.urlopen(req, timeout=60)
    print("STATUS:", response.status)
    print("BODY:", response.read().decode())
except Exception as e:
    print("EXCEPTION:", str(e))
print(f"Time taken: {time.time() - start:.2f} seconds")
