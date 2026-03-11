import { NextResponse } from 'next/server';
import { generateCommercialInvoice, generateWaybill, OrderData } from '@/services/documents/pdfGenerator';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { type, orderData } = body as { type: string; orderData: OrderData };

    if (!type || !orderData) {
      return NextResponse.json(
        { error: 'Missing type or orderData in request body' },
        { status: 400 }
      );
    }

    let pdfBuffer: Buffer;
    let fileName = 'document.pdf';

    if (type === 'invoice') {
      pdfBuffer = await generateCommercialInvoice(orderData);
      fileName = `invoice_${orderData.invoiceNumber}.pdf`;
    } else if (type === 'waybill') {
      pdfBuffer = await generateWaybill(orderData);
      fileName = `waybill_${orderData.invoiceNumber}.pdf`;
    } else {
      return NextResponse.json(
        { error: 'Invalid document type. Allowed types: invoice, waybill' },
        { status: 400 }
      );
    }

    // Convert Buffer to ArrayBuffer/Blob for Response
    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', `attachment; filename="${fileName}"`);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF document' },
      { status: 500 }
    );
  }
}