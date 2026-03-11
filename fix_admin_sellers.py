with open('/tmp/openbazaar/src/app/(admin-panel)/admin/sellers/pending/page.tsx', 'r') as f:
    content = f.read()

# Add approved state logic
new_state = """
  const [approvedSellers, setApprovedSellers] = useState<any[]>([]);

  const handleApprove = (id: number, name: string) => {
    const seller = sellers.find(s => s.id === id);
    if(seller) {
      setApprovedSellers([...approvedSellers, seller]);
      setSellers(sellers.filter(s => s.id !== id));
      alert(`${name} başarıyla onaylandı ve yayına alındı.`);
    }
  }

  const handleReject = (id: number, name: string) => {
    setSellers(sellers.filter(s => s.id !== id));
    alert(`${name} satıcısının başvurusu reddedildi.`);
  }
"""

content = content.replace("""  const handleApprove = (id: number, name: string) => {
    setSellers(sellers.filter(s => s.id !== id));
    alert(`${name} başarıyla onaylandı ve yayına alındı.`);
  }

  const handleReject = (id: number, name: string) => {
    setSellers(sellers.filter(s => s.id !== id));
    alert(`${name} satıcısının başvurusu reddedildi.`);
  }""", new_state)

# Add approved table below pending
approved_table = """
      {approvedSellers.length > 0 && (
        <div className="mt-12 bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-emerald-200">
            <h2 className="text-lg font-bold text-emerald-900">Onaylanmış Satıcılar</h2>
          </div>
          <div className="p-0">
            {approvedSellers.map(seller => (
              <div key={seller.id} className="p-6 border-b border-emerald-100 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-emerald-900">{seller.name}</h3>
                  <p className="text-xs font-mono text-emerald-700 mt-1">VKN: {seller.vkn}</p>
                </div>
                <span className="bg-emerald-200 text-emerald-800 text-xs font-bold px-2 py-1 rounded">Aktif Satışta</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
"""

content = content.replace("</div>\n    </div>\n  )\n}", "</div>\n" + approved_table + "\n  )\n}")

with open('/tmp/openbazaar/src/app/(admin-panel)/admin/sellers/pending/page.tsx', 'w') as f:
    f.write(content)

print("Admin seller table fixed")
