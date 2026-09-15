const RELAY_SECRET = PropertiesService.getScriptProperties().getProperty('RELAY_SECRET');
const ADMIN_EMAILS = "asha.suhasinim@gmail.com,ymvshiva1784@gmail.com";

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: "Asha Mental Wellness Review Email Relay is active."
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    if (!RELAY_SECRET) {
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Relay not configured" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var postData = JSON.parse(e.postData.contents);
    var providedSecret = postData.secret;
    
    if (providedSecret !== RELAY_SECRET) {
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Unauthorized" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var subject = postData.subject;
    var htmlBody = postData.htmlBody;
    var recipient = postData.to || ADMIN_EMAILS;
    
    if (!subject || !htmlBody) {
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Missing required fields" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: htmlBody
    });

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

    
    return ContentService.createTextOutput(JSON.stringify({ success: true, message: "Email sent via relay" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
