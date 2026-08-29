const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

const replacements = {
    'dYZ" Education': '?? Education',
    'dY"o Certifications': '?? Certifications',
    '-? Areas': '?? Areas',
    'dY". Book': '?? Book',
    'o" In-person': '? In-person',
    'o" Online': '? Online',
    'o" Phone': '? Phone',
    "dY' General": '?? General',
    'dY"  Email': '?? Email',
    'dY"? Location': '?? Location',
    '? Response': '?? Response',
    "dY'- Individual": '?? Individual',
    'dY"??dYc??dY ??dY Family': '??????????? Family',
    "dY' Corporate": '?? Corporate',
    'dYZ_ Life': '?? Life',
    'dYO Trauma': '??? Trauma',
    'dY"s Student': '?? Student',
    '?': '•',
    'o. FIXED': '? FIXED'
};

for (const [k, v] of Object.entries(replacements)) {
    js = js.split(k).join(v);
}

fs.writeFileSync('src/main.js', js, 'utf8');
