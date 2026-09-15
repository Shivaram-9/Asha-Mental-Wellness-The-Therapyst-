with open('google_apps_script/Code.gs', 'r', encoding='utf-8') as f:
    js = f.read()

helper = """
function authorizeRelay() {
  MailApp.getRemainingDailyQuota();
  return 'Gmail authorization granted.';
}
"""

if "authorizeRelay" not in js:
    with open('google_apps_script/Code.gs', 'w', encoding='utf-8') as f:
        f.write(helper + "\n" + js)
    print("Added authorizeRelay helper")
else:
    print("authorizeRelay already exists")
