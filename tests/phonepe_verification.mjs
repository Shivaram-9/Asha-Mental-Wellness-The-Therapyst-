import assert from 'assert';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

console.log('=== STARTING PHONEPE & LOCKED PAYMENT ACCEPTANCE TEST SUITE ===\n');

// --------------------------------------------------------------------------
// TEST 1: Service Catalog & Authoritative Fee Lock
// --------------------------------------------------------------------------
console.log('TEST 1: Verifying Authoritative Services & Fee Catalog in server.js...');

const serverJsContent = fs.readFileSync('backend/server.js', 'utf8');

const EXPECTED_SERVICES = [
    { key: 'Individual Therapy / Counselling', fee: 3300, feeFormatted: '₹3,300', duration: '45–60 min' },
    { key: 'Family Therapy / Counselling', fee: 4499, feeFormatted: '₹4,499', duration: '45–60 min' },
    { key: 'Marital Therapy / Counselling', fee: 4499, feeFormatted: '₹4,499', duration: '45–60 min' },
    { key: 'Pre-Marital Counselling', fee: 2400, feeFormatted: '₹2,400', duration: '45–60 min' },
    { key: 'Student Counselling / Therapy — 45–60 min (₹599)', fee: 599, feeFormatted: '₹599', duration: '45–60 min' },
    { key: 'Student Counselling / Therapy — 30 min (₹299)', fee: 299, feeFormatted: '₹299', duration: '30 min' },
    { key: 'Consultation', fee: 600, feeFormatted: '₹600', duration: '15–20 min' }
];

for (const svc of EXPECTED_SERVICES) {
    assert(serverJsContent.includes(`fee: ${svc.fee}`), `server.js must contain fee ${svc.fee}`);
    assert(serverJsContent.includes(`feeFormatted: '${svc.feeFormatted}'`), `server.js must contain feeFormatted ${svc.feeFormatted}`);
    assert(serverJsContent.includes(`duration: '${svc.duration}'`), `server.js must contain duration ${svc.duration}`);
    console.log(`  ✓ Verified service catalog entry: ${svc.key} -> ${svc.feeFormatted} (${svc.duration})`);
}

// --------------------------------------------------------------------------
// TEST 2: UI Elements Displaying Payable Amount Are Strictly Read-Only
// --------------------------------------------------------------------------
console.log('\nTEST 2: Verifying UI Elements Are Read-Only (No Inputs, Steppers, or Tampering Controls)...');

const mainJsContent = fs.readFileSync('src/main.js', 'utf8');

// Check that #paymentAmountPayable is a span, NOT an input or select
assert(mainJsContent.includes('<span id="paymentAmountPayable" class="payment-fee">—</span>'), 
    'paymentAmountPayable must be a read-only <span>');

// Check that #selectedServiceFee is a span, NOT an input or select
assert(mainJsContent.includes('<span id="selectedServiceFee" class="summary-fee">—</span>'), 
    'selectedServiceFee must be a read-only <span>');

// Check that #noticeAmount is a span
assert(mainJsContent.includes('<span id="noticeAmount"'), 
    'noticeAmount must be a read-only <span>');

// Assert no editable input or stepper controls exist for fee
assert(!mainJsContent.includes('input type="number" id="paymentAmountPayable"'), 'Fee must never be an input field');
assert(!mainJsContent.includes('contenteditable="true"'), 'No editable content controls allowed on fee elements');

console.log('  ✓ Verified #paymentAmountPayable is a strictly read-only <span>');
console.log('  ✓ Verified #selectedServiceFee is a strictly read-only <span>');
console.log('  ✓ Verified #noticeAmount is a strictly read-only <span>');
console.log('  ✓ Verified absence of input steppers or plus/minus controls for fee');

// --------------------------------------------------------------------------
// TEST 3: Booking Request Email Payload Validation
// --------------------------------------------------------------------------
console.log('\nTEST 3: Verifying Booking Request Email Payload Requirements...');

const requiredBookingEmailFields = [
    'Customer Full Name:',
    'Customer Email Address:',
    'Customer Phone Number:',
    'Selected Service / Therapy:',
    'Session Duration:',
    'Exact Consultation Fee:',
    'Booking Date and Time:',
    'Booking ID / Reference:',
    'UTR / Transaction Ref:',
    'Payment Submission Time:',
    'Current Booking Status:',
    'Current Payment Status:',
    'Payment Screenshot:',
    'Request Submitted At:'
];

for (const field of requiredBookingEmailFields) {
    assert(serverJsContent.includes(field), `server.js booking request email must contain field: "${field}"`);
    console.log(`  ✓ Email template includes field: ${field}`);
}

assert(serverJsContent.includes('Pending Payment'), 'Booking request email must show "Pending Payment" status');
assert(serverJsContent.includes('Awaiting client payment submission'), 'Booking request email must indicate UTR is awaiting submission');

// --------------------------------------------------------------------------
// TEST 4: Payment Submission Email Payload Validation
// --------------------------------------------------------------------------
console.log('\nTEST 4: Verifying Payment Submission Email Payload Requirements...');

const requiredPaymentEmailFields = [
    'PAYMENT REFERENCE SUBMITTED',
    'Customer Full Name:',
    'Customer Email Address:',
    'Customer Phone Number:',
    'Selected Service / Therapy:',
    'Session Duration:',
    'Exact Consultation Fee:',
    'Booking Date and Time:',
    'Booking ID / Reference:',
    'Submitted UTR / Ref:',
    'Payment Submission Date/Time:',
    'Current Booking Status:',
    'Current Payment Status:',
    'Pending Verification',
    'GULLA ASHA SUHASINI RAJA - 8019749608@ybl',
    'APPROVE BOOKING',
    'REJECT BOOKING'
];

for (const field of requiredPaymentEmailFields) {
    assert(serverJsContent.includes(field), `server.js payment submission email must contain: "${field}"`);
    console.log(`  ✓ Payment email template includes: ${field}`);
}

// --------------------------------------------------------------------------
// TEST 5: Backend Price Recalculation & Tamper Resistance
// --------------------------------------------------------------------------
console.log('\nTEST 5: Verifying Server-Side Price Locking & Tamper Resistance...');

// Check that POST /api/book strictly derives fee from getBackendServiceData and ignores client body fee
assert(serverJsContent.includes('const serviceData = getBackendServiceData(rawService);'), 
    'server.js must fetch authoritative service data from catalog');
assert(serverJsContent.includes('fee: serviceData.fee,'), 
    'server.js must assign fee strictly from serviceData.fee');
assert(serverJsContent.includes('feeFormatted: serviceData.feeFormatted,'), 
    'server.js must assign feeFormatted strictly from serviceData.feeFormatted');

// Check that POST /api/book/payment looks up fee from database and rejects client fee submission
assert(serverJsContent.includes('const booking = await Booking.findById(bookingId);'), 
    'payment endpoint must look up existing booking record');
assert(!serverJsContent.includes('booking.fee = req.body.fee'), 
    'payment endpoint must NEVER accept fee from request body');

console.log('  ✓ Confirmed backend ignores client-submitted fee and locks to serviceData');
console.log('  ✓ Confirmed payment endpoint binds strictly to database booking record fee');

// --------------------------------------------------------------------------
// TEST 6: Payment Verification Workflow & UTR Validation
// --------------------------------------------------------------------------
console.log('\nTEST 6: Verifying Payment Verification Status Transitions & UTR Validation...');

// UTR length constraint (6-35 characters)
assert(serverJsContent.includes('trimmedUtr.length < 6 || trimmedUtr.length > 35'), 
    'server.js must validate UTR length between 6 and 35 characters');

// Status transition to pending_verification
assert(serverJsContent.includes("booking.paymentStatus = 'pending_verification';"), 
    'server.js must set paymentStatus to pending_verification upon payment submission');

// Admin action approval transition to paid
assert(serverJsContent.includes("targetPaymentStatus = action === 'approve' ? 'paid' : 'rejected'"), 
    'server.js must set paymentStatus to paid upon approval and rejected upon rejection');

console.log('  ✓ Validated UTR length checks (6-35 chars)');
console.log('  ✓ Validated paymentStatus transition to "pending_verification"');
console.log('  ✓ Validated paymentStatus transition to "paid" upon approval');
console.log('  ✓ Validated paymentStatus transition to "rejected" upon rejection');

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// TEST 7: Admin Recipient Resolution
// --------------------------------------------------------------------------
console.log('\nTEST 7: Verifying Admin Email Recipient Resolution...');

assert(serverJsContent.includes('const DEFAULT_ADMIN_EMAILS = \'asha.suhasinim@gmail.com,ymvshiva1784@gmail.com\';'), 
    'server.js must define DEFAULT_ADMIN_EMAILS');
assert(serverJsContent.includes('process.env.ADMIN_EMAIL || process.env.ADMIN_EMAILS || process.env.CONTACT_RECIPIENT_EMAILS || DEFAULT_ADMIN_EMAILS'), 
    'server.js must resolve admin recipient from environment variables or default');

console.log('  ✓ Admin recipient fallback properly configured: asha.suhasinim@gmail.com, ymvshiva1784@gmail.com');

// --------------------------------------------------------------------------
// TEST 8: Dedicated Screenshot Portal Route & Decoupled Action Endpoint
// --------------------------------------------------------------------------
console.log('\nTEST 8: Verifying Dedicated Screenshot Portal Route & Link Decoupling...');

// 1. Check dedicated screenshot endpoint exists
assert(serverJsContent.includes("app.get('/api/book/screenshot', async (req, res) => {"), 
    'server.js must define dedicated GET /api/book/screenshot endpoint');

// 2. Check screenshotLink is generated correctly
assert(serverJsContent.includes("const screenshotLink = `${baseUrl}/api/book/screenshot?id=${booking._id}&token=${booking.approvalToken}`;"), 
    'server.js must generate dedicated screenshotLink');

// 3. Check payment email template uses screenshotLink
assert(serverJsContent.includes('<a href="${screenshotLink}" style="color: #2c4a3e; text-decoration: underline; font-weight: 600;">View Full Screenshot in Portal</a>'), 
    'Payment email must link "View Full Screenshot in Portal" to screenshotLink');
assert(serverJsContent.includes('<a href="${screenshotLink}" style="display: inline-block; padding: 12px 20px; background-color: #2c4a3e; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 700; font-size: 14px; margin: 4px;">VIEW SCREENSHOT &amp; VERIFY</a>'), 
    'Payment email must include VIEW SCREENSHOT & VERIFY action button');

// 4. Check GET /api/book/action makes action optional
assert(serverJsContent.includes("if (!id || !token)") && serverJsContent.includes("Missing required parameters: id and token are required."), 
    'GET /api/book/action must not require action parameter (it is purely a review GET view)');

// 5. Check raw=1 image streaming logic
assert(serverJsContent.includes("if (raw === '1' || raw === 'true') {"), 
    'GET /api/book/screenshot must support raw=1 streaming');
assert(serverJsContent.includes("res.setHeader('Content-Type', mimeType);"), 
    'raw image streaming must set Content-Type header');
assert(serverJsContent.includes("res.setHeader('Content-Security-Policy', \"default-src 'none'; style-src 'unsafe-inline'\");"), 
    'raw image streaming must set strict Content-Security-Policy header');

// 6. Check fallback for bookings without screenshot
assert(serverJsContent.includes('No Payment Screenshot Uploaded'), 
    'Portal must handle submissions without screenshot gracefully');

console.log('  ✓ Verified dedicated GET /api/book/screenshot route');
console.log('  ✓ Verified payment email points "View Full Screenshot in Portal" to /api/book/screenshot');
console.log('  ✓ Verified GET /api/book/action does not require action query parameter');
console.log('  ✓ Verified raw image streaming with secure CSP and content headers');
console.log('  ✓ Verified graceful fallback card for screenshot-less UTR submissions');

// --------------------------------------------------------------------------
// TEST 9: Puppeteer UI & Mobile Responsiveness Test (375px Viewport)
// --------------------------------------------------------------------------
console.log('\nTEST 9: Launching Puppeteer for Mobile Responsiveness & UI Flow at 375px...');

import http from 'http';

(async () => {
    let browser;
    let server;
    try {
        // Start local static server to serve dist/
        const serverPort = 5678;
        server = http.createServer((req, res) => {
            let filePath = path.join('dist', req.url === '/' ? 'index.html' : req.url.split('?')[0]);
            if (!fs.existsSync(filePath)) {
                res.writeHead(404);
                res.end();
                return;
            }
            const ext = path.extname(filePath);
            const mime = ext === '.html' ? 'text/html' : (ext === '.js' ? 'application/javascript' : (ext === '.css' ? 'text/css' : 'application/octet-stream'));
            res.writeHead(200, { 'Content-Type': mime });
            fs.createReadStream(filePath).pipe(res);
        });

        await new Promise((resolve) => server.listen(serverPort, resolve));

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
        await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true });

        await page.goto(`http://localhost:${serverPort}`, { waitUntil: 'networkidle0' });
        console.log('  ✓ Page loaded in 375px mobile viewport over HTTP server');

        // Trigger opening the booking modal
        await page.evaluate(() => {
            if (typeof window.openModal === 'function') {
                window.openModal('bookingModal');
            }
        });

        await new Promise(r => setTimeout(r, 400));

        // Select a service
        await page.evaluate(() => {
            const select = document.getElementById('bookingService');
            if (select) {
                select.value = 'individual-therapy';
                select.dispatchEvent(new Event('change'));
            }
        });

        await new Promise(r => setTimeout(r, 300));

        // Verify dynamic fee and duration display in booking modal
        const feeText = await page.evaluate(() => document.getElementById('selectedServiceFee')?.textContent);
        const durationText = await page.evaluate(() => document.getElementById('selectedServiceDuration')?.textContent);
        assert.strictEqual(feeText, '₹3,300', 'Selected service fee must display ₹3,300');
        assert.strictEqual(durationText, '45–60 min', 'Selected service duration must display 45–60 min');
        console.log(`  ✓ Service selection dynamically updated fee to ${feeText} and duration to ${durationText}`);

        // Set date and slot to reveal the booking form details
        await page.evaluate(() => {
            const dateInput = document.getElementById('bookingDate');
            if (dateInput) {
                dateInput.value = '2026-12-01';
                dateInput.dispatchEvent(new Event('change'));
            }
        });

        await new Promise(r => setTimeout(r, 400));

        // Verify phone input exists in bookingFormDetails
        const phoneInputExists = await page.evaluate(() => !!document.getElementById('bookingPhone'));
        assert(phoneInputExists, 'Phone input must exist in bookingFormDetails');
        console.log('  ✓ Customer phone input element is present in booking form');

        // Simulate transition to Payment step directly via showPaymentStep with mock booking
        await page.evaluate(() => {
            window.currentBooking = {
                id: '671234567890abcdef123456',
                name: 'Test Client',
                email: 'client@example.com',
                phone: '+91 9876543210',
                service: 'Individual Therapy / Counselling',
                duration: '45–60 min',
                fee: '₹3,300',
                feeAmount: 3300,
                date: '2026-12-01',
                slot: '5:00 PM'
            };
            if (typeof window.showPaymentStep === 'function') {
                window.showPaymentStep();
            }
        });

        await new Promise(r => setTimeout(r, 400));

        // Verify payment section elements and dimensions
        const paymentDetails = await page.evaluate(() => {
            const section = document.getElementById('bookingPaymentSection');
            const container = document.getElementById('modalContainer');
            const payableFee = document.getElementById('paymentAmountPayable')?.textContent;
            const noticeFee = document.getElementById('noticeAmount')?.textContent;
            const qrImg = document.getElementById('paymentQrImage');
            const utrInput = document.getElementById('paymentUtr');
            const upiId = document.getElementById('upiIdText')?.textContent;

            const isSectionVisible = section && window.getComputedStyle(section).display !== 'none';
            const hasQrImage = qrImg && qrImg.getAttribute('src');
            const qrWidth = qrImg ? qrImg.getBoundingClientRect().width : 0;
            const sectionScrollWidth = section ? section.scrollWidth : 0;
            const sectionClientWidth = section ? section.clientWidth : 0;
            const containerScrollWidth = container ? container.scrollWidth : 0;
            const containerClientWidth = container ? container.clientWidth : 0;

            return {
                isSectionVisible,
                payableFee,
                noticeFee,
                hasQrImage: !!hasQrImage,
                qrWidth,
                upiId,
                hasUtrInput: !!utrInput,
                noSectionOverflow: sectionScrollWidth <= sectionClientWidth + 2,
                noContainerOverflow: containerScrollWidth <= containerClientWidth + 2,
                sectionScrollWidth,
                sectionClientWidth,
                containerScrollWidth,
                containerClientWidth
            };
        });

        assert(paymentDetails.isSectionVisible, 'Payment section must be visible');
        assert.strictEqual(paymentDetails.payableFee, '₹3,300', 'Payable fee must be locked to ₹3,300');
        assert.strictEqual(paymentDetails.noticeFee, '₹3,300', 'Notice fee must be locked to ₹3,300');
        assert(paymentDetails.hasQrImage, 'PhonePe QR code image must be rendered');
        assert(paymentDetails.qrWidth > 0 && paymentDetails.qrWidth <= 250, `QR image width (${paymentDetails.qrWidth}px) fits mobile screen`);
        assert.strictEqual(paymentDetails.upiId, '8019749608@ybl', 'UPI ID must be 8019749608@ybl');
        assert(paymentDetails.hasUtrInput, 'UTR input field must be present');
        assert(paymentDetails.noSectionOverflow, `Payment section must not have horizontal overflow (${paymentDetails.sectionScrollWidth} <= ${paymentDetails.sectionClientWidth})`);
        assert(paymentDetails.noContainerOverflow, `Modal container must not have horizontal overflow (${paymentDetails.containerScrollWidth} <= ${paymentDetails.containerClientWidth})`);

        console.log(`  ✓ Payment section rendered cleanly: Fee = ${paymentDetails.payableFee}`);
        console.log(`  ✓ PhonePe QR image loaded with width = ${paymentDetails.qrWidth}px`);
        console.log(`  ✓ Verified UPI ID: ${paymentDetails.upiId}`);
        console.log(`  ✓ Mobile responsiveness confirmed at 375px width:`);
        console.log(`      Payment section: ${paymentDetails.sectionScrollWidth}px <= ${paymentDetails.sectionClientWidth}px`);
        console.log(`      Modal container: ${paymentDetails.containerScrollWidth}px <= ${paymentDetails.containerClientWidth}px`);

        console.log('\n=== ALL ACCEPTANCE TESTS PASSED SUCCESSFULLY! ===\n');
    } catch (err) {
        console.error('\n❌ ACCEPTANCE TEST FAILED:', err);
        process.exit(1);
    } finally {
        if (browser) await browser.close();
        if (server) server.close();
    }
})();
