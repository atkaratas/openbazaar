import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const sellers = await prisma.store.findMany({
      include: { owner: { select: { email: true, name: true } } },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, sellers });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { id, action, reason } = await req.json();

    if (!id || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ success: false, error: 'Invalid parameters' }, { status: 400 });
    }

    if (action === 'approve') {
      const store = await prisma.store.update({
        where: { id },
        data: { isVerified: true }
      });
      return NextResponse.json({ success: true, store, message: 'Store approved' });
    } else if (action === 'reject') {
      // In a real app, you might email the user the reason, or set a rejected status.
      // We'll just delete the unverified store for this simulation
      await prisma.store.delete({
        where: { id }
      });
      return NextResponse.json({ success: true, message: \`Store rejected. Reason: \${reason}\` });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
