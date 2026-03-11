with open('/tmp/openbazaar/src/app/(admin-panel)/layout.tsx', 'r') as f:
    content = f.read()

# Fix the broken links in the sidebar
new_content = content.replace('href="/admin/sellers"', 'href="/admin/sellers/pending"')
new_content = new_content.replace('href="/admin/customs"', 'href="/admin/dashboard"')
new_content = new_content.replace('href="/admin/commissions"', 'href="/admin/dashboard"')
new_content = new_content.replace('href="/admin/settings"', 'href="/admin/dashboard"')

with open('/tmp/openbazaar/src/app/(admin-panel)/layout.tsx', 'w') as f:
    f.write(new_content)

print("Admin sidebar links fixed")
