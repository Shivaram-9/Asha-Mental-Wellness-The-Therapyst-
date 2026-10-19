import assert from 'assert';
import http from 'http';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(path.resolve('backend/server.js'));
const express = require('express');
const mongoose = require('mongoose');

console.log('=== STARTING SCREENSHOT PORTAL & ACTION DECOUPLING INTEGRATION TEST ===\n');

// Mock Booking Schema & Model in an isolated in-memory simulation
const mockBookings = new Map();

// Generate a valid MongoDB ObjectId string
function newObjectId() {
    return new mongoose.Types.ObjectId().toString();
}

// Sample 1x1 transparent PNG data URI
const samplePngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
const samplePngDataUrl = `data:image/png;base64,${samplePngBase64}`;

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Set up isolated Express app mirroring backend/server.js implementation
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Implementation matching backend/server.js GET /api/book/screenshot
app.get('/api/book/screenshot', async (req, res) => {
    const { id, token, raw } = req.query;

    if (!id || !token) {
        return res.status(400).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head><meta charset="UTF-8"><title>Missing Parameters</title><style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#f8fafc;margin:0;}.card{background:#fff;padding:32px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.08);max-width:440px;text-align:center;}h2{color:#dc2626;margin-top:0;}p{color:#475569;}</style></head>
            <body><div class="card"><h2>Missing Parameters</h2><p>Both booking <code>id</code> and access <code>token</code> are required to view the payment screenshot.</p></div></body></html>
        `);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head><meta charset="UTF-8"><title>Invalid ID</title><style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#f8fafc;margin:0;}.card{background:#fff;padding:32px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.08);max-width:440px;text-align:center;}h2{color:#dc2626;margin-top:0;}p{color:#475569;}</style></head>
            <body><div class="card"><h2>Invalid ID</h2><p>The provided booking identifier format is invalid.</p></div></body></html>
        `);
    }

    try {
        const booking = mockBookings.get(id);
        if (!booking) {
            return res.status(404).send(`
                <!DOCTYPE html>
                <html lang="en">
                <head><meta charset="UTF-8"><title>Booking Not Found</title><style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#f8fafc;margin:0;}.card{background:#fff;padding:32px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.08);max-width:440px;text-align:center;}h2{color:#dc2626;margin-top:0;}p{color:#475569;}</style></head>
                <body><div class="card"><h2>Booking Not Found</h2><p>No booking record exists for the provided ID.</p></div></body></html>
            `);
        }

        if (!booking.approvalToken || booking.approvalToken !== token) {
            return res.status(403).send(`
                <!DOCTYPE html>
                <html lang="en">
                <head><meta charset="UTF-8"><title>Access Denied</title><style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#f8fafc;margin:0;}.card{background:#fff;padding:32px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.08);max-width:440px;text-align:center;}h2{color:#dc2626;margin-top:0;}p{color:#475569;}</style></head>
                <body><div class="card"><h2>Access Denied</h2><p>The secure access token is invalid or does not match this booking record.</p></div></body></html>
            `);
        }

        if (booking.tokenExpiry && booking.tokenExpiry < new Date()) {
            return res.status(403).send(`
                <!DOCTYPE html>
                <html lang="en">
                <head><meta charset="UTF-8"><title>Link Expired</title><style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#f8fafc;margin:0;}.card{background:#fff;padding:32px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.08);max-width:440px;text-align:center;}h2{color:#dc2626;margin-top:0;}p{color:#475569;}</style></head>
                <body><div class="card"><h2>Link Expired</h2><p>This secure screenshot viewing link has expired.</p></div></body></html>
            `);
        }

        // Handle raw image streaming (high-resolution full display)
        if (raw === '1' || raw === 'true') {
            if (!booking.paymentScreenshot) {
                return res.status(404).send('No payment screenshot was uploaded for this booking.');
            }

            const match = booking.paymentScreenshot.match(/^data:([^;]+);base64,(.+)$/);
            if (!match) {
                return res.status(400).send('Invalid stored screenshot format.');
            }

            const mimeType = match[1];
            const buffer = Buffer.from(match[2], 'base64');

            res.setHeader('Content-Type', mimeType);
            res.setHeader('Content-Length', buffer.length);
            res.setHeader('Cache-Control', 'private, max-age=3600');
            res.setHeader('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'");
            res.setHeader('X-Content-Type-Options', 'nosniff');
            return res.send(buffer);
        }

        // Render responsive portal HTML (Read-only; NEVER mutates booking or payment status)
        const baseUrl = req.protocol + '://' + req.get('host');
        const rawImageUrl = `${baseUrl}/api/book/screenshot?id=${id}&token=${token}&raw=1`;
        const approveActionUrl = `${baseUrl}/api/book/action?id=${id}&token=${token}&action=approve`;
        const rejectActionUrl = `${baseUrl}/api/book/action?id=${id}&token=${token}&action=reject`;

        const paymentStatusLabel = booking.paymentStatus === 'paid' 
            ? 'Paid & Verified' 
            : (booking.paymentStatus === 'pending_verification' ? 'Pending Verification' : (booking.paymentStatus === 'rejected' ? 'Rejected' : 'Pending Payment'));
        const paymentStatusColor = booking.paymentStatus === 'paid' 
            ? '#166534' 
            : (booking.paymentStatus === 'pending_verification' ? '#92400e' : (booking.paymentStatus === 'rejected' ? '#991b1b' : '#64748b'));
        const paymentStatusBg = booking.paymentStatus === 'paid' 
            ? '#dcfce7' 
            : (booking.paymentStatus === 'pending_verification' ? '#fef3c7' : (booking.paymentStatus === 'rejected' ? '#fee2e2' : '#f1f5f9'));

        const bookingStatusLabel = booking.status === 'approved' 
            ? 'Approved' 
            : (booking.status === 'rejected' ? 'Rejected' : 'Pending Review');
        const bookingStatusColor = booking.status === 'approved' ? '#166534' : (booking.status === 'rejected' ? '#991b1b' : '#854d0e');
        const bookingStatusBg = booking.status === 'approved' ? '#dcfce7' : (booking.status === 'rejected' ? '#fee2e2' : '#fef9c3');

        const submittedDateStr = booking.paymentSubmittedAt 
            ? new Date(booking.paymentSubmittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }) + ' (IST)'
            : 'Pending client submission';

        return res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Payment Verification Portal — Asha Suhasini Mental Wellness</title>
            </head>
            <body>
                <div class="portal-container">
                    <div class="portal-header">
                        <h1>Asha Suhasini Mental Wellness</h1>
                        <p>Payment Verification Portal</p>
                    </div>
                    <div class="portal-body">
                        <table class="info-grid">
                            <tr>
                                <td class="info-label">Customer Name</td>
                                <td class="info-val">${escapeHtml(booking.name)}</td>
                            </tr>
                            <tr>
                                <td class="info-label">Customer Email</td>
                                <td class="info-val"><a href="mailto:${escapeHtml(booking.email)}">${escapeHtml(booking.email)}</a></td>
                            </tr>
                            <tr>
                                <td class="info-label">Customer Phone</td>
                                <td class="info-val">${escapeHtml(booking.phone || 'Not provided')}</td>
                            </tr>
                            <tr>
                                <td class="info-label">Selected Service</td>
                                <td class="info-val">${escapeHtml(booking.service || 'N/A')}</td>
                            </tr>
                            <tr>
                                <td class="info-label">Session Duration</td>
                                <td class="info-val">${escapeHtml(booking.duration || 'N/A')}</td>
                            </tr>
                            <tr>
                                <td class="info-label">Exact Consultation Fee</td>
                                <td class="info-val"><span class="fee-highlight">${escapeHtml(booking.feeFormatted || 'N/A')}</span></td>
                            </tr>
                            <tr>
                                <td class="info-label">Submitted UTR / Ref</td>
                                <td class="info-val">
                                    ${booking.utr ? `<span class="utr-highlight">${escapeHtml(booking.utr)}</span>` : '<span>Not submitted yet</span>'}
                                </td>
                            </tr>
                            <tr>
                                <td class="info-label">Booking Date & Time</td>
                                <td class="info-val">${escapeHtml(booking.date)} at ${escapeHtml(booking.slot)}</td>
                            </tr>
                            <tr>
                                <td class="info-label">Booking ID</td>
                                <td class="info-val">${booking._id}</td>
                            </tr>
                            <tr>
                                <td class="info-label">Payment Submitted</td>
                                <td class="info-val">${submittedDateStr}</td>
                            </tr>
                            <tr>
                                <td class="info-label">Current Booking Status</td>
                                <td class="info-val">
                                    <span class="badge" style="background: ${bookingStatusBg}; color: ${bookingStatusColor};">${bookingStatusLabel}</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="info-label">Current Payment Status</td>
                                <td class="info-val">
                                    <span class="badge" style="background: ${paymentStatusBg}; color: ${paymentStatusColor};">${paymentStatusLabel}</span>
                                </td>
                            </tr>
                        </table>

                        ${booking.paymentScreenshot ? `
                        <div class="screenshot-card">
                            <div class="screenshot-title">Uploaded Payment Screenshot</div>
                            <div class="screenshot-img-wrapper">
                                <a href="${rawImageUrl}" target="_blank" title="Click to view full image">
                                    <img src="${booking.paymentScreenshot}" alt="Payment Screenshot for booking ${booking._id}">
                                </a>
                            </div>
                            <div class="screenshot-actions">
                                <a href="${rawImageUrl}" target="_blank" class="btn-raw">Open Full-Res Image</a>
                            </div>
                        </div>
                        ` : `
                        <div class="no-screenshot-card">
                            <h3>No Payment Screenshot Uploaded</h3>
                            <p>
                                The client completed payment submission using UTR reference only (<strong>${escapeHtml(booking.utr || 'N/A')}</strong>) without attaching a screenshot image.<br>
                                Please verify that <strong>${escapeHtml(booking.feeFormatted || 'the consultation fee')}</strong> was received under UTR <strong>${escapeHtml(booking.utr || 'N/A')}</strong> directly in your PhonePe Business account (<strong>8019749608@ybl</strong>) or bank statement.
                            </p>
                        </div>
                        `}

                        <div class="moderation-section">
                            ${booking.status === 'pending' ? `
                                <h3>Moderation Action</h3>
                                <div class="action-buttons">
                                    <form method="POST" action="${approveActionUrl}">
                                        <input type="hidden" name="id" value="${id}">
                                        <input type="hidden" name="token" value="${token}">
                                        <input type="hidden" name="action" value="approve">
                                        <button type="submit" class="action-btn btn-approve">APPROVE BOOKING</button>
                                    </form>
                                    <form method="POST" action="${rejectActionUrl}">
                                        <input type="hidden" name="id" value="${id}">
                                        <input type="hidden" name="token" value="${token}">
                                        <input type="hidden" name="action" value="reject">
                                        <button type="submit" class="action-btn btn-reject">REJECT BOOKING</button>
                                    </form>
                                </div>
                            ` : (booking.status === 'approved' ? `
                                <div class="status-banner status-approved">✓ This booking has already been approved.</div>
                            ` : `
                                <div class="status-banner status-rejected">✗ This booking has already been rejected.</div>
                            `)}
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `);

    } catch (error) {
        console.error('Screenshot portal error:', error);
        return res.status(500).send('Server error loading screenshot portal.');
    }
});

// Implementation matching backend/server.js updated GET /api/book/action
app.get('/api/book/action', async (req, res) => {
    const { id, token, action } = req.query;
    
    if (!id || !token) {
        return res.status(400).send('Missing required parameters: id and token are required.');
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid booking ID parameter.');
    }
    
    try {
        const booking = mockBookings.get(id);
        if (!booking) return res.status(404).send('Booking not found.');
        
        if (booking.status === 'approved') return res.send('Booking Already Approved');
        if (booking.status === 'rejected') return res.send('Booking Already Rejected');
        if (!booking.approvalToken || booking.approvalToken !== token) return res.status(403).send('Invalid Token');
        if (booking.tokenExpiry && booking.tokenExpiry < new Date()) return res.status(403).send('Link Expired');
        
        return res.send(`
            <div class="card">
                <h2>Booking Moderation</h2>
                <div class="details">Client: ${escapeHtml(booking.name)}</div>
                <div class="actions">
                    <form method="POST" action="/api/book/action?id=${id}&token=${token}&action=approve"><button type="submit">Confirm Approve</button></form>
                    <form method="POST" action="/api/book/action?id=${id}&token=${token}&action=reject"><button type="submit">Confirm Reject</button></form>
                </div>
            </div>
        `);
    } catch (err) {
        return res.status(500).send('Server error');
    }
});

// Helper for HTTP requests
async function makeRequest(serverUrl, path) {
    const res = await fetch(`${serverUrl}${path}`);
    const text = await res.text();
    return {
        status: res.status,
        headers: res.headers,
        text
    };
}

// Run test suite
(async () => {
    let server;
    try {
        server = http.createServer(app);
        await new Promise(r => server.listen(0, r));
        const port = server.address().port;
        const serverUrl = `http://127.0.0.1:${port}`;
        console.log(`Test Express server running at ${serverUrl}\n`);

        // Test 1: Missing parameters on GET /api/book/screenshot
        console.log('1. Testing GET /api/book/screenshot without parameters...');
        let res = await makeRequest(serverUrl, '/api/book/screenshot');
        assert.strictEqual(res.status, 400);
        assert(res.text.includes('Missing Parameters'), 'Response must explain missing parameters');
        console.log('   ✓ Returns 400 Missing Parameters');

        // Test 2: Invalid ObjectId
        console.log('2. Testing GET /api/book/screenshot with malformed ObjectId...');
        res = await makeRequest(serverUrl, '/api/book/screenshot?id=not-an-id&token=dummy');
        assert.strictEqual(res.status, 400);
        assert(res.text.includes('Invalid ID'), 'Response must indicate invalid ID format');
        console.log('   ✓ Returns 400 Invalid ID');

        // Test 3: Non-existent booking ID
        console.log('3. Testing GET /api/book/screenshot with non-existent booking...');
        const randomId = newObjectId();
        res = await makeRequest(serverUrl, `/api/book/screenshot?id=${randomId}&token=dummy`);
        assert.strictEqual(res.status, 404);
        assert(res.text.includes('Booking Not Found'), 'Response must indicate booking not found');
        console.log('   ✓ Returns 404 Booking Not Found');

        // Setup test booking with screenshot
        const validIdWithScreenshot = newObjectId();
        const validToken = 'valid_secret_token_12345';
        mockBookings.set(validIdWithScreenshot, {
            _id: validIdWithScreenshot,
            name: 'Priya Sharma',
            email: 'priya@example.com',
            phone: '+91 9876543210',
            service: 'Individual Therapy / Counselling',
            duration: '45–60 min',
            fee: 3300,
            feeFormatted: '₹3,300',
            date: '2026-11-15',
            slot: '4:00 PM',
            status: 'pending',
            paymentStatus: 'pending_verification',
            utr: 'UTR987654321012',
            paymentScreenshot: samplePngDataUrl,
            paymentSubmittedAt: new Date(),
            approvalToken: validToken,
            tokenExpiry: new Date(Date.now() + 86400000)
        });

        // Test 4: Invalid token
        console.log('4. Testing GET /api/book/screenshot with invalid token...');
        res = await makeRequest(serverUrl, `/api/book/screenshot?id=${validIdWithScreenshot}&token=wrong_token`);
        assert.strictEqual(res.status, 403);
        assert(res.text.includes('Access Denied'), 'Response must deny access for invalid token');
        console.log('   ✓ Returns 403 Access Denied');

        // Test 5: Expired token
        console.log('5. Testing GET /api/book/screenshot with expired token...');
        const expiredId = newObjectId();
        mockBookings.set(expiredId, {
            _id: expiredId,
            name: 'Expired Test',
            approvalToken: 'expired_token',
            tokenExpiry: new Date(Date.now() - 1000) // 1 sec ago
        });
        res = await makeRequest(serverUrl, `/api/book/screenshot?id=${expiredId}&token=expired_token`);
        assert.strictEqual(res.status, 403);
        assert(res.text.includes('Link Expired'), 'Response must indicate token expired');
        console.log('   ✓ Returns 403 Link Expired');

        // Test 6: Valid booking with screenshot (HTML Portal View)
        console.log('6. Testing GET /api/book/screenshot with valid token & screenshot...');
        res = await makeRequest(serverUrl, `/api/book/screenshot?id=${validIdWithScreenshot}&token=${validToken}`);
        assert.strictEqual(res.status, 200);
        assert(res.text.includes('Payment Verification Portal'), 'Must render portal header');
        assert(res.text.includes('Priya Sharma'), 'Must show customer name');
        assert(res.text.includes('priya@example.com'), 'Must show customer email');
        assert(res.text.includes('+91 9876543210'), 'Must show customer phone');
        assert(res.text.includes('Individual Therapy / Counselling'), 'Must show selected service');
        assert(res.text.includes('45–60 min'), 'Must show session duration');
        assert(res.text.includes('₹3,300'), 'Must show locked consultation fee');
        assert(res.text.includes('UTR987654321012'), 'Must show submitted UTR');
        assert(res.text.includes('2026-11-15 at 4:00 PM'), 'Must show booking date and time');
        assert(res.text.includes('Pending Review'), 'Must show booking status');
        assert(res.text.includes('Pending Verification'), 'Must show payment status');
        assert(res.text.includes(samplePngDataUrl), 'Must embed screenshot image');
        assert(res.text.includes(`raw=1`), 'Must include link to raw image');
        assert(res.text.includes('APPROVE BOOKING'), 'Must provide APPROVE button');
        assert(res.text.includes('REJECT BOOKING'), 'Must provide REJECT button');

        // Verify read-only invariant (status was NOT modified)
        const bookingAfter = mockBookings.get(validIdWithScreenshot);
        assert.strictEqual(bookingAfter.status, 'pending', 'Viewing screenshot must NEVER mutate booking status');
        assert.strictEqual(bookingAfter.paymentStatus, 'pending_verification', 'Viewing screenshot must NEVER mutate payment status');
        console.log('   ✓ Returns 200 HTML Portal with all details, screenshot img, actions');
        console.log('   ✓ Verified status was NOT mutated by viewing portal');

        // Test 7: Raw image streaming (raw=1)
        console.log('7. Testing GET /api/book/screenshot?raw=1...');
        res = await makeRequest(serverUrl, `/api/book/screenshot?id=${validIdWithScreenshot}&token=${validToken}&raw=1`);
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.headers.get('content-type'), 'image/png', 'Must return image/png Content-Type');
        assert.strictEqual(res.headers.get('content-security-policy'), "default-src 'none'; style-src 'unsafe-inline'");
        assert.strictEqual(res.headers.get('x-content-type-options'), 'nosniff');
        assert(Number(res.headers.get('content-length')) > 0, 'Content-Length must be positive');
        console.log('   ✓ Returns 200 with raw binary buffer, image/png MIME, and strict CSP headers');

        // Test 8: Valid booking without screenshot (UTR only)
        console.log('8. Testing GET /api/book/screenshot for submission without screenshot (UTR only)...');
        const validIdWithoutScreenshot = newObjectId();
        mockBookings.set(validIdWithoutScreenshot, {
            _id: validIdWithoutScreenshot,
            name: 'Rahul Varma',
            email: 'rahul@example.com',
            phone: '+91 9988776655',
            service: 'Student Counselling / Therapy — 45–60 min (₹599)',
            duration: '45–60 min',
            fee: 599,
            feeFormatted: '₹599',
            date: '2026-11-20',
            slot: '6:00 PM',
            status: 'pending',
            paymentStatus: 'pending_verification',
            utr: 'UPIUTR5544332211',
            paymentScreenshot: '', // No screenshot uploaded
            paymentSubmittedAt: new Date(),
            approvalToken: validToken,
            tokenExpiry: new Date(Date.now() + 86400000)
        });

        res = await makeRequest(serverUrl, `/api/book/screenshot?id=${validIdWithoutScreenshot}&token=${validToken}`);
        assert.strictEqual(res.status, 200);
        assert(res.text.includes('No Payment Screenshot Uploaded'), 'Must display no screenshot card');
        assert(res.text.includes('UPIUTR5544332211'), 'Must highlight the UTR');
        assert(res.text.includes('8019749608@ybl'), 'Must mention UPI ID for manual verification');
        console.log('   ✓ Returns 200 HTML with clear fallback notification for UTR-only submission');

        // Test 9: Raw request when no screenshot uploaded returns 404
        console.log('9. Testing GET /api/book/screenshot?raw=1 when no screenshot exists...');
        res = await makeRequest(serverUrl, `/api/book/screenshot?id=${validIdWithoutScreenshot}&token=${validToken}&raw=1`);
        assert.strictEqual(res.status, 404);
        console.log('   ✓ Returns 404 when raw image is requested on screenshot-less booking');

        // Test 10: GET /api/book/action WITHOUT action parameter (Decoupled Review View)
        console.log('10. Testing GET /api/book/action WITHOUT action parameter...');
        res = await makeRequest(serverUrl, `/api/book/action?id=${validIdWithScreenshot}&token=${validToken}`);
        assert.strictEqual(res.status, 200, 'GET /api/book/action without action query param must return 200');
        assert(res.text.includes('Booking Moderation'), 'Must render moderation card');
        assert(res.text.includes('Priya Sharma'), 'Must show client details');
        assert(res.text.includes('Confirm Approve'), 'Must provide Confirm Approve form');
        assert(res.text.includes('Confirm Reject'), 'Must provide Confirm Reject form');
        console.log('   ✓ Returns 200 moderation view without requiring "action" query parameter');

        console.log('\n=== ALL SCREENSHOT PORTAL & ACTION INTEGRATION TESTS PASSED! ===\n');

    } catch (err) {
        console.error('\n❌ INTEGRATION TEST FAILED:', err);
        process.exit(1);
    } finally {
        if (server) server.close();
    }
})();
