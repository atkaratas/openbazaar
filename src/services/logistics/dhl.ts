import { RateRequest, RateResponse, ShipmentRequest, ShipmentResponse, TrackingResponse, ShippingService } from './types';

export class DHLService implements ShippingService {
  private readonly baseUrl = 'https://api-mock.dhl.com/mydhlapi';
  private readonly apiKey = process.env.DHL_API_KEY;

  async getRates(request: RateRequest): Promise<RateResponse[]> {
    if (!this.apiKey) {
      console.warn('[DHL] No API key found. Returning mock rates.');
      return [{ provider: 'DHL', serviceLevel: 'Express Worldwide', totalPrice: 45.99, currency: 'USD', estimatedDeliveryDate: new Date(Date.now() + 86400000 * 3).toISOString() }];
    }

    const response = await fetch(`${this.baseUrl}/rates`, {
      method: 'POST',
      headers: { 'Authorization': `Basic ${this.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    
    if (!response.ok) throw new Error(`DHL Rate API Error: ${response.statusText}`);
    return response.json();
  }

  async createShipment(request: ShipmentRequest): Promise<ShipmentResponse> {
    if (!this.apiKey) {
      console.warn('[DHL] No API key found. Returning mock shipment.');
      return { provider: 'DHL', trackingNumber: 'DHL1234567890', labelUrl: 'https://mock.dhl.com/label/123', status: 'Created' };
    }

    const response = await fetch(`${this.baseUrl}/shipments`, {
      method: 'POST',
      headers: { 'Authorization': `Basic ${this.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });

    if (!response.ok) throw new Error(`DHL Shipment API Error: ${response.statusText}`);
    return response.json();
  }

  async getTrackingStatus(trackingNumber: string): Promise<TrackingResponse> {
    if (!this.apiKey) {
      console.warn('[DHL] No API key found. Returning mock tracking.');
      return { provider: 'DHL', trackingNumber, status: 'In Transit', events: [{ timestamp: new Date().toISOString(), location: 'Hub', description: 'Processed at Facility' }] };
    }

    const response = await fetch(`${this.baseUrl}/tracking?trackingNumber=${trackingNumber}`, {
      method: 'GET',
      headers: { 'Authorization': `Basic ${this.apiKey}`, 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error(`DHL Tracking API Error: ${response.statusText}`);
    return response.json();
  }
}