import { NextResponse } from 'next/server';

/**
 * @api {post} /api/v1/logistics/tracking/update Update Tracking Status (Webhook)
 * @apiName UpdateTrackingWebhook
 * @apiGroup Logistics
 *
 * @apiParam {String} trackingNumber Unique Tracking Number
 * @apiParam {String} status Current Status (IN_TRANSIT, DELIVERED, etc.)
 * @apiSuccess {Boolean} success Acknowledgment
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || !body.trackingNumber || !body.status) {
      return NextResponse.json({
        success: false,
        error: "'trackingNumber' and 'status' are required fields."
      }, { status: 400 });
    }

    const { trackingNumber, status, timestamp, location, note } = body;

    // Here we would typically update our database, notify customer, etc.
    const validStatuses = ["PICKED_UP", "IN_TRANSIT", "OUT_FOR_DELIVERY", "DELIVERED", "EXCEPTION"];
    if (!validStatuses.includes(status)) {
       return NextResponse.json({
        success: false,
        error: `Invalid status. Valid options: ${validStatuses.join(", ")}`
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `Tracking status for ${trackingNumber} updated to ${status}.`,
      receivedAt: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Internal Server Error"
    }, { status: 500 });
  }
}
