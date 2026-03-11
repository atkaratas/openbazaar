import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_123', {
  apiVersion: '2023-10-16' as any,
});

/**
 * Creates a B2B Escrow Payment Intent.
 * Funds are collected on the platform account and linked to a transfer group.
 */
export async function createB2BEscrowPayment(
  amount: number, // in cents
  currency: string,
  orderId: string,
  customerId?: string
) {
  // We lock the funds in the platform account by not specifying transfer_data immediately.
  // Instead, we use a transfer_group to link future transfers to this payment.
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    customer: customerId,
    transfer_group: `ORDER_${orderId}`,
    capture_method: 'automatic', // Funds are captured into the platform's escrow
    metadata: {
      orderId,
      escrowType: 'B2B_MILESTONE',
    },
  });

  return paymentIntent;
}

/**
 * Releases Milestone 1 (30% Advance for Production)
 * Triggered when order is approved / production starts.
 */
export async function releaseAdvanceMilestone(
  orderId: string,
  sellerStripeAccountId: string,
  totalAmount: number // Total order amount in cents
) {
  const advanceAmount = Math.floor(totalAmount * 0.30); // 30%

  const transfer = await stripe.transfers.create({
    amount: advanceAmount,
    currency: 'usd', // Should match the original payment intent currency
    destination: sellerStripeAccountId,
    transfer_group: `ORDER_${orderId}`,
    metadata: {
      orderId,
      milestone: 'MILESTONE_1_ADVANCE',
      percentage: '30',
    },
  });

  return transfer;
}

/**
 * Releases Milestone 2 (70% Final upon Delivery)
 * Triggered via logistics webhook when goods are delivered.
 */
export async function releaseFinalMilestone(
  orderId: string,
  sellerStripeAccountId: string,
  totalAmount: number
) {
  const finalAmount = totalAmount - Math.floor(totalAmount * 0.30); // Remaining 70%

  const transfer = await stripe.transfers.create({
    amount: finalAmount,
    currency: 'usd',
    destination: sellerStripeAccountId,
    transfer_group: `ORDER_${orderId}`,
    metadata: {
      orderId,
      milestone: 'MILESTONE_2_FINAL',
      percentage: '70',
    },
  });

  return transfer;
}
