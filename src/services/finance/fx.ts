export interface ExchangeRates {
  [currencyCode: string]: number;
}

export interface LockedQuote {
  originalPrice: number;
  originalCurrency: string;
  lockedPrice: number;
  lockedCurrency: string;
  lockedExchangeRate: number;
  lockedAt: string;
}

/**
 * Dynamic FX Engine for real-time currency conversion and locking
 * Retrieves rates in TCMB/ECB format and caches them to avoid rate-limits.
 */
export class FXEngine {
  private static cache: ExchangeRates | null = null;
  private static lastFetchTime: number = 0;
  private static CACHE_TTL = 15 * 60 * 1000; // 15 minutes TTL

  /**
   * Fetches the latest exchange rates for TRY, EUR, USD, GBP.
   * Uses memory cache if TTL has not expired.
   */
  public static async getRates(): Promise<ExchangeRates> {
    const now = Date.now();
    
    // Return cached rates if valid
    if (this.cache && (now - this.lastFetchTime) < this.CACHE_TTL) {
      return this.cache;
    }

    try {
      // In production, this would be a real fetch to an API like exchangerate-api or TCMB
      // const response = await fetch('https://api.exchangerate-api.com/v4/latest/TRY');
      // const data = await response.json();
      // this.cache = data.rates;
      
      // Using mock data for TRY as base currency
      const mockRates: ExchangeRates = {
        TRY: 1.0000,
        USD: 0.0285,
        EUR: 0.0270,
        GBP: 0.0230
      };

      this.cache = mockRates;
      this.lastFetchTime = now;
      
      return this.cache;
    } catch (error) {
      console.error('Failed to fetch FX rates, falling back to cache if available', error);
      if (this.cache) return this.cache;
      throw new Error('FX Service unavailable');
    }
  }

  /**
   * Converts a price from a base currency to a target currency and locks the rate.
   * This is meant to be used at cart or checkout time to freeze the price.
   * 
   * @param basePrice The price in the seller's base currency
   * @param baseCurrency The seller's base currency (e.g., 'TRY')
   * @param targetCurrency The target currency for the buyer (e.g., 'EUR')
   * @returns LockedQuote object with frozen pricing details
   */
  public static async convertAndLockPrice(
    basePrice: number, 
    baseCurrency: string = 'TRY', 
    targetCurrency: string = 'EUR'
  ): Promise<LockedQuote> {
    const rates = await this.getRates();
    
    const baseRate = rates[baseCurrency];
    const targetRate = rates[targetCurrency];
    
    if (baseRate === undefined || targetRate === undefined) {
      throw new Error('Unsupported currency requested');
    }

    // Calculate cross rate
    // Example: TRY base (1.0) -> EUR target (0.0270)
    // Rate: 0.0270 / 1.0 = 0.0270
    const crossRate = targetRate / baseRate;
    const finalPrice = basePrice * crossRate;
    
    return {
      originalPrice: basePrice,
      originalCurrency: baseCurrency,
      lockedPrice: Number(finalPrice.toFixed(2)),
      lockedCurrency: targetCurrency,
      lockedExchangeRate: crossRate,
      lockedAt: new Date().toISOString()
    };
  }
}
