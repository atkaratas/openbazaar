import PDFDocument from 'pdfkit';

export interface PartyDetails {
  name: string;
  address: string;
  taxId?: string;
  contact?: string;
}

export interface OrderItem {
  description: string;
  englishTranslation: string;
  hsCode: string; // GTIP
  weightKg: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderData {
  invoiceNumber: string;
  date: string;
  seller: PartyDetails;
  buyer: PartyDetails;
  items: OrderItem[];
  currency: string;
  totalAmount: number;
  totalWeight: number;
  incoterms?: string;
  reasonForExport?: string;
}

export async function generateCommercialInvoice(order: OrderData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      // Header
      doc.fontSize(20).text('COMMERCIAL INVOICE', { align: 'center' });
      doc.moveDown();

      // Invoice Details
      doc.fontSize(10).text(`Invoice No: ${order.invoiceNumber}`, { align: 'right' });
      doc.text(`Date: ${order.date}`, { align: 'right' });
      doc.moveDown();

      // Seller & Buyer Info (Side by Side)
      doc.text('SELLER / EXPORTER:', 50, 150, { underline: true });
      doc.text(order.seller.name, 50, 165);
      doc.text(order.seller.address, 50, 180);
      if (order.seller.taxId) doc.text(`Tax ID: ${order.seller.taxId}`, 50, 195);
      if (order.seller.contact) doc.text(`Contact: ${order.seller.contact}`, 50, 210);

      doc.text('BUYER / IMPORTER:', 300, 150, { underline: true });
      doc.text(order.buyer.name, 300, 165);
      doc.text(order.buyer.address, 300, 180);
      if (order.buyer.taxId) doc.text(`Tax ID: ${order.buyer.taxId}`, 300, 195);
      if (order.buyer.contact) doc.text(`Contact: ${order.buyer.contact}`, 300, 210);

      // Line items table header
      let y = 250;
      doc.fontSize(10).font('Helvetica-Bold');
      doc.text('Description (EN)', 50, y);
      doc.text('HS Code', 200, y);
      doc.text('Qty', 270, y);
      doc.text('Weight', 320, y);
      doc.text('Unit Price', 380, y);
      doc.text('Total', 480, y);
      doc.moveTo(50, y + 15).lineTo(550, y + 15).stroke();

      y += 20;
      doc.font('Helvetica');

      // Line items
      order.items.forEach(item => {
        doc.text(item.englishTranslation, 50, y, { width: 140 });
        doc.text(item.hsCode, 200, y);
        doc.text(item.quantity.toString(), 270, y);
        doc.text(`${item.weightKg} kg`, 320, y);
        doc.text(`${item.unitPrice.toFixed(2)} ${order.currency}`, 380, y);
        doc.text(`${item.totalPrice.toFixed(2)} ${order.currency}`, 480, y);
        y += 20;
      });

      doc.moveTo(50, y).lineTo(550, y).stroke();
      y += 10;

      // Totals
      doc.font('Helvetica-Bold');
      doc.text(`Total Weight: ${order.totalWeight} kg`, 320, y);
      doc.text(`Total Amount: ${order.totalAmount.toFixed(2)} ${order.currency}`, 380, y);

      // Footer
      doc.moveDown(3);
      doc.font('Helvetica').fontSize(9);
      if (order.incoterms) doc.text(`Incoterms: ${order.incoterms}`);
      if (order.reasonForExport) doc.text(`Reason for Export: ${order.reasonForExport}`);
      
      doc.moveDown();
      doc.text('This invoice is generated automatically for ETGB customs declaration purposes.', { align: 'center' });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

export async function generateWaybill(order: OrderData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      // Header
      doc.fontSize(20).text('WAYBILL / CONSIGNMENT NOTE', { align: 'center' });
      doc.moveDown();

      doc.fontSize(10).text(`Reference No: ${order.invoiceNumber}-WB`, { align: 'right' });
      doc.text(`Date: ${order.date}`, { align: 'right' });
      doc.moveDown();

      // Shipper
      doc.fontSize(12).font('Helvetica-Bold').text('SHIPPER (FROM):');
      doc.font('Helvetica').fontSize(10);
      doc.text(order.seller.name);
      doc.text(order.seller.address);
      if (order.seller.contact) doc.text(`Contact: ${order.seller.contact}`);
      doc.moveDown();

      // Consignee
      doc.fontSize(12).font('Helvetica-Bold').text('CONSIGNEE (TO):');
      doc.font('Helvetica').fontSize(10);
      doc.text(order.buyer.name);
      doc.text(order.buyer.address);
      if (order.buyer.contact) doc.text(`Contact: ${order.buyer.contact}`);
      doc.moveDown();

      // Shipment details
      doc.fontSize(12).font('Helvetica-Bold').text('SHIPMENT DETAILS:');
      doc.font('Helvetica').fontSize(10);
      doc.text(`Total Pieces: ${order.items.reduce((sum, item) => sum + item.quantity, 0)}`);
      doc.text(`Total Gross Weight: ${order.totalWeight} kg`);
      doc.text(`Declared Value for Customs: ${order.totalAmount.toFixed(2)} ${order.currency}`);
      doc.moveDown();

      // Description
      const allDescriptions = order.items.map(i => i.englishTranslation).join(', ');
      doc.text(`Contents: ${allDescriptions}`);

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}