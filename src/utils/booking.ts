/**
 * Coupon types supported by Minor Cineplex booking system
 */
export type DiscountType =
  | 'discount_percentage'
  | 'discount_amount'
  | 'fixed_price'
  | 'free_ticket'
  | 'buy_one_get_one';

export interface Coupon {
  discount_type: DiscountType;
  discount_value?: number;
}

/**
 * Calculates the final price after applying a coupon discount.
 * Mirrors the discount logic used in the Minor Cineplex backend.
 *
 * @param originalPrice - The ticket price before discount
 * @param coupon - The coupon object, or null/undefined if none
 * @returns The final price (never negative)
 */
export function calculateDiscount(originalPrice: number, coupon: Coupon | null | undefined): number {
  if (!coupon) return originalPrice;

  let discount = 0;

  switch (coupon.discount_type) {
    case 'discount_percentage':
      discount = (originalPrice * (coupon.discount_value ?? 0)) / 100;
      break;
    case 'discount_amount':
      discount = coupon.discount_value ?? 0;
      break;
    case 'fixed_price':
      return Math.max(0, coupon.discount_value ?? 0);
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
