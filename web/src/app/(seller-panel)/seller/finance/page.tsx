export default function SellerFinancePage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Finans & Cüzdan</h2>
        <p className="text-sm text-gray-500 mt-1">Hesap bakiyeniz, komisyon kesintileri ve banka (IBAN) transferleri.</p>
      </div>

      {/* Bakiye Özeti */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-200 border-l-4 border-l-emerald-500">
          <p className="text-sm font-medium text-gray-500">Kullanılabilir Bakiye</p>
          <p className="text-3xl font-black text-gray-900 mt-2">₺ 45,250.00</p>
          <button className="mt-4 w-full bg-slate-900 text-white py-2 rounded-md text-sm font-bold hover:bg-slate-800 transition">
            Parayı Çek (Payout)
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
            Blokeli Bakiye (Escrow) <span className="cursor-help" title="Müşteri teslim alana kadar havuzda tutulan para">ℹ️</span>
          </p>
          <p className="text-3xl font-black text-gray-900 mt-2">₺ 12,400.00</p>
          <p className="text-xs text-gray-500 mt-4">Kargo teslimatından 3 gün sonra açılır.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Stripe Connect Durumu</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="font-bold text-green-700">Aktif (Doğrulandı)</span>
          </div>
          <p className="text-xs text-gray-500 mt-4 font-mono">IBAN: TR45 ******* 1234</p>
        </div>
      </div>

      {/* Son Finansal İşlemler Tablosu */}
      <h3 className="text-lg font-bold text-gray-900 mb-4">Son İşlemler (Ledger)</h3>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Tarih</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Açıklama</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Platform Komisyonu</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Net Tutar</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">09 Mart 2026</td>
              <td className="px-6 py-4 text-sm text-gray-900">
                Sipariş Satışı (ORD-9023-A1) <br/>
                <span className="text-xs text-gray-500">Brüt Müşteri Ödemesi: €100.00</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-rose-500">-%15 (₺ 525.00)</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-emerald-600 text-right">+ ₺ 2,975.00</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">01 Mart 2026</td>
              <td className="px-6 py-4 text-sm text-gray-900 font-medium">Banka Transferi (Payout)</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">- ₺ 15,000.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
