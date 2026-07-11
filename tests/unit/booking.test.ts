import { describe, it, expect } from 'vitest';
import { calculateDiscount } from '../../src/utils/booking';

describe('Booking Logic - calculateDiscount', () => {

  it('should return original price when no coupon is provided', () => {
    const result = calculateDiscount(1000, null);
    expect(result).toBe(1000);
  });

  it('should apply percentage discount correctly', () => {
    const coupon = { discount_type: 'discount_percentage' as const, discount_value: 10 }; // 10%
    const result = calculateDiscount(1000, coupon);
    expect(result).toBe(900);
  });

  it('should apply fixed amount discount correctly', () => {
    const coupon = { discount_type: 'discount_amount' as const, discount_value: 100 };
    const result = calculateDiscount(1000, coupon);
    expect(result).toBe(900);
  });

  it('should return 0 for free ticket', () => {
    const coupon = { discount_type: 'free_ticket' as const };
    const result = calculateDiscount(1000, coupon);
    expect(result).toBe(0);
  });

  it('should not return negative price', () => {
    const coupon = { discount_type: 'discount_amount' as const, discount_value: 1500 };
    const result = calculateDiscount(1000, coupon);
    expect(result).toBe(0);
  });

  it('should apply buy-one-get-one (50% off) correctly', () => {
    const coupon = { discount_type: 'buy_one_get_one' as const };
    const result = calculateDiscount(1000, coupon);
    expect(result).toBe(500);
  });

  it('should return fixed price for fixed_price coupon type', () => {
    const coupon = { discount_type: 'fixed_price' as const, discount_value: 199 };
    const result = calculateDiscount(1000, coupon);
    expect(result).toBe(199);
  });

});
