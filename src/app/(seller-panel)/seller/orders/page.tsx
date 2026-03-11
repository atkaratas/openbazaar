'use client'

export default function SellerOrdersPage() {
  const handleDownloadPDF = async (type: string) => {
    try {
      const orderData = {
        invoiceNumber: "INV-2026-0001",
        date: new Date().toISOString(),
        seller: { name: "Anadolu Organik", address: "Malatya, TR", taxId: "1234567890" },
        buyer: { name: "Klaus Müller", address: "Berlin, DE", vatId: "DE123456" },
        items: [{ description: "Erken Hasat Zeytinyağı", hscode: "1509.10", quantity: 2, unitPrice: 22.50, total: 45.00 }],
        currency: "EUR",
        totalAmount: 45.00,
        incoterms: "DAP",
        reasonForExport: "E-commerce Sale (Micro-Export)"
      };

      const res = await fetch('/api/v1/logistics/documents/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, orderData })
      });

      if (!res.ok) throw new Error('Failed to generate PDF');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}_${orderData.invoiceNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      alert("PDF Motoru Hatası: Lütfen sistem loglarını kontrol edin.");
    }
  };
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Sipariş Yönetimi</h2>
        <p className="text-sm text-gray-500 mt-1">Gelen yurt dışı siparişlerinizi hazırlayın ve gümrük barkodlarını yazdırın.</p>
      </div>

      {/* Sipariş Filtreleri */}
      <div className="flex gap-4 mb-6">
        <button  className="px-4 py-2 bg-emerald-600 text-white rounded-md text-sm font-medium shadow-sm">Yeni (2)</button>
        <button  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50">Hazırlanıyor (1)</button>
        <button  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50">Kargoya Verildi (45)</button>
      </div>

      {/* Sipariş Tablosu */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Sipariş Kodu</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Müşteri (Ülke)</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Ürünler</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Tutar (Hakediş)</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Aksiyon</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            
            {/* Örnek Sipariş Satırı 1 */}
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-bold text-gray-900">#ORD-9023-A1</div>
                <div className="text-xs text-gray-500 mt-1">10 Mart 2026, 14:30</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <span className="text-xl" title="Germany">🇩🇪</span>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Klaus Müller</div>
                    <div className="text-xs text-gray-500">Berlin, DE</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">2x Erken Hasat Zeytinyağı</div>
                <div className="text-xs text-emerald-600 font-medium">📦 Brüt: 2.8 KG (Mikro İhracat)</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-bold text-gray-900">₺ 3,250.00</div>
                <div className="text-xs text-gray-500">Ödendi (Havuzda Bekliyor)</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-col gap-2 items-end">
                <button onClick={() => handleDownloadPDF('waybill')} className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition flex items-center gap-2 w-full justify-center">
                  <span>🖨️</span> DHL ETGB Barkodu (AWB)
                </button>
                <button onClick={() => handleDownloadPDF('invoice')} className="bg-slate-800 text-white px-4 py-2 rounded-md shadow hover:bg-slate-700 transition flex items-center gap-2 w-full justify-center">
                  <span>📄</span> Proforma Fatura (PDF)
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  )
}
