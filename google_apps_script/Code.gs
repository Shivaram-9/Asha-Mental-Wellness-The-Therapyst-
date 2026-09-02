function doGet(e) {
  return ContentService.createTextOutput("Asha Mental Wellness Review Email Relay is active.");
}

function doPost(e) {
  try {
    var postData = JSON.parse(e.postData.contents);
    var providedSecret = postData.secret;
    var expectedSecret = PropertiesService.getScriptProperties().getProperty('GOOGLE_RELAY_SECRET');
    
    if (!expectedSecret) {
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Relay not configured" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    if (providedSecret !== expectedSecret) {
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Unauthorized" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var to = postData.to;
    var subject = postData.subject;
    var htmlBody = postData.htmlBody;
    
    if (!to || !subject || !htmlBody) {
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Missing required fields" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var toAddresses = Array.isArray(to) ? to.join(',') : to;
    
    MailApp.sendEmail({
      to: toAddresses,
      subject: subject,
      htmlBody: htmlBody
    });
    
    return ContentService.createTextOutput(JSON.stringify({ success: true, message: "Email sent via relay" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
