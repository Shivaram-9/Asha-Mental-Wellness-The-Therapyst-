import urllib.request

url = "https://script.google.com/macros/s/AKfycbwHVz5zuvZrLtLKIHKAy0iHMJDAz1jhWKjG-npaLJ08_VBS8mZ2qXO9jdlwBJhTiuGL/exec"
try:
    req = urllib.request.Request(url)
    response = urllib.request.urlopen(req, timeout=10)
    print("STATUS:", response.status)
    print("BODY:", response.read().decode())
except Exception as e:
    print("EXCEPTION:", str(e))
