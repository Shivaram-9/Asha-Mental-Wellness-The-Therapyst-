import assert from 'assert';
import http from 'http';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

console.log('=== VERIFYING MOBILE CONTACT CARD HIDDEN & NO PART-TIME REFERENCES ===\n');

// 1. Static checks on source files & build output
console.log('1. Static source & build output verification...');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const mainJs = fs.readFileSync('src/main.js', 'utf8');
const distHtml = fs.readFileSync('dist/index.html', 'utf8');

// Check no part-time references in index.html, main.js, dist/index.html
const partTimeRegex = /part[- ]?time/i;
assert(!partTimeRegex.test(indexHtml), 'index.html must not contain part-time references');
assert(!partTimeRegex.test(mainJs), 'src/main.js must not contain part-time references');
assert(!partTimeRegex.test(distHtml), 'dist/index.html must not contain part-time references');
console.log('   ✓ Confirmed zero occurrences of "part-time", "part time", or "parttime" in source and dist');

// Check Mobile contact card is completely removed
assert(!indexHtml.includes('+91 98765 43210'), 'index.html must not contain +91 98765 43210');
assert(!indexHtml.includes('<h4>Mobile</h4>'), 'index.html must not contain <h4>Mobile</h4>');
assert(!distHtml.includes('+91 98765 43210'), 'dist/index.html must not contain +91 98765 43210');
assert(!distHtml.includes('<h4>Mobile</h4>'), 'dist/index.html must not contain <h4>Mobile</h4>');
console.log('   ✓ Confirmed Mobile contact card completely removed from HTML');

// 2. Launch local server and test rendered DOM via Puppeteer
(async () => {
    let server;
    let browser;
    try {
        const port = 5892;
        server = http.createServer((req, res) => {
            let filePath = path.join('dist', req.url === '/' ? 'index.html' : req.url.split('?')[0]);
            if (!fs.existsSync(filePath)) {
                res.writeHead(404);
                res.end();
                return;
            }
            const ext = path.extname(filePath);
            const mime = ext === '.html' ? 'text/html' : (ext === '.js' ? 'application/javascript' : (ext === '.css' ? 'text/css' : (ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : (ext === '.png' ? 'image/png' : 'application/octet-stream'))));
            res.writeHead(200, { 'Content-Type': mime });
            fs.createReadStream(filePath).pipe(res);
        });

        await new Promise(r => server.listen(port, r));

        const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
        const launchOptions = {
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        };
        if (fs.existsSync(edgePath)) {
            launchOptions.executablePath = edgePath;
        }

        browser = await puppeteer.launch(launchOptions);
        const page = await browser.newPage();

        // TEST MOBILE VIEWPORT (375x667)
        console.log('\n2. Testing Mobile Viewport (375x667)...');
        await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true });
        await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle0' });

        const mobileContactData = await page.evaluate(() => {
            const contactSection = document.getElementById('contact');
            const methods = Array.from(document.querySelectorAll('.contact-method')).map(el => ({
                heading: el.querySelector('h4')?.textContent?.trim(),
                text: el.querySelector('p')?.textContent?.trim()
            }));

            // Check if any element contains the mobile number
            const bodyText = document.body.innerText;
            const hasOldPhone = bodyText.includes('98765 43210') || bodyText.includes('9876543210');
            const hasPartTime = /part[- ]?time/i.test(bodyText);

            return {
                methods,
                hasOldPhone,
                hasPartTime,
                contactSectionExists: !!contactSection
            };
        });

        assert(mobileContactData.contactSectionExists, 'Contact section must exist');
        assert(!mobileContactData.hasOldPhone, 'Mobile viewport must NOT contain 98765 43210');
        assert(!mobileContactData.hasPartTime, 'Mobile viewport must NOT contain any part-time text');

        console.log(`   ✓ Contact methods found on mobile: ${mobileContactData.methods.map(m => m.heading).join(', ')}`);
        assert.deepStrictEqual(
            mobileContactData.methods.map(m => m.heading),
            ['Email', 'Location', 'Availability'],
            'Contact methods should strictly be Email, Location, Availability'
        );
        console.log('   ✓ Confirmed: Mobile contact card is completely gone');
        console.log('   ✓ Confirmed: Email, Location, Availability cards rendered cleanly');

        // TEST TIMELINE ROLES ON MOBILE
        const timelineRoles = await page.evaluate(() => {
            const compactRoles = Array.from(document.querySelectorAll('.timeline-role')).map(el => el.textContent.trim());
            const expRoles = Array.from(document.querySelectorAll('.timeline-role-exp')).map(el => el.textContent.trim());
            return { compactRoles, expRoles };
        });

        for (const role of [...timelineRoles.compactRoles, ...timelineRoles.expRoles]) {
            assert(!role.includes('Part Time') && !role.includes('part-time'), `Role "${role}" must not contain Part Time`);
        }
        assert(timelineRoles.compactRoles.includes('Student Counsellor'), 'Must contain "Student Counsellor"');
        assert(timelineRoles.compactRoles.includes('Corporate Trainer & Communication Coach'), 'Must contain "Corporate Trainer & Communication Coach"');
        assert(timelineRoles.compactRoles.includes('Affiliate Psychological Consultant'), 'Must contain "Affiliate Psychological Consultant"');
        assert(timelineRoles.compactRoles.includes('Senior Consulting Psychologist & Psychotherapist'), 'Must contain "Senior Consulting Psychologist & Psychotherapist"');
        console.log('   ✓ Timeline roles successfully updated with Part Time removed');

        // TEST DESKTOP VIEWPORT (1280x800)
        console.log('\n3. Testing Desktop Viewport (1280x800)...');
        await page.setViewport({ width: 1280, height: 800 });
        await page.reload({ waitUntil: 'networkidle0' });

        const desktopContactData = await page.evaluate(() => {
            const methods = Array.from(document.querySelectorAll('.contact-method')).map(el => ({
                heading: el.querySelector('h4')?.textContent?.trim(),
                text: el.querySelector('p')?.textContent?.trim()
            }));
            const bodyText = document.body.innerText;
            const hasOldPhone = bodyText.includes('98765 43210') || bodyText.includes('9876543210');
            const hasPartTime = /part[- ]?time/i.test(bodyText);
            return { methods, hasOldPhone, hasPartTime };
        });

        assert(!desktopContactData.hasOldPhone, 'Desktop viewport must NOT contain 98765 43210');
        assert(!desktopContactData.hasPartTime, 'Desktop viewport must NOT contain any part-time text');
        assert.deepStrictEqual(
            desktopContactData.methods.map(m => m.heading),
            ['Email', 'Location', 'Availability'],
            'Desktop contact methods should strictly be Email, Location, Availability'
        );
        console.log('   ✓ Desktop contact methods verified: Email, Location, Availability');
        console.log('   ✓ Confirmed zero part-time text across entire rendered desktop page');

        console.log('\n=== ALL VERIFICATION CHECKS PASSED SUCCESSFULLY! ===\n');

    } catch (err) {
        console.error('\n❌ VERIFICATION FAILED:', err);
        process.exit(1);
    } finally {
        if (browser) await browser.close();
        if (server) server.close();
    }
})();
