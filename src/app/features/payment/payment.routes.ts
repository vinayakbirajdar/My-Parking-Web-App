import { Routes } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';

/**
 * Payment feature routes.
 */
export const PAYMENT_ROUTES: Routes = [
  { path: 'payment', component: PaymentComponent },
  { path: 'payment/success', component: PaymentSuccessComponent }
];
