import React from 'react';

const apiEndpoints = [
  {
    name: "Sync Supplier Products",
    method: "POST",
    path: "/api/v1/supplier/products/sync",
    description: "Uploads a batch of products from a supplier into the OpenBazaar catalog.",
    reqMock: `{
  "products": [
    {
      "sku": "ITEM-100",
      "name": "Wireless Headphones",
      "price": 99.99,
      "stock": 150
    }
  ]
}`,
    resMock: `{
  "success": true,
  "message": "Products synchronized successfully",
  "syncedCount": 1,
  "timestamp": "2023-10-25T14:48:00.000Z"
}`
  },
  {
    name: "Get Pending Orders",
    method: "GET",
    path: "/api/v1/supplier/orders/pending",
    description: "Retrieves all new orders awaiting supplier fulfillment.",
    reqMock: "",
    resMock: `{
  "success": true,
  "count": 2,
  "orders": [
    {
      "id": "ORD-12345",
      "status": "PENDING_SUPPLIER",
      "items": [...]
    }
  ]
}`
  },
  {
    name: "Create Shipment",
    method: "POST",
    path: "/api/v1/logistics/shipment/create",
    description: "Registers a new shipment with the logistics provider and returns a tracking number and shipping label URL.",
    reqMock: `{
  "orderId": "ORD-12345",
  "packageDetails": {
    "weight": 1.5,
    "dimensions": "20x15x10"
  }
}`,
    resMock: `{
  "success": true,
  "data": {
    "orderId": "ORD-12345",
    "trackingNumber": "TRK-ORD-12345-081293",
    "labelUrl": "https://.../labels/TRK-ORD-12345-081293.pdf"
  }
}`
  },
  {
    name: "Update Tracking (Webhook)",
    method: "POST",
    path: "/api/v1/logistics/tracking/update",
    description: "Webhook listener for real-time logistics tracking updates (IN_TRANSIT, DELIVERED, etc.).",
    reqMock: `{
  "trackingNumber": "TRK-ORD-12345-081293",
  "status": "IN_TRANSIT",
  "location": "Istanbul Hub",
  "timestamp": "2023-10-25T16:00:00Z"
}`,
    resMock: `{
  "success": true,
  "message": "Tracking status for TRK-ORD-12345-081293 updated to IN_TRANSIT.",
  "receivedAt": "2023-10-25T16:00:05.123Z"
}`
  }
];

export const metadata = {
  title: "OpenBazaar API Documentation",
  description: "B2B Supplier and Logistics Integration API Reference",
};

export default function ApiDocumentationPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10 px-8 py-6">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">OpenBazaar B2B API</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Integrate your supplier and logistics systems with the OpenBazaar Gateway (v1).
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-8 space-y-12">
        {apiEndpoints.map((endpoint, idx) => (
          <section key={idx} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            {/* Endpoint Title & Path */}
            <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{endpoint.name}</h2>
                <p className="text-gray-500 text-sm mt-1">{endpoint.description}</p>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <span className={\`font-mono font-bold px-3 py-1 rounded-full text-white \${endpoint.method === 'GET' ? 'bg-blue-600' : 'bg-green-600'}\`}>
                  {endpoint.method}
                </span>
                <code className="font-mono text-gray-700 bg-gray-200 px-3 py-1 rounded">
                  {endpoint.path}
                </code>
              </div>
            </div>

            {/* Request & Response Bodies */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Request */}
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold uppercase text-gray-500 mb-2">Request Mock (JSON)</h3>
                {endpoint.reqMock ? (
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto flex-1 font-mono">
                    {endpoint.reqMock}
                  </pre>
                ) : (
                  <div className="bg-gray-100 text-gray-400 p-4 rounded-lg text-xs flex-1 flex items-center justify-center italic">
                    No body required for this request.
                  </div>
                )}
              </div>

              {/* Response */}
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold uppercase text-gray-500 mb-2">Response Mock (JSON)</h3>
                <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-xs overflow-x-auto flex-1 font-mono">
                  {endpoint.resMock}
                </pre>
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
