import re

with open("google_apps_script/Code.gs", "r", encoding="utf-8") as f:
    code = f.read()

replacement = """
    if (postData.createCalendarEvent) {
      try {
        var evt = postData.createCalendarEvent;
        var startTime = new Date(evt.startTime);
        var endTime = new Date(evt.endTime);
        CalendarApp.getDefaultCalendar().createEvent(evt.title, startTime, endTime, {
          guests: evt.guestEmail,
          sendInvites: true
        });
      } catch (calError) {
        // Log but do not fail email
        console.error("Calendar creation failed: " + calError.toString());
      }
    }
"""

code = code.replace(
    'MailApp.sendEmail({\n      to: recipient,\n      subject: subject,\n      htmlBody: htmlBody\n    });',
    'MailApp.sendEmail({\n      to: recipient,\n      subject: subject,\n      htmlBody: htmlBody\n    });\n' + replacement
)

with open("google_apps_script/Code.gs", "w", encoding="utf-8") as f:
    f.write(code)

print("Updated Code.gs with Google Calendar integration.")
