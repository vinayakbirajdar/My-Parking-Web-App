import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingFlowState } from '../../../shared/models/booking.model';
import {
  formatDisplayDate,
  formatDuration,
  formatPhoneMasked,
  formatSlotNumber,
  formatTimeRange,
  formatVehicleLabel
} from '../../../shared/utils/format.util';

/**
 * Parking ticket screen.
 * Display formatting is delegated to shared utils (keeps this class simple).
 */
@Component({
  selector: 'app-parking-ticket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './parking-ticket.component.html',
  styleUrl: './parking-ticket.component.scss'
})
export class ParkingTicketComponent {
  flow: BookingFlowState = {};
  view: 'ticket' | 'scanned' = 'ticket';
  timerHours = 2;
  timerMins = 0;

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras?.state as BookingFlowState | undefined;
    this.flow = state ?? {};
  }

  get qrImageUrl(): string {
    const data = JSON.stringify({
      slotId: this.flow.slotId,
      locationId: this.flow.location?.id,
      driver: this.flow.booking?.driverName,
      vehicle: this.flow.vehicleType,
      registration: this.flow.booking?.registrationNumber
    });
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`;
  }

  get driverName(): string {
    return this.flow.booking?.driverName || '—';
  }

  get vehicleLabel(): string {
    return formatVehicleLabel(this.flow.vehicleType);
  }

  get parkingArea(): string {
    return this.flow.location?.name || '—';
  }

  get slotNumber(): string {
    return formatSlotNumber(this.flow.slotId);
  }

  get entryDate(): string {
    return formatDisplayDate(this.flow.booking?.entryDate);
  }

  get duration(): string {
    return formatDuration(this.flow.booking?.expectedDuration);
  }

  get timeRange(): string {
    return formatTimeRange(this.flow.booking?.entryTime, this.flow.booking?.expectedDuration);
  }

  get phone(): string {
    return formatPhoneMasked(this.flow.booking?.contactNumber);
  }

  goHome = () => this.router.navigate(['/home']);

  navigateToLocation = () => {
    const address = this.flow.location?.address;
    if (!address) return;
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
      '_blank'
    );
  };

  markAsScanned = () => {
    this.view = 'scanned';
  };
}
