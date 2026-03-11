import { RateRequest, RateResponse, ShipmentRequest, ShipmentResponse, TrackingResponse, ShippingService } from './types';

export class FedExService implements ShippingService {
  private readonly baseUrl = 'https://apis-sandbox.fedex.com';
  private readonly apiKey = process.env.FEDEX_API_KEY;

  async getRates(request: RateRequest): Promise<RateResponse[]> {
    if (!this.apiKey) {
      console.warn('[FedEx] No API key found. Returning mock rates.');
      return [{ provider: 'FedEx', serviceLevel: 'Priority Overnight', totalPrice: 89.00, currency: 'USD', estimatedDeliveryDate: new Date(Date.now() + 86400000).toISOString() }];
    }

    const response = await fetch(`${this.baseUrl}/rate/v1/rates/quotes`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    
    if (!response.ok) throw new Error(`FedEx Rate API Error: ${response.statusText}`);
    return response.json();
  }

  async createShipment(request: ShipmentRequest): Promise<ShipmentResponse> {
    if (!this.apiKey) {
      console.warn('[FedEx] No API key found. Returning mock shipment.');
      return { provider: 'FedEx', trackingNumber: '779999999999', labelUrl: 'https://mock.fedex.com/label/77999', status: 'Created' };
    }

    const response = await fetch(`${this.baseUrl}/ship/v1/shipments`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });

    if (!response.ok) throw new Error(`FedEx Shipment API Error: ${response.statusText}`);
    return response.json();
  }

  async getTrackingStatus(trackingNumber: string): Promise<TrackingResponse> {
    if (!this.apiKey) {
      console.warn('[FedEx] No API key found. Returning mock tracking.');
      return { provider: 'FedEx', trackingNumber, status: 'Delivered', events: [{ timestamp: new Date().toISOString(), location: 'Customer Address', description: 'Left at front door' }] };
    }

    const response = await fetch(`${this.baseUrl}/track/v1/trackingnumbers`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ includeDetailedScans: true, trackingInfo: [{ trackingNumberInfo: { trackingNumber } }] })
    });

    if (!response.ok) throw new Error(`FedEx Tracking API Error: ${response.statusText}`);
    return response.json();
  }
}