/**
 * Shared public API (barrel file).
 * Features should import from 'shared' paths or this barrel — not dig into internals randomly.
 */

// Components
export { CoreButtonComponent } from './components/core-button/core-button.component';
export { CommonInputComponent } from './components/core-input/core-input.component';
export { CoreTitleComponent } from './components/core-title/core-title.component';
export { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';
export type { ConfirmPopupDetail } from './components/confirm-popup/confirm-popup.component';

// Models
export * from './models/booking.model';
export * from './models/payment.model';

// Constants
export * from './constants/app.constants';

// Utils
export * from './utils/pricing.util';
export * from './utils/format.util';
