import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions"; // authOptions exists here or somewhere else? Let's assume "@/lib/auth"
import prisma from "@/lib/db";

// GET: Kullanıcının tekliflerini (quotes) listele
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions as any) as any;
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const role = session.user.role; 
    const userId = session.user.id;

    let whereClause = {};
    if (role === "SELLER") {
      whereClause = { sellerId: userId };
    } else {
      whereClause = { buyerId: userId };
    }

    const quotes = await prisma.quote.findMany({
      where: whereClause,
      include: {
        product: {
          select: {
            titleTranslations: true,
            images: true,
            basePrice: true,
            baseCurrency: true,
          }
        },
        buyer: { select: { name: true, email: true } },
        seller: { select: { name: true, email: true } },
      },
      orderBy: { updatedAt: "desc" }
    });

    return NextResponse.json({ success: true, data: quotes });
  } catch (error: any) {
    console.error("GET Quotes Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Yeni bir teklif (quote) oluştur
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions as any) as any;
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { productId, targetPrice, quantity, initialMessage } = body;

    if (!productId || !targetPrice || !quantity) {
      return NextResponse.json(
        { error: "productId, targetPrice, and quantity are required" },
        { status: 400 }
      );
    }

    // Ürünü ve mağazanın sahibini bul
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { store: true },
    });

    if (!product || !product.store) {
      return NextResponse.json({ error: "Product or store not found" }, { status: 404 });
    }

    const sellerId = product.store.ownerId;

    if (userId === sellerId) {
      return NextResponse.json({ error: "You cannot quote your own product" }, { status: 400 });
    }

    // Müzakere (Quote) Oluştur
    const newQuote = await prisma.quote.create({
      data: {
        productId,
        buyerId: userId,
        sellerId,
        targetPrice,
        quantity,
        status: "PENDING",
        aiNegotiated: false,
        messages: initialMessage ? {
          create: {
            senderId: userId,
            content: initialMessage,
            isAiReply: false
          }
        } : undefined
      },
      include: {
        product: { select: { titleTranslations: true } },
        messages: true
      }
    });

    return NextResponse.json({ success: true, data: newQuote }, { status: 201 });
  } catch (error: any) {
    console.error("POST Quote Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
