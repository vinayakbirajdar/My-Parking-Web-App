import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CoreButtonComponent } from '../../../shared/components/core-button/core-button.component';
import { BookingFlowState } from '../../../shared/models/booking.model';

/**
 * Congrats screen after successful payment.
 * Passes booking flow state through to the ticket screen.
 */
@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule, CoreButtonComponent],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss'
})
export class PaymentSuccessComponent {
  flow: BookingFlowState = {};

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras?.state as BookingFlowState | undefined;
    this.flow = state ?? {};
  }

  viewTicket = () => {
    this.router.navigate(['/ticket'], { state: this.flow });
  };
}
