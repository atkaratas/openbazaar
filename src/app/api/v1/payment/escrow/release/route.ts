import { NextResponse } from 'next/server';
import { releaseFinalMilestone, releaseAdvanceMilestone } from '../../../../../../services/payment/escrow';

// Secure API endpoint to handle escrow milestone releases
// Usually called by internal services, admin dashboards, or secure logistics webhooks
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    // Ensure the request is authorized using a secure token
    if (!process.env.ESCROW_API_SECRET || authHeader !== `Bearer ${process.env.ESCROW_API_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { orderId, sellerStripeAccountId, totalAmount, milestone } = body;

    if (!orderId || !sellerStripeAccountId || !totalAmount || !milestone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let transferResult;

    if (milestone === '1' || milestone === 'advance') {
      // Release 30% advance when production starts
      transferResult = await releaseAdvanceMilestone(orderId, sellerStripeAccountId, totalAmount);
    } else if (milestone === '2' || milestone === 'final') {
      // Release remaining 70% upon delivery confirmation
      transferResult = await releaseFinalMilestone(orderId, sellerStripeAccountId, totalAmount);
    } else {
      return NextResponse.json({ error: 'Invalid milestone specified' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      milestone,
      transferId: transferResult.id,
      amountReleased: transferResult.amount,
      message: `Milestone ${milestone} released successfully.`
    });
  } catch (error: any) {
    console.error('Escrow release error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
