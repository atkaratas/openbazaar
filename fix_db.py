with open('/tmp/openbazaar/src/lib/db.ts', 'r') as f:
    content = f.read()

new_content = content.replace("import { Pool } from 'pg'\nimport { PrismaPg } from '@prisma/adapter-pg'\n", "")
new_content = new_content.replace("""  const connectionString = process.env.DATABASE_URL || "postgresql://mockuser:mockpass@localhost:5432/mockdb"
  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter, log: ['error'] })""", "  return new PrismaClient()")

with open('/tmp/openbazaar/src/lib/db.ts', 'w') as f:
    f.write(new_content)
