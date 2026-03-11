with open('/tmp/openbazaar/src/lib/db.ts', 'r') as f:
    content = f.read()

new_content = content.replace("return new PrismaClient()", """return new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })""")

with open('/tmp/openbazaar/src/lib/db.ts', 'w') as f:
    f.write(new_content)
