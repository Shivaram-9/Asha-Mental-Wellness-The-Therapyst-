import fs from 'fs';
fetch('https://asha-mental-wellness-the-therapist.onrender.com/').then(res=>res.text()).then(t=> { fs.writeFileSync('live_index.html', t); console.log('saved'); }).catch(console.error);
