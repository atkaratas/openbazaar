import Stripe from 'stripe';

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16', // Use the version compatible with your setup
});

export const createSplitPaymentSession = async ({
  totalAmount,
  currency,
  successUrl,
  cancelUrl,
  sellerAccountId,
  customerEmail,
  platformFeePercentage = 10,
  logisticsFee = 0, // e.g., DHL shipping cost in smallest currency unit (e.g., cents)
}: {
  totalAmount: number; // in cents
  currency: string;
  successUrl: string;
  cancelUrl: string;
  sellerAccountId: string;
  customerEmail?: string;
  platformFeePercentage?: number;
  logisticsFee?: number;
}) => {
  // Calculate platform commission and total application fee
  const platformFee = Math.round((totalAmount * platformFeePercentage) / 100);
  const totalApplicationFee = platformFee + logisticsFee; // Platform keeps its commission + shipping costs

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: 'OpenBazaar Order',
            },
            unit_amount: totalAmount,
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      payment_intent_data: {
        application_fee_amount: totalApplicationFee,
        transfer_data: {
          destination: sellerAccountId,
        },
      },
    });

    return { sessionId: session.id, sessionUrl: session.url };
  } catch (error) {
    console.error('Error creating Stripe Split Payment session:', error);
    throw error;
  }
};

export default stripe;