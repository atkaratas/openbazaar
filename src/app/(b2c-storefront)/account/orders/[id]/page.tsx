import React from 'react';
import Link from 'next/link';

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const orderId = params.id || 'TR-2026-98XJ4';
  const orderDate = '11 Mart 2026, 10:45';

  const timelineEvents = [
    { id: 1, title: 'Sipariş Alındı', description: 'Ödeme onaylandı ve siparişiniz alındı.', date: '11 Mart 2026, 10:45', status: 'completed' },
    { id: 2, title: 'Hazırlanıyor', description: 'Ürünleriniz özenle paketleniyor. (Soğuk zincir standartlarına uygun)', date: '11 Mart 2026, 11:30', status: 'completed' },
    { id: 3, title: 'Gümrük / ETGB Onayı', description: 'Elektronik Ticaret Gümrük Beyannamesi (ETGB) onaylandı.', date: '11 Mart 2026, 14:15', status: 'current' },
    { id: 4, title: 'Uçağa Bindi (DHL)', description: 'Gönderiniz uçuşta. Tahmini varış noktasına doğru ilerliyor.', date: 'Bekleniyor', status: 'upcoming' },
    { id: 5, title: 'Teslim Edildi', description: 'Siparişiniz adresinize teslim edildi.', date: 'Bekleniyor', status: 'upcoming' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="bg-white shadow rounded-lg mb-6 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sipariş Takibi</h1>
              <p className="text-sm text-gray-500 mt-1">Sipariş No: <span className="font-semibold text-gray-800">#{orderId}</span></p>
              <p className="text-sm text-gray-500">Tarih: {orderDate}</p>
            </div>
            <Link href="/account/orders" className="mt-4 sm:mt-0 text-sm font-medium text-blue-600 hover:text-blue-500">
              Tüm Siparişlere Dön &rarr;
            </Link>
          </div>
        </div>

        {/* Warning Banner for Cold Chain */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Soğuk Zincir Gönderimi</h3>
              <p className="text-sm text-blue-700 mt-1">
                Bu siparişinizdeki bazı ürünler soğuk zincir gerektirmektedir. Özel izolasyonlu paketler ve kuru buz kullanılarak, DHL güvencesiyle 48 saat içinde sıcaklık kontrollü olarak teslim edilecektir.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white shadow rounded-lg p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Lojistik Durumu (Canlı)</h2>
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {timelineEvents.map((event, eventIdx) => (
                <li key={event.id}>
                  <div className="relative pb-8">
                    {eventIdx !== timelineEvents.length - 1 ? (
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                          event.status === 'completed' ? 'bg-green-500' : 
                          event.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'
                        }`}>
                          {event.status === 'completed' ? (
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : event.status === 'current' ? (
                            <span className="w-3 h-3 bg-white rounded-full animate-pulse" />
                          ) : (
                            <span className="w-2.5 h-2.5 bg-white rounded-full" />
                          )}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className={`text-sm font-medium ${
                            event.status === 'upcoming' ? 'text-gray-500' : 'text-gray-900'
                          }`}>
                            {event.title}
                          </p>
                          <p className="text-sm text-gray-500 mt-0.5">{event.description}</p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          {event.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-8 border-t border-gray-100 pt-6">
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md border border-gray-200">
              <div className="flex items-center gap-3">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-yellow-200">DHL Express</span>
                <span className="text-sm font-medium text-gray-700">Takip Kodu: <span className="font-mono text-gray-900">DHL-893475928</span></span>
              </div>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Kargo Şirketi Sitesinde İzle
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
