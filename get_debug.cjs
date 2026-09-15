const https = require('https');
https.get('https://asha-mental-wellness-the-therapyst.onrender.com/api/debug/reviews', (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => { console.log(JSON.stringify(JSON.parse(data), null, 2)); });
}).on("error", (err) => { console.log("Error: " + err.message); });
