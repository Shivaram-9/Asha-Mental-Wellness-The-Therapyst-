const fetch = require('node-fetch'); // wait, node 18+ has built in fetch
fetch("https://script.google.com/macros/s/AKfycbwHVz5zuvZrLtLKIHKAy0iHMJDAz1jhWKjG-npaLJ08_VBS8mZ2qXO9jdlwBJhTiuGL/exec", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: "WRONG_SECRET", subject: "Test", htmlBody: "Test" })
})
.then(res => res.json())
.then(data => console.log("NODE FETCH DATA:", data))
.catch(err => console.error("NODE FETCH ERROR:", err));
