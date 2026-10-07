import { PRICE_BY_DURATION } from '../constants/app.constants';

/**
 * Calculates parking amount from expected duration.
 * Single Responsibility: pricing only.
 */
export function getParkingAmount(durationKey?: string): number {
  if (!durationKey) {
    return PRICE_BY_DURATION['2'];
  }
  return PRICE_BY_DURATION[durationKey] ?? PRICE_BY_DURATION['2'];
}

/** Formats amount as ₹ X.X */
export function formatAmount(amount: number): string {
  return `₹ ${amount.toFixed(1)}`;
}
