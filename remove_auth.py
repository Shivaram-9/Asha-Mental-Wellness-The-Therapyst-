with open('google_apps_script/Code.gs', 'r', encoding='utf-8') as f:
    js = f.read()

helper = """
function authorizeRelay() {
  MailApp.getRemainingDailyQuota();
  return 'Gmail authorization granted.';
}
"""

if helper in js:
    js = js.replace(helper + "\n", "")
    js = js.replace(helper, "")
    with open('google_apps_script/Code.gs', 'w', encoding='utf-8') as f:
        f.write(js)
    print("Removed authorizeRelay helper")
else:
    print("authorizeRelay not found")
