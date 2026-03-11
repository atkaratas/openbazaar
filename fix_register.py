with open('/tmp/openbazaar/src/app/(auth)/seller/register/page.tsx', 'r') as f:
    content = f.read()

# Add states for email and password
new_content = content.replace("const [loading, setLoading] = useState(false);", """const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [taxId, setTaxId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
""")

# Replace mock handleSubmit with real API call
new_content = new_content.replace("""  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("Lütfen hukuki yükümlülük sözleşmesini onaylayınız.");
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Satıcı başvurunuz başarıyla alındı! Belgeleriniz incelendikten sonra bilgilendirileceksiniz.");
      router.push('/');
    }, 1500);
  };""", """  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!agreed) {
      alert("Lütfen hukuki yükümlülük sözleşmesini onaylayınız.");
      return;
    }
    setLoading(true);
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, companyName, taxId, role: 'SELLER' })
      });
      const data = await res.json();
      
      if (!res.ok) {
        setErrorMsg(data.error || 'Kayıt başarısız oldu.');
        setLoading(false);
        return;
      }
      
      alert("Satıcı başvurunuz başarıyla alındı! Şimdi giriş yapabilirsiniz.");
      router.push('/login');
    } catch (err) {
      setErrorMsg('Sunucuya bağlanılamadı.');
      setLoading(false);
    }
  };""")

# Bind inputs to states
new_content = new_content.replace("""<input required type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" placeholder="Örn: Anadolu Gıda A.Ş." />""", """<input required type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" placeholder="Örn: Anadolu Gıda A.Ş." />""")

new_content = new_content.replace("""<input required type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" placeholder="10 Haneli VN / 11 Haneli TCKN" />""", """<input required type="text" value={taxId} onChange={e => setTaxId(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" placeholder="10 Haneli VN / 11 Haneli TCKN" />""")

# Find email and password inputs and bind them (if they exist, if not, we need to add them or replace them if they are already there)
with open('/tmp/openbazaar/src/app/(auth)/seller/register/page.tsx', 'w') as f:
    f.write(new_content)

print("Seller register page updated")
