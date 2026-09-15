import requests

try:
    response = requests.post("http://localhost:3000/api/book/action", data={
        "id": "60d5ecb8b392d7001f3e7a00", 
        "token": "abc", 
        "action": "approve"
    })
    print(response.status_code)
    print(response.text)
except Exception as e:
    print(f"Error: {e}")
