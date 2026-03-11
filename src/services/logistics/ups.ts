import { RateRequest, RateResponse, ShipmentRequest, ShipmentResponse, TrackingResponse, ShippingService } from './types';

export class UPSService implements ShippingService {
  private readonly baseUrl = 'https://onlinetools.ups.com/api';
  private readonly apiKey = process.env.UPS_API_KEY;

  async getRates(request: RateRequest): Promise<RateResponse[]> {
    if (!this.apiKey) {
      console.warn('[UPS] No API key found. Returning mock rates.');
      return [{ provider: 'UPS', serviceLevel: 'Ground', totalPrice: 32.50, currency: 'USD', estimatedDeliveryDate: new Date(Date.now() + 86400000 * 5).toISOString() }];
    }

    const response = await fetch(`${this.baseUrl}/rating/v2403/Shop`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    
    if (!response.ok) throw new Error(`UPS Rate API Error: ${response.statusText}`);
    return response.json();
  }

  async createShipment(request: ShipmentRequest): Promise<ShipmentResponse> {
    if (!this.apiKey) {
      console.warn('[UPS] No API key found. Returning mock shipment.');
      return { provider: 'UPS', trackingNumber: '1Z9999999999999999', labelUrl: 'https://mock.ups.com/label/1Z999', status: 'Created' };
    }

    const response = await fetch(`${this.baseUrl}/shipments/v2403/ship`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });

    if (!response.ok) throw new Error(`UPS Shipment API Error: ${response.statusText}`);
    return response.json();
  }

  async getTrackingStatus(trackingNumber: string): Promise<TrackingResponse> {
    if (!this.apiKey) {
      console.warn('[UPS] No API key found. Returning mock tracking.');
      return { provider: 'UPS', trackingNumber, status: 'Out for Delivery', events: [{ timestamp: new Date().toISOString(), location: 'Local Facility', description: 'Loaded on delivery vehicle' }] };
    }

    const response = await fetch(`${this.baseUrl}/track/v1/details/${trackingNumber}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error(`UPS Tracking API Error: ${response.statusText}`);
    return response.json();
  }
}