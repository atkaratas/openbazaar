import prisma from '@/lib/db';

export async function trackUserActivity(
  userId: string,
  action: 'VIEW_PRODUCT' | 'ADD_TO_CART' | 'REMOVE_FROM_CART' | 'PURCHASE' | 'SEARCH' | 'LOGIN' | 'SIGNUP',
  productId?: string,
  metadata?: any
) {
  try {
    await prisma.userActivity.create({
      data: {
        userId,
        action,
        productId,
        metadata: metadata ? JSON.stringify(metadata) : null,
      }
    });
  } catch (error) {
    console.error('CRM Tracking Error:', error);
  }
}
