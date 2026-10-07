import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { HOME_ROUTES } from './features/home/home.routes';
import { BOOKING_ROUTES } from './features/booking/booking.routes';
import { PAYMENT_ROUTES } from './features/payment/payment.routes';
import { TICKET_ROUTES } from './features/ticket/ticket.routes';
import { ACCOUNT_ROUTES } from './features/account/account.routes';

/**
 * Root routes.
 * Composition over duplication: each feature owns its routes (SOLID – SRP / DIP).
 */
export const routes: Routes = [
  // Auth area (no sidebar)
  {
    path: '',
    component: AuthLayoutComponent,
    children: AUTH_ROUTES
  },
  // Main app area (with sidebar)
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      ...HOME_ROUTES,
      ...BOOKING_ROUTES,
      ...PAYMENT_ROUTES,
      ...TICKET_ROUTES,
      ...ACCOUNT_ROUTES
    ]
  },
  { path: '**', redirectTo: 'login' }
];
