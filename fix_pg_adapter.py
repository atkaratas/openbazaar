with open('/tmp/openbazaar/package.json', 'r') as f:
    content = f.read()

new_content = content.replace('"@prisma/adapter-pg": "^7.4.2",', "")

with open('/tmp/openbazaar/package.json', 'w') as f:
    f.write(new_content)
