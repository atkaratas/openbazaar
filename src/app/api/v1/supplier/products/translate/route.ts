import { NextResponse } from 'next/server';
import { localizeProductData } from '@/services/ai/localization';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, title, description, ingredients, allergens } = body;

    if (!productId || !title || !description) {
      return NextResponse.json({ error: 'Missing required fields (productId, title, description)' }, { status: 400 });
    }

    // Otonom Çeviri Servisini Çağır
    const translations = await localizeProductData(title, description, ingredients, allergens);

    // Prisma'daki JSON sütunlarını güncelle
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        titleTranslations: translations.titleTranslations,
        descriptionTranslations: translations.descriptionTranslations,
        ingredientsTranslations: translations.ingredientsTranslations ?? {},
        allergensTranslations: translations.allergensTranslations ?? {},
      }
    });

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error('Localization Error:', error);
    return NextResponse.json({ error: 'Failed to process autonomous localization' }, { status: 500 });
  }
}
