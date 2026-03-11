with open('/tmp/openbazaar/src/app/(admin-panel)/admin/products/audit/page.tsx', 'r') as f:
    content = f.read()

# Add simple onClick handler to mock buttons to prevent user frustration
new_content = content.replace('className="px-4 py-2 border border-rose-200', 'onClick={() => alert("Ürün reddedildi (Mock)")} className="px-4 py-2 border border-rose-200')
new_content = new_content.replace('className="px-4 py-2 bg-slate-900 text-white', 'onClick={() => alert("Ürün başarıyla yayına alındı (Mock)")} className="px-4 py-2 bg-slate-900 text-white')

with open('/tmp/openbazaar/src/app/(admin-panel)/admin/products/audit/page.tsx', 'w') as f:
    f.write(new_content)

print("Admin product buttons fixed")
