import { NextResponse } from 'next/server';
import { trackUserActivity } from '@/lib/tracker';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions as any) as any;
    if (!session?.user) {
      return NextResponse.json({ success: true, message: 'Guest tracked locally' });
    }

    const body = await req.json();
    const { action, productId, metadata } = body;

    await trackUserActivity(session.user.id, action, productId, metadata);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
