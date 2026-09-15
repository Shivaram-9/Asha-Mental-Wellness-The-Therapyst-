import re

with open("google_apps_script/Code.gs", "r", encoding="utf-8") as f:
    code = f.read()

code = code.replace(
    'var subject = postData.subject;\n    var htmlBody = postData.htmlBody;',
    'var subject = postData.subject;\n    var htmlBody = postData.htmlBody;\n    var recipient = postData.to || ADMIN_EMAILS;'
)
code = code.replace(
    'to: ADMIN_EMAILS,',
    'to: recipient,'
)

with open("google_apps_script/Code.gs", "w", encoding="utf-8") as f:
    f.write(code)

print("Updated Code.gs to support dynamic recipients.")
