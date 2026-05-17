import { describe, it, expect } from 'vitest';

// ในโปรเจกต์แยก เราอาจจะจำลองฟังก์ชันมาเทสเพื่อโชว์ Skill การเขียน Unit Test
// หรือ Import มาจาก server จริงๆ ก็ได้
// สมมติว่าเรายกฟังก์ชัน calculateDiscount มาทดสอบที่นี่

function calculateDiscount(originalPrice: number, coupon: any): number {
  if (!coupon) return originalPrice;

  let discount = 0;

  switch (coupon.discount_type) {
    case 'discount_percentage':
      discount = (originalPrice * coupon.discount_value) / 100;
      break;
    case 'discount_amount':
      discount = coupon.discount_value;
      break;
    case 'fixed_price':
      return Math.max(0, coupon.discount_value);
    case 'free_ticket':
      return 0;
    case 'buy_one_get_one':
      discount = originalPrice / 2;
      break;
    default:
      discount = 0;
  }

  return Math.max(0, originalPrice - discount);
}

describe('Booking Logic - calculateDiscount', () => {

  it('should return original price when no coupon is provided', () => {
    const result = calculateDiscount(1000, null);
    expect(result).toBe(1000);
  });

  it('should apply percentage discount correctly', () => {
    const coupon = { discount_type: 'discount_percentage', discount_value: 10 }; // 10%
    const result = calculateDiscount(1000, coupon);
    expect(result).toBe(900);
  });

  it('should apply fixed amount discount correctly', () => {
    const coupon = { discount_type: 'discount_amount', discount_value: 100 };
    const result = calculateDiscount(1000, coupon);
    expect(result).toBe(900);
  });

  it('should return 0 for free ticket', () => {
    const coupon = { discount_type: 'free_ticket' };
    const result = calculateDiscount(1000, coupon);
    expect(result).toBe(0);
  });

  it('should not return negative price', () => {
    const coupon = { discount_type: 'discount_amount', discount_value: 1500 };
    const result = calculateDiscount(1000, coupon);
    expect(result).toBe(0);
  });

});
