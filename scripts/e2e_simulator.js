require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const LOG_FILE = path.join(__dirname, '../monkey_e2e.log');

async function log(msg) {
    const time = new Date().toISOString();
    const logLine = `[${time}] ${msg}\n`;
    fs.appendFileSync(LOG_FILE, logLine);
    console.log(logLine.trim());
}

async function run() {
    try {
        await log("Starting E2E Simulator...");
        
        // 1. Simulate API Request
        await log("Simulating POST /api/auth/register...");
        const randomEmail = `monkey_${Date.now()}@example.com`;
        const payload = {
            email: randomEmail,
            password: "MonkeyPass123!",
            role: "SELLER",
            companyName: "Monkey E2E Corp",
            taxId: "9988776655"
        };

        try {
            const res = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (!res.ok) {
                await log(`API ERROR: ${res.status} - ${JSON.stringify(data)}`);
            } else {
                await log(`API SUCCESS: ${JSON.stringify(data)}`);
            }
        } catch (e) {
            await log(`API FETCH FAILED: ${e.message}`);
        }

        // 2. Simulate Approving a Seller in DB
        await log("Simulating DB Seller Approval...");
        const unverifiedStores = await prisma.store.findMany({
            where: { isVerified: false },
            take: 1
        });

        if (unverifiedStores.length > 0) {
            const store = unverifiedStores[0];
            await log(`Found unverified store: ${store.name}. Approving...`);
            const updated = await prisma.store.update({
                where: { id: store.id },
                data: { isVerified: true }
            });
            await log(`DB SUCCESS: Store ${updated.name} approved.`);
        } else {
            await log("DB INFO: No unverified stores found. Creating a fake one to approve...");
            const fakeUser = await prisma.user.create({
                data: {
                    email: `fake_store_${Date.now()}@example.com`,
                    passwordHash: "dummy",
                    role: "SELLER",
                    name: "Fake Store Owner",
                    store: {
                        create: {
                            name: `Fake Store ${Date.now()}`,
                            isVerified: true,
                            taxId: "00000"
                        }
                    }
                }
            });
            await log(`DB SUCCESS: Fake store created and approved directly: ${fakeUser.email}`);
        }

    } catch (err) {
        await log(`CRASH: ${err.message}\n${err.stack}`);
    } finally {
        await prisma.$disconnect();
        await pool.end();
        await log("E2E Simulation finished.\n");
    }
}

run();