import re

with open('/tmp/openbazaar/src/app/(auth)/seller/register/page.tsx', 'r') as f:
    content = f.read()

# E-posta ve şifre inputlarını ekleyelim (Eğer yoksa Company Info altına ekle)
if "type=\"email\"" not in content:
    email_pass_html = """
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">E-Posta (Kurumsal)</label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" placeholder="satis@firma.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Şifre</label>
                <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" placeholder="••••••••" />
              </div>
            </div>
            {errorMsg && <div className="text-red-600 text-sm mt-2 font-bold p-3 bg-red-50 rounded-lg">{errorMsg}</div>}
"""
    content = content.replace("</div>\n          </div>\n\n          <div className=\"border-t border-gray-200 pt-6 space-y-4\">", "</div>\n" + email_pass_html + "          </div>\n\n          <div className=\"border-t border-gray-200 pt-6 space-y-4\">")

with open('/tmp/openbazaar/src/app/(auth)/seller/register/page.tsx', 'w') as f:
    f.write(content)

print("Seller register page updated part 2")
