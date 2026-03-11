import { NextResponse } from 'next/server';

/**
 * @api {get} /api/v1/supplier/orders/pending Get Pending Supplier Orders
 * @apiName GetPendingOrders
 * @apiGroup Supplier
 *
 * @apiSuccess {Boolean} success API status
 * @apiSuccess {Array} orders List of pending orders
 */
export async function GET() {
  // Mock Data
  const mockOrders = [
    {
      id: "ORD-12345",
      status: "PENDING_SUPPLIER",
      createdAt: new Date().toISOString(),
      items: [
        { productId: "PROD-987", quantity: 2, price: 49.99 }
      ],
      shippingAddress: {
        name: "John Doe",
        city: "Istanbul",
        country: "Turkey"
      }
    },
    {
      id: "ORD-12346",
      status: "PENDING_SUPPLIER",
      createdAt: new Date().toISOString(),
      items: [
        { productId: "PROD-102", quantity: 1, price: 129.50 }
      ],
      shippingAddress: {
        name: "Jane Smith",
        city: "Ankara",
        country: "Turkey"
      }
    }
  ];

  return NextResponse.json({
    success: true,
    count: mockOrders.length,
    orders: mockOrders,
    timestamp: new Date().toISOString()
  });
}
