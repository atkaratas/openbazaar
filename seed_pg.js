const { Client } = require('pg')
require('dotenv').config()

const client = new Client({
  connectionString: process.env.DATABASE_URL,
})

async function main() {
  await client.connect()
  console.log('Connected to Supabase via pg...')

  // Insert Admin User
  // UUID for admin
  const adminId = '11111111-1111-1111-1111-111111111111'
  
  await client.query(`
    INSERT INTO "User" (id, email, "passwordHash", role, name, "updatedAt")
    VALUES ($1, 'admin@openbazaar.com', 'hashed_password_123', 'ADMIN', 'Talha (System Owner)', NOW())
    ON CONFLICT (email) DO NOTHING;
  `, [adminId])

  console.log('Admin user seeded into Supabase.')
  await client.end()
}

main().catch(console.error)
