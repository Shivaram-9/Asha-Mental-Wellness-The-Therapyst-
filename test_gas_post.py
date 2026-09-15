import urllib.request
import json

url = "https://script.google.com/macros/s/AKfycbwHVz5zuvZrLtLKIHKAy0iHMJDAz1jhWKjG-npaLJ08_VBS8mZ2qXO9jdlwBJhTiuGL/exec"
data = json.dumps({"secret":"WRONG_SECRET","subject":"Test","htmlBody":"Test"}).encode("utf-8")
headers = {'Content-Type': 'application/json'}

try:
    req = urllib.request.Request(url, data=data, headers=headers)
    response = urllib.request.urlopen(req, timeout=15)
    print("STATUS:", response.status)
    print("BODY:", response.read().decode())
except Exception as e:
    print("EXCEPTION:", str(e))
