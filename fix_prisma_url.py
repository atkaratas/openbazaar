with open('/tmp/openbazaar/prisma/schema.prisma', 'r') as f:
    content = f.read()

new_content = content.replace('datasource db {\n  provider = "postgresql"\n}', 'datasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n  directUrl = env("DIRECT_URL")\n}')

with open('/tmp/openbazaar/prisma/schema.prisma', 'w') as f:
    f.write(new_content)
print("Prisma schema updated with URLs")
