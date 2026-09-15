import urllib.request
try:
    response = urllib.request.urlopen("https://asha-mental-wellness-the-therapyst.onrender.com/api/reviews", timeout=5)
    print("GET /api/reviews STATUS:", response.status)
    print("BODY:", response.read().decode())
except Exception as e:
    print("EXCEPTION:", str(e))
