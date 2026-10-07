/**
 * Payment method types used on the Payment screen.
 */

export type PaymentMethodId = 'upi' | 'card' | 'netbanking' | 'wallet';

export interface PaymentMethod {
  id: PaymentMethodId;
  label: string;
  description: string;
  icon: string;
}
