/**
 * App-wide constants.
 * Open/Closed: add new values here instead of hardcoding inside components.
 */

import { DurationOption } from '../models/booking.model';
import { PaymentMethod } from '../models/payment.model';

/** Hardcoded OTP for demo (replace with API later) */
export const DEMO_OTP = '1234';

/** Demo login credentials (replace with API later) */
export const DEMO_LOGIN = {
  email: 'vsb@gmail.com',
  password: '123456'
};

/** Parking duration options */
export const DURATION_OPTIONS: DurationOption[] = [
  { value: '1', label: '1 hour' },
  { value: '2', label: '2 hours' },
  { value: '4', label: '4 hours' },
  { value: '8', label: '8 hours' },
  { value: 'full', label: 'Full day' }
];

/** Price by duration (₹). Used by Payment screen. */
export const PRICE_BY_DURATION: Record<string, number> = {
  '1': 25,
  '2': 50.6,
  '4': 100,
  '8': 180,
  full: 250
};

/** Available payment methods */
export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'upi', label: 'UPI', description: 'GPay, PhonePe, Paytm & other UPI apps', icon: '📱' },
  { id: 'card', label: 'Credit / Debit Card', description: 'Visa, Mastercard, RuPay', icon: '💳' },
  { id: 'netbanking', label: 'Net Banking', description: 'Pay using your bank account', icon: '🏦' },
  { id: 'wallet', label: 'Wallet', description: 'Paytm, Amazon Pay, etc.', icon: '👛' }
];

/** Display titles for payment forms */
export const PAYMENT_FORM_TITLES: Record<string, string> = {
  upi: 'UPI Payment',
  card: 'Card Payment',
  netbanking: 'Net Payment',
  wallet: 'Wallet Payment'
};
