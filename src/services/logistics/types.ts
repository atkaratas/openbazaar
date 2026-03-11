export interface RateRequest {
  origin: { countryCode: string; postalCode: string; city: string };
  destination: { countryCode: string; postalCode: string; city: string };
  packages: Array<{ weight: number; length: number; width: number; height: number }>;
}

export interface RateResponse {
  provider: string;
  serviceLevel: string;
  totalPrice: number;
  currency: string;
  estimatedDeliveryDate?: string;
}

export interface ShipmentRequest extends RateRequest {
  shipper: { name: string; phone: string; email: string };
  receiver: { name: string; phone: string; email: string };
}

export interface ShipmentResponse {
  provider: string;
  trackingNumber: string;
  labelUrl: string;
  status: string;
}

export interface TrackingResponse {
  provider: string;
  trackingNumber: string;
  status: string;
  events: Array<{ timestamp: string; location: string; description: string }>;
}

export interface ShippingService {
  getRates(request: RateRequest): Promise<RateResponse[]>;
  createShipment(request: ShipmentRequest): Promise<ShipmentResponse>;
  getTrackingStatus(trackingNumber: string): Promise<TrackingResponse>;
}