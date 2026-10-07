import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CoreButtonComponent } from '../../../shared/components/core-button/core-button.component';
import { CommonInputComponent } from '../../../shared/components/core-input/core-input.component';
import { BookingFlowState } from '../../../shared/models/booking.model';
import { PaymentMethodId } from '../../../shared/models/payment.model';
import {
  PAYMENT_FORM_TITLES,
  PAYMENT_METHODS
} from '../../../shared/constants/app.constants';
import { formatAmount, getParkingAmount } from '../../../shared/utils/pricing.util';

/**
 * Payment screen – select method, then fill simple form, then pay.
 * Business rules (price, methods) live in shared constants/utils.
 */
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CoreButtonComponent, CommonInputComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  flow: BookingFlowState = {};
  step: 'method' | 'form' = 'method';
  selectedMethod: PaymentMethodId = 'upi';
  paymentMethods = PAYMENT_METHODS;

  upiForm = new FormGroup({
    upiId: new FormControl('')
  });

  cardForm = new FormGroup({
    cardNumber: new FormControl(''),
    expiryMonth: new FormControl(''),
    expiryYear: new FormControl(''),
    cvv: new FormControl(''),
    name: new FormControl(''),
    saveCard: new FormControl(false)
  });

  netBankingForm = new FormGroup({
    bankName: new FormControl(''),
    mobileNumber: new FormControl(''),
    otp1: new FormControl(''),
    otp2: new FormControl(''),
    otp3: new FormControl(''),
    otp4: new FormControl('')
  });

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras?.state as BookingFlowState | undefined;
    this.flow = state ?? {};
  }

  get vehicleType(): string {
    return this.flow.vehicleType || 'car';
  }

  get amount(): number {
    return getParkingAmount(this.flow.booking?.expectedDuration);
  }

  get amountFormatted(): string {
    return formatAmount(this.amount);
  }

  get payButtonLabel(): string {
    const method = this.paymentMethods.find(m => m.id === this.selectedMethod);
    return method ? `Pay via ${method.label}` : 'Pay';
  }

  get formTitle(): string {
    return PAYMENT_FORM_TITLES[this.selectedMethod] || 'Payment';
  }

  goBack() {
    if (this.step === 'form') {
      this.step = 'method';
      return;
    }
    this.router.navigate(['/book', this.vehicleType, 'location', 'slots'], {
      state: { booking: this.flow.booking, location: this.flow.location }
    });
  }

  selectMethod(id: PaymentMethodId) {
    this.selectedMethod = id;
  }

  continueToForm = () => {
    this.step = 'form';
  };

  onPay = () => {
    this.router.navigate(['/payment/success'], {
      state: {
        ...this.flow,
        amount: this.amount
      }
    });
  };
}
