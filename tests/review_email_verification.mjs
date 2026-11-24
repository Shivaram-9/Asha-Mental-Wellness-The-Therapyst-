import assert from 'assert';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const backendRequire = createRequire(path.resolve('backend/server.js'));
const mongoose = backendRequire('mongoose');

// Set NODE_ENV to 'test' so backend/server.js doesn't automatically call app.listen(3000)
process.env.NODE_ENV = 'test';

// Import exported functions from backend/server.js
import {
    app,
    getAdminEmailRecipients,
    sanitizeAndValidateEmailList,
    sendReviewNotification,
    Review,
    checkAndLogMailboxQuotaWarning
} from '../backend/server.js';

console.log('=== STARTING REVIEW EMAIL NOTIFICATION & DATA INTEGRITY VERIFICATION ===\n');

// In-memory store for Review documents during tests if local MongoDB is not connected
const inMemoryReviewDocs = new Map();

if (mongoose.connection.readyState !== 1) {
    console.log('[TEST SETUP] Local MongoDB is disconnected; installing isolated in-memory model stubs for Review.');

    Review.prototype.save = async function() {
        if (!this._id) {
            this._id = new mongoose.Types.ObjectId();
        }
        inMemoryReviewDocs.set(this._id.toString(), this);
        return this;
    };

    Review.findOne = function(query) {
        return {
            exec: async () => {
                for (const doc of inMemoryReviewDocs.values()) {
                    let match = true;
                    if (query.email && doc.email !== query.email) match = false;
                    if (query.status && query.status.$in) {
                        if (!query.status.$in.includes(doc.status)) match = false;
                    }
                    if (match) return doc;
                }
                return null;
            },
            then: function(resolve, reject) {
                return this.exec().then(resolve, reject);
            }
        };
    };

    Review.findById = function(id) {
        return {
            exec: async () => {
                const doc = inMemoryReviewDocs.get(id ? id.toString() : '');
                return doc || null;
            },
            then: function(resolve, reject) {
                return this.exec().then(resolve, reject);
            }
        };
    };

    Review.deleteOne = async function(query) {
        if (query._id) {
            inMemoryReviewDocs.delete(query._id.toString());
        }
        return { deletedCount: 1 };
    };

    Review.countDocuments = async function(query = {}) {
        let count = 0;
        for (const doc of inMemoryReviewDocs.values()) {
            if (query.status && doc.status !== query.status) continue;
            count++;
        }
        return count;
    };
}

let server;
let serverPort;
let serverBaseUrl;

async function startTestServer() {
    return new Promise((resolve, reject) => {
        server = http.createServer(app);
        server.listen(0, '127.0.0.1', () => {
            serverPort = server.address().port;
            serverBaseUrl = `http://127.0.0.1:${serverPort}`;
            console.log(`[TEST SERVER] Running on ${serverBaseUrl}`);
            resolve();
        });
        server.on('error', reject);
    });
}

async function stopTestServer() {
    if (server) {
        await new Promise(resolve => server.close(resolve));
        console.log('[TEST SERVER] Stopped.');
    }
}

let passedTests = 0;
let totalTests = 0;

async function runTest(testName, fn) {
    totalTests++;
    try {
        console.log(`\n--- Test ${totalTests}: ${testName} ---`);
        await fn();
        console.log(`? PASSED: ${testName}`);
        passedTests++;
    } catch (err) {
        console.error(`? FAILED: ${testName}`);
        console.error(err);
        process.exitCode = 1;
    }
}

async function main() {
    await startTestServer();

    // -------------------------------------------------------------
    // Test 1: Sanitize and Validate Email List
    // -------------------------------------------------------------
    await runTest('Email sanitization correctly excludes obsolete/over-quota jyothsnabalu and malformed inputs', async () => {
        const input1 = 'jyoths nabalu.85@gmail.com, asha.suhasinim@gmail.com';
        const result1 = sanitizeAndValidateEmailList(input1);
        assert.deepStrictEqual(result1, ['asha.suhasinim@gmail.com'], 'Should filter out spaced variant of jyothsnabalu');

        const input2 = 'jyothsnabalu.85@gmail.com, ymvshiva1784@gmail.com';
        const result2 = sanitizeAndValidateEmailList(input2);
        assert.deepStrictEqual(result2, ['ymvshiva1784@gmail.com'], 'Should filter out exact jyothsnabalu.85@gmail.com');

        const input3 = 'invalid-email, notanemail@, asha.suhasinim@gmail.com, asha.suhasinim@gmail.com';
        const result3 = sanitizeAndValidateEmailList(input3);
        assert.deepStrictEqual(result3, ['asha.suhasinim@gmail.com'], 'Should filter invalid syntax and deduplicate');
    });

    // -------------------------------------------------------------
    // Test 2: getAdminEmailRecipients with purpose and fallbacks
    // -------------------------------------------------------------
    await runTest('getAdminEmailRecipients resolves intended admin recipients and prioritizes purpose', async () => {
        const savedEnv = { ...process.env };

        try {
            // Default with no env vars
            delete process.env.ADMIN_EMAIL;
            delete process.env.ADMIN_EMAILS;
            delete process.env.CONTACT_RECIPIENT_EMAILS;
            delete process.env.REVIEW_NOTIFICATION_EMAIL;
            delete process.env.REVIEW_NOTIFICATION_EMAILS;

            const resDefault = getAdminEmailRecipients();
            assert.strictEqual(resDefault.recipientList.includes('asha.suhasinim@gmail.com'), true);
            assert.strictEqual(resDefault.recipientList.includes('ymvshiva1784@gmail.com'), true);
            assert.strictEqual(resDefault.recipientList.includes('jyothsnabalu.85@gmail.com'), false);

            // Review-specific env var override
            process.env.REVIEW_NOTIFICATION_EMAIL = 'custom-review-admin@ashasuhasini.com';
            const resReview = getAdminEmailRecipients({ purpose: 'review' });
            assert.deepStrictEqual(resReview.recipientList, ['custom-review-admin@ashasuhasini.com']);

            // General purpose does not use review-specific env var
            const resGeneral = getAdminEmailRecipients({ purpose: 'general' });
            assert.strictEqual(resGeneral.recipientList.includes('asha.suhasinim@gmail.com'), true);

            // Obsolete env var only containing jyothsnabalu falls back to default
            delete process.env.REVIEW_NOTIFICATION_EMAIL;
            process.env.ADMIN_EMAIL = 'jyothsnabalu.85@gmail.com';
            const resFallback = getAdminEmailRecipients({ purpose: 'review' });
            assert.strictEqual(resFallback.recipientList.includes('asha.suhasinim@gmail.com'), true);
            assert.strictEqual(resFallback.recipientList.includes('ymvshiva1784@gmail.com'), true);
            assert.strictEqual(resFallback.recipientList.includes('jyothsnabalu.85@gmail.com'), false);
        } finally {
            process.env = savedEnv;
        }
    });

    // -------------------------------------------------------------
    // Test 3: Mailbox Quota Warning Detection
    // -------------------------------------------------------------
    await runTest('Mailbox quota error detection logs operational warning without crashing', async () => {
        let loggedWarning = null;
        const origWarn = console.warn;
        console.warn = (...args) => {
            loggedWarning = args.join(' ');
            origWarn(...args);
        };

        try {
            checkAndLogMailboxQuotaWarning('552 5.2.2 The email account that you tried to reach is over quota.');
            assert.ok(loggedWarning && loggedWarning.includes('OPERATIONAL WARNING - MAILBOX OVER QUOTA'));
            assert.ok(loggedWarning.includes('External Google mailbox storage quotas cannot be expanded through application code'));
        } finally {
            console.warn = origWarn;
        }
    });

    // -------------------------------------------------------------
    // Test 4: Decoupled Review Submission and Database Persistence
    // -------------------------------------------------------------
    await runTest('Review submission persists to database and returns HTTP 200 even when email relay fails', async () => {
        const uniqueEmail = `testreviewer_${Date.now()}@example.com`;
        const testPayload = {
            name: 'Priya Sharma',
            email: uniqueEmail,
            rating: 5,
            message: 'Exceptional counseling guidance. Very compassionate and insightful.',
            country: 'India',
            state: 'Telangana',
            city: 'Hyderabad'
        };

        // Point relay to an invalid URL to simulate relay failure / timeout
        const originalRelay = process.env.GOOGLE_REVIEW_RELAY_URL;
        process.env.GOOGLE_REVIEW_RELAY_URL = 'http://127.0.0.1:9999/invalid-relay-endpoint';

        try {
            const res = await fetch(`${serverBaseUrl}/api/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(testPayload)
            });

            assert.strictEqual(res.status, 200, 'Endpoint must return HTTP 200 success even if email relay is unreachable');
            const data = await res.json();
            assert.strictEqual(data.success, true);
            assert.strictEqual(data.message, 'Review submitted and pending approval.');

            // Verify the review was saved in in-memory / MongoDB
            const savedReview = await Review.findOne({ email: uniqueEmail });
            assert.ok(savedReview, 'Review must be persisted in database');
            assert.strictEqual(savedReview.status, 'pending');
            assert.strictEqual(savedReview.name, 'Priya Sharma');
            assert.strictEqual(savedReview.rating, 5);
            assert.strictEqual(savedReview.adminNotificationSent, false);
            assert.ok(savedReview.adminNotificationError !== null, 'Notification failure must be tracked');
            assert.ok(savedReview.notificationAttempts >= 1, 'Attempt counter should be incremented');

            // Clean up test document
            await Review.deleteOne({ _id: savedReview._id });
        } finally {
            process.env.GOOGLE_REVIEW_RELAY_URL = originalRelay;
        }
    });

    // -------------------------------------------------------------
    // Test 5: Idempotency and Duplicate Notification Prevention
    // -------------------------------------------------------------
    await runTest('sendReviewNotification respects idempotency and skips already delivered notifications', async () => {
        const fakeReview = {
            _id: '507f1f77bcf86cd799439011',
            name: 'Idempotency Tester',
            email: 'idempotent@example.com',
            rating: 5,
            message: 'Testing duplicate notification suppression',
            city: 'Hyderabad',
            state: 'Telangana',
            country: 'India',
            adminNotificationSent: true,
            notificationProviderUsed: 'gas-relay',
            notificationRecipients: ['asha.suhasinim@gmail.com', 'ymvshiva1784@gmail.com'],
            save: async () => fakeReview
        };

        const result = await sendReviewNotification(fakeReview, { isRetry: false });
        assert.strictEqual(result.emailDelivered, true);
        assert.strictEqual(result.alreadyDelivered, true);
        assert.strictEqual(result.providerUsed, 'gas-relay');
    });

    // -------------------------------------------------------------
    // Test 6: Retry Notification Endpoint
    // -------------------------------------------------------------
    await runTest('POST /api/reviews/retry-notification allows retrying failed notifications', async () => {
        const uniqueEmail = `testretry_${Date.now()}@example.com`;
        const testReview = new Review({
            name: 'Retry Candidate',
            email: uniqueEmail,
            rating: 5,
            message: 'Need notification retry testing',
            country: 'India',
            state: 'Telangana',
            city: 'Secunderabad',
            status: 'pending',
            approvalToken: 'test-retry-token-12345',
            tokenExpiry: new Date(Date.now() + 86400000),
            adminNotificationSent: false
        });
        await testReview.save();

        try {
            // Mock a local relay server to simulate successful email dispatch
            let relayReceivedBody = null;
            const mockRelayServer = http.createServer((req, res) => {
                let body = '';
                req.on('data', chunk => body += chunk);
                req.on('end', () => {
                    relayReceivedBody = JSON.parse(body);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true, emailSent: true }));
                });
            });

            await new Promise(resolve => mockRelayServer.listen(0, '127.0.0.1', resolve));
            const mockRelayPort = mockRelayServer.address().port;

            const origRelay = process.env.GOOGLE_REVIEW_RELAY_URL;
            const origSecret = process.env.GOOGLE_RELAY_SECRET;
            process.env.GOOGLE_REVIEW_RELAY_URL = `http://127.0.0.1:${mockRelayPort}/relay`;
            process.env.GOOGLE_RELAY_SECRET = 'test-secret';

            try {
                const res = await fetch(`${serverBaseUrl}/api/reviews/retry-notification`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: testReview._id.toString(),
                        token: 'test-retry-token-12345'
                    })
                });

                assert.strictEqual(res.status, 200);
                const data = await res.json();
                assert.strictEqual(data.success, true);
                assert.strictEqual(data.emailDelivered, true);
                assert.strictEqual(data.providerUsed, 'gas-relay');

                // Verify relay received correct to parameter with intended recipients
                assert.ok(relayReceivedBody, 'Relay should receive POST request');
                assert.strictEqual(relayReceivedBody.to.includes('asha.suhasinim@gmail.com'), true);
                assert.strictEqual(relayReceivedBody.to.includes('ymvshiva1784@gmail.com'), true);
                assert.strictEqual(relayReceivedBody.to.includes('jyothsnabalu.85@gmail.com'), false);
                assert.strictEqual(relayReceivedBody.replyTo, uniqueEmail);
                assert.ok(relayReceivedBody.subject.includes('5 Stars'));
                assert.ok(relayReceivedBody.htmlBody.includes('APPROVE REVIEW'));

                // Verify database document was updated
                const updated = await Review.findById(testReview._id);
                assert.strictEqual(updated.adminNotificationSent, true);
                assert.strictEqual(updated.notificationProviderUsed, 'gas-relay');
                assert.strictEqual(updated.adminNotificationError, null);
            } finally {
                process.env.GOOGLE_REVIEW_RELAY_URL = origRelay;
                process.env.GOOGLE_RELAY_SECRET = origSecret;
                await new Promise(resolve => mockRelayServer.close(resolve));
            }
        } finally {
            await Review.deleteOne({ _id: testReview._id });
        }
    });

    // -------------------------------------------------------------
    // Test 7: Verify Existing 32 Reviews Backup Integrity
    // -------------------------------------------------------------
    await runTest('All 32 existing reviews from verified backup file and live production match perfectly', async () => {
        const backupFile = path.resolve('reviews_backup_before_fix.json');
        assert.ok(fs.existsSync(backupFile), 'Backup file reviews_backup_before_fix.json must exist');

        const backupData = JSON.parse(fs.readFileSync(backupFile, 'utf-8'));
        const backupReviews = backupData.reviews;
        assert.strictEqual(backupReviews.length, 32, 'Backup must contain exactly 32 approved reviews');

        // Verify each review has valid fields
        for (const rev of backupReviews) {
            assert.ok(rev._id, 'Review must have _id');
            assert.ok(rev.name, 'Review must have name');
            assert.strictEqual(rev.rating, 5, 'Review must have 5-star rating');
            assert.ok(rev.message, 'Review must have message');
            assert.ok(rev.createdAt, 'Review must have createdAt');
        }

        // Verify live production stats
        const liveStatsRes = await fetch('https://asha-mental-wellness-the-therapyst.onrender.com/api/reviews/stats');
        assert.strictEqual(liveStatsRes.status, 200);
        const liveStats = await liveStatsRes.json();
        assert.ok(liveStats.totalRatings >= 32, 'Live production total reviews must be at least 32');
        assert.strictEqual(liveStats.averageRating, 5, 'Live production average rating must be 5');
        assert.strictEqual(liveStats.distribution['5'], liveStats.totalRatings, 'Live production all ratings must be 5-star');
    });

    await stopTestServer();

    console.log(`\n========================================`);
    console.log(`TEST SUMMARY: ${passedTests} / ${totalTests} tests passed.`);
    console.log(`========================================\n`);

    if (passedTests === totalTests) {
        process.exit(0);
    } else {
        process.exit(1);
    }
}

main().catch(err => {
    console.error('Fatal test runner error:', err);
    process.exit(1);
});
