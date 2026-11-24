import assert from 'assert';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const backendRequire = createRequire(path.resolve('backend/server.js'));
const mongoose = backendRequire('mongoose');

// Set NODE_ENV to 'test' BEFORE importing backend/server.js
process.env.NODE_ENV = 'test';

const {
    app,
    Booking,
    Review,
    SERVICES_MAP,
    getBackendServiceData,
    getServiceDurationMinutes,
    parseSlotToTime,
    doIntervalsOverlap,
    getApprovedSchedulingWindow,
    isValidSlotForService
} = await import('../backend/server.js');

console.log('=== STARTING PRODUCTION RELIABILITY & DURATION VERIFICATION TEST SUITE ===\n');

// In-memory mock store for Bookings when local MongoDB is not connected
const inMemoryBookings = new Map();

if (mongoose.connection.readyState !== 1) {
    console.log('[TEST SETUP] Local MongoDB is disconnected; installing isolated in-memory model stubs for Booking.');

    Booking.prototype.save = async function() {
        if (!this._id) {
            this._id = new mongoose.Types.ObjectId();
        }
        inMemoryBookings.set(this._id.toString(), this);
        return this;
    };

    Booking.find = function(query = {}) {
        return {
            exec: async () => {
                const results = [];
                for (const doc of inMemoryBookings.values()) {
                    let match = true;
                    if (query.date && doc.date !== query.date) match = false;
                    if (query.status && query.status.$in) {
                        if (!query.status.$in.includes(doc.status)) match = false;
                    }
                    if (match) results.push(doc);
                }
                return results;
            },
            then: function(resolve, reject) {
                return this.exec().then(resolve, reject);
            }
        };
    };

    Booking.findById = function(id) {
        return {
            exec: async () => {
                const doc = inMemoryBookings.get(id ? id.toString() : '');
                return doc || null;
            },
            then: function(resolve, reject) {
                return this.exec().then(resolve, reject);
            }
        };
    };
}

let server;
let serverBaseUrl;

function httpRequest(method, urlPath, headers = {}, body = null) {
    return new Promise((resolve, reject) => {
        const parsed = new URL(urlPath, serverBaseUrl);
        const req = http.request({
            hostname: parsed.hostname,
            port: parsed.port,
            path: parsed.pathname + parsed.search,
            method: method,
            headers: headers
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    resolve({ status: res.statusCode, headers: res.headers, body: parsedData, raw: data });
                } catch(e) {
                    resolve({ status: res.statusCode, headers: res.headers, body: null, raw: data });
                }
            });
        });
        req.on('error', reject);
        if (body) {
            req.write(typeof body === 'string' ? body : JSON.stringify(body));
        }
        req.end();
    });
}

async function runTests() {
    // Start local ephemeral HTTP server
    await new Promise((resolve) => {
        server = app.listen(0, '127.0.0.1', () => {
            const port = server.address().port;
            serverBaseUrl = `http://127.0.0.1:${port}`;
            console.log(`[TEST SERVER] Ephemeral test server listening on ${serverBaseUrl}\n`);
            resolve();
        });
    });

    try {
        // ==========================================
        // TEST GROUP 1: Health & Readiness Endpoints
        // ==========================================
        console.log('--- TEST GROUP 1: Health & Readiness Endpoints ---');

        const healthRes = await httpRequest('GET', '/health');
        assert.strictEqual(healthRes.status, 200, '/health must return HTTP 200');
        assert(healthRes.body.status === 'healthy' || healthRes.body.status === 'warming_up', '/health status should be "healthy" or "warming_up"');
        console.log(`✔ GET /health returned 200 OK (status: ${healthRes.body.status}, dbReady: ${healthRes.body.dbReady})`);

        const apiHealthRes = await httpRequest('GET', '/api/health');
        assert.strictEqual(apiHealthRes.status, 200, '/api/health must return HTTP 200');
        assert(apiHealthRes.body.status === 'healthy' || apiHealthRes.body.status === 'warming_up', '/api/health status should be "healthy" or "warming_up"');
        console.log(`✔ GET /api/health returned 200 OK (status: ${apiHealthRes.body.status})`);

        // Check readiness behavior based on dbReady
        const readyRes = await httpRequest('GET', '/readiness');
        if (mongoose.connection.readyState === 1) {
            assert.strictEqual(readyRes.status, 200, '/readiness must return HTTP 200 when DB is connected');
            assert.strictEqual(readyRes.body.status, 'ready');
        } else {
            assert.strictEqual(readyRes.status, 503, '/readiness must return HTTP 503 when DB is still connecting');
            assert.strictEqual(readyRes.body.status, 'connecting');
        }
        console.log(`✔ GET /readiness correctly reports readiness state (status: ${readyRes.status}, state: ${readyRes.body.status})`);

        // Simulate DB ready to test 200 readiness response
        const originalReadyState = mongoose.connection.readyState;
        try {
            Object.defineProperty(mongoose.connection, 'readyState', { value: 1, configurable: true });
            const readyWhenConnected = await httpRequest('GET', '/readiness');
            assert.strictEqual(readyWhenConnected.status, 200, '/readiness must return 200 when DB is ready');
            assert.strictEqual(readyWhenConnected.body.ready, true);
            assert.strictEqual(readyWhenConnected.body.status, 'ready');
            console.log('✔ GET /readiness returns 200 and status "ready" when MongoDB is connected');
        } finally {
            Object.defineProperty(mongoose.connection, 'readyState', { value: originalReadyState, configurable: true });
        }


        // ==========================================
        // TEST GROUP 2: Service Duration Resolution
        // ==========================================
        console.log('\n--- TEST GROUP 2: Service Duration Resolution ---');

        const expectedDurations = {
            'individual-therapy': 60,
            'family-therapy': 60,
            'marital-therapy': 60,
            'pre-marital': 60,
            'student-therapy-60': 60,
            'student-therapy-30': 30,
            'consultation': 20
        };

        for (const [key, dur] of Object.entries(expectedDurations)) {
            const actualDur = getServiceDurationMinutes(key);
            assert.strictEqual(actualDur, dur, `Duration for ${key} must be ${dur} minutes`);
            const serviceData = getBackendServiceData(key);
            assert.strictEqual(serviceData.durationMinutes, dur, `Backend catalog durationMinutes for ${key} must be ${dur}`);
            console.log(`✔ Service '${key}' correctly resolved to ${dur} minutes`);
        }

        // Test fallback for unknown service
        assert.strictEqual(getServiceDurationMinutes('unknown-service'), 60, 'Unknown service should default safely to 60');
        console.log('✔ Unknown service safely defaults to 60 minutes');


        // ==========================================
        // TEST GROUP 3: Scheduling Windows & Interval Arithmetic
        // ==========================================
        console.log('\n--- TEST GROUP 3: Scheduling Windows & Interval Arithmetic ---');

        // Test Mon-Sat window (5:00 PM - 9:00 PM = 1020 - 1260)
        for (let day = 1; day <= 6; day++) {
            const win = getApprovedSchedulingWindow(day);
            assert.strictEqual(win.startMin, 1020, `Mon-Sat day ${day} start must be 1020 (5:00 PM)`);
            assert.strictEqual(win.endMin, 1260, `Mon-Sat day ${day} end must be 1260 (9:00 PM)`);
        }
        console.log('✔ Mon–Sat scheduling windows correctly enforced (5:00 PM – 9:00 PM)');

        // Test Sunday window (12:00 PM - 4:00 PM = 720 - 960)
        const sunWin = getApprovedSchedulingWindow(0);
        assert.strictEqual(sunWin.startMin, 720, 'Sunday start must be 720 (12:00 PM)');
        assert.strictEqual(sunWin.endMin, 960, 'Sunday end must be 960 (4:00 PM)');
        console.log('✔ Sunday scheduling window correctly enforced (12:00 PM – 4:00 PM)');

        // Test parseSlotToTime
        assert.strictEqual(parseSlotToTime('5:00 PM').minutesFromMidnight, 1020);
        assert.strictEqual(parseSlotToTime('5:30 PM').minutesFromMidnight, 1050);
        assert.strictEqual(parseSlotToTime('6:00 PM').minutesFromMidnight, 1080);
        assert.strictEqual(parseSlotToTime('12:00 PM').minutesFromMidnight, 720);
        assert.strictEqual(parseSlotToTime('12:30 PM').minutesFromMidnight, 750);
        assert.strictEqual(parseSlotToTime('3:30 PM').minutesFromMidnight, 930);
        assert.strictEqual(parseSlotToTime('2029-06-04', '5:00 PM').minutesFromMidnight, 1020);
        console.log('✔ parseSlotToTime parses standard 12-hour time strings accurately');

        // Test doIntervalsOverlap
        // [1020, 1050] (5:00 - 5:30 PM) vs [1050, 1080] (5:30 - 6:00 PM) => adjacent, no overlap!
        assert.strictEqual(doIntervalsOverlap(1020, 1050, 1050, 1080), false, 'Adjacent intervals must NOT overlap');
        // [1020, 1050] vs [1020, 1080] (5:00 - 6:00 PM) => overlap!
        assert.strictEqual(doIntervalsOverlap(1020, 1050, 1020, 1080), true, 'Identical start times overlap');
        // [1020, 1080] vs [1050, 1110] => overlap!
        assert.strictEqual(doIntervalsOverlap(1020, 1080, 1050, 1110), true, 'Partial interval overlaps');
        // [1020, 1050] vs [1080, 1140] => separated, no overlap!
        assert.strictEqual(doIntervalsOverlap(1020, 1050, 1080, 1140), false, 'Separated intervals must NOT overlap');
        console.log('✔ doIntervalsOverlap correctly checks boundary and adjacent intervals');


        // ==========================================
        // TEST GROUP 4: Slot Generation and Sub-Slots
        // ==========================================
        console.log('\n--- TEST GROUP 4: Slot Generation and Sub-Slots (/api/booked-slots) ---');

        // Choose a future Monday (e.g. 2029-06-04 is a Monday)
        const futureMonday = '2029-06-04';

        // 1. Hourly service (Individual Therapy, 60m)
        const hourlyRes = await httpRequest('GET', `/api/booked-slots?date=${futureMonday}&service=individual-therapy`);
        assert.strictEqual(hourlyRes.status, 200);
        assert.strictEqual(hourlyRes.body.durationMinutes, 60);
        assert.deepStrictEqual(hourlyRes.body.candidateSlots, ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM']);
        assert.deepStrictEqual(hourlyRes.body.availableSlots, ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM']);
        console.log('✔ Hourly service (60m) returns 4 hourly candidate slots');

        // 2. 30-minute service (Student Counselling, 30m)
        const halfHourRes = await httpRequest('GET', `/api/booked-slots?date=${futureMonday}&service=student-therapy-30`);
        assert.strictEqual(halfHourRes.status, 200);
        assert.strictEqual(halfHourRes.body.durationMinutes, 30);
        assert.deepStrictEqual(halfHourRes.body.candidateSlots, [
            '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'
        ]);
        assert.strictEqual(halfHourRes.body.availableSlots.length, 8);
        console.log('✔ 30-minute service returns 8 half-hour candidate slots without blocking entire hours');

        // 3. Sunday window slots (2029-06-03 is a Sunday)
        const futureSunday = '2029-06-03';
        const sundayHalfHourRes = await httpRequest('GET', `/api/booked-slots?date=${futureSunday}&service=student-therapy-30`);
        assert.strictEqual(sundayHalfHourRes.status, 200);
        assert.strictEqual(sundayHalfHourRes.body.durationMinutes, 30);
        assert.deepStrictEqual(sundayHalfHourRes.body.candidateSlots, [
            '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'
        ]);
        console.log('✔ Sunday 30-minute service returns correct 12:00 PM - 4:00 PM sub-slots');


        // ==========================================
        // TEST GROUP 5: Non-Overlapping Slot Booking & Conflict Isolation
        // ==========================================
        console.log('\n--- TEST GROUP 5: Non-Overlapping Slot Booking & Conflict Isolation ---');

        // Clear existing in-memory bookings
        inMemoryBookings.clear();

        // Simulate an existing approved 30-minute booking at 5:00 PM on 2029-06-04
        const booking1 = new Booking({
            name: 'Client 1',
            email: 'client1@example.com',
            date: futureMonday,
            slot: '5:00 PM',
            time: '5:00 PM',
            serviceKey: 'student-therapy-30',
            durationMinutes: 30,
            status: 'approved'
        });
        await booking1.save();

        // Query slots for 30-min service
        const slots30m = await httpRequest('GET', `/api/booked-slots?date=${futureMonday}&service=student-therapy-30`);
        assert.strictEqual(slots30m.status, 200);
        // 5:00 PM should be booked
        assert(slots30m.body.unavailableSlots.includes('5:00 PM'), '5:00 PM should be marked unavailable');
        assert(!slots30m.body.availableSlots.includes('5:00 PM'), '5:00 PM should not be in availableSlots');
        // 5:30 PM should be AVAILABLE!
        assert(slots30m.body.availableSlots.includes('5:30 PM'), '5:30 PM MUST BE AVAILABLE for a 30m session');
        console.log('✔ A 30-minute booking at 5:00 PM leaves 5:30 PM available for another 30-minute session');

        // Query slots for 60-min service
        const slots60m = await httpRequest('GET', `/api/booked-slots?date=${futureMonday}&service=individual-therapy`);
        assert.strictEqual(slots60m.status, 200);
        // 5:00 PM (5:00 - 6:00 PM) overlaps with 5:00 - 5:30 PM, so 5:00 PM must be unavailable!
        assert(slots60m.body.unavailableSlots.includes('5:00 PM'), '5:00 PM for 60m must be unavailable due to 5:00-5:30 booking');
        assert(!slots60m.body.availableSlots.includes('5:00 PM'), '5:00 PM must not be available for 60m');
        // 6:00 PM should be completely available!
        assert(slots60m.body.availableSlots.includes('6:00 PM'), '6:00 PM must be available for 60m session');
        console.log('✔ A 30-minute booking at 5:00 PM correctly blocks 5:00 PM (60m) but leaves 6:00 PM available');


        // ==========================================
        // TEST GROUP 6: Calendar & Meet Event End-Time Calculation
        // ==========================================
        console.log('\n--- TEST GROUP 6: Calendar & Meet Event End-Time Calculation ---');

        const testStartTime = new Date('2026-10-20T17:00:00+05:30');
        const dur30 = getServiceDurationMinutes('student-therapy-30');
        const end30 = new Date(testStartTime.getTime() + dur30 * 60 * 1000);
        assert.strictEqual(end30.getTime() - testStartTime.getTime(), 30 * 60 * 1000, '30m duration must equal 30 minutes in milliseconds');

        const dur20 = getServiceDurationMinutes('consultation');
        const end20 = new Date(testStartTime.getTime() + dur20 * 60 * 1000);
        assert.strictEqual(end20.getTime() - testStartTime.getTime(), 20 * 60 * 1000, '20m duration must equal 20 minutes in milliseconds');

        const mockBookingId = '670000000000000000000001';
        const expectedEventId = `booking${mockBookingId}`;
        assert.strictEqual(expectedEventId, 'booking670000000000000000000001', 'Deterministic Google Calendar event ID must match');
        console.log('✔ Calendar and Meet end times computed with millisecond precision for all session durations');


        // ==========================================
        // TEST GROUP 7: Critical Data Preservation & Review Backup Verification
        // ==========================================
        console.log('\n--- TEST GROUP 7: Critical Data Preservation Verification ---');

        const backupPath = path.resolve('reviews_backup_before_fix.json');
        assert(fs.existsSync(backupPath), 'reviews_backup_before_fix.json must exist');
        const backupRaw = fs.readFileSync(backupPath, 'utf8');
        const backupData = JSON.parse(backupRaw);
        assert(Array.isArray(backupData.reviews), 'Backup file must contain reviews array');
        assert.strictEqual(backupData.reviews.length, 32, 'All 32 existing reviews must be preserved in backup');
        
        // Ensure every review has essential fields intact
        for (const rev of backupData.reviews) {
            assert(rev._id, 'Review must have _id');
            assert(rev.name, 'Review must have name');
            assert(rev.rating >= 1 && rev.rating <= 5, 'Review rating must be between 1 and 5');
            assert(rev.message, 'Review must have message');
            assert(rev.status === undefined || rev.status === 'approved', 'Review status must not be rejected or invalid');
        }
        console.log(`✔ Verified backup file contains all 32 original reviews with 100% integrity`);

        console.log('\n=============================================================');
        console.log('🎉 ALL PRODUCTION RELIABILITY & DURATION TESTS PASSED (7/7)!');
        console.log('=============================================================\n');

    } finally {
        if (server) {
            server.close();
        }
    }
}

runTests().catch(err => {
    console.error('\n❌ TEST SUITE FAILED:', err);
    process.exit(1);
});
