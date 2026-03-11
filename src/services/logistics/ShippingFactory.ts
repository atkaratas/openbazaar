import { ShippingService } from './types';
import { DHLService } from './dhl';
import { UPSService } from './ups';
import { FedExService } from './fedex';

export type ShippingProvider = 'DHL' | 'UPS' | 'FEDEX';

export class ShippingFactory {
  static getProvider(provider: ShippingProvider): ShippingService {
    switch (provider.toUpperCase()) {
      case 'DHL':
        return new DHLService();
      case 'UPS':
        return new UPSService();
      case 'FEDEX':
        return new FedExService();
      default:
        throw new Error(`Unsupported shipping provider: ${provider}`);
    }
  }
}
