import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreButtonComponent } from '../../../shared/components/core-button/core-button.component';
import {
  ConfirmPopupComponent,
  ConfirmPopupDetail
} from '../../../shared/components/confirm-popup/confirm-popup.component';

/** Slot status for the visual parking map */
export type SlotStatus = 'occupied' | 'available' | 'selected';

export interface ParkingSlot {
  id: string;
  number: string;
  status: SlotStatus;
}

export interface SlotBlock {
  id: string;
  name: string;
  leftSlots: ParkingSlot[];
  rightSlots: ParkingSlot[];
}

@Component({
  selector: 'app-slot-selection',
  standalone: true,
  imports: [CommonModule, CoreButtonComponent, ConfirmPopupComponent],
  templateUrl: './slot-selection.component.html',
  styleUrl: './slot-selection.component.scss'
})
export class SlotSelectionComponent {
  vehicleType: string = '';
  locationName: string = '';
  locationInfo: { id: string; name: string; address: string } | null = null;
  bookingState: Record<string, unknown> | null = null;

  selectedSlotId: string | null = null;
  showConfirmPopup = false;
  confirmPopupDetails: ConfirmPopupDetail[] = [];

  /** Each block = 10 parks (5 left + 5 right). More blocks = add to array; they flow right then below. */
  slotBlocks: SlotBlock[] = [
    {
      id: 'B1',
      name: 'Block A',
      leftSlots: [
        { id: 'B1-L1', number: '01', status: 'occupied' },
        { id: 'B1-L2', number: '02', status: 'available' },
        { id: 'B1-L3', number: '03', status: 'available' },
        { id: 'B1-L4', number: '04', status: 'occupied' },
        { id: 'B1-L5', number: '05', status: 'available' }
      ],
      rightSlots: [
        { id: 'B1-R1', number: '06', status: 'available' },
        { id: 'B1-R2', number: '07', status: 'occupied' },
        { id: 'B1-R3', number: '08', status: 'available' },
        { id: 'B1-R4', number: '09', status: 'available' },
        { id: 'B1-R5', number: '10', status: 'occupied' }
      ]
    },
    {
      id: 'B2',
      name: 'Block B',
      leftSlots: [
        { id: 'B2-L1', number: '11', status: 'available' },
        { id: 'B2-L2', number: '12', status: 'available' },
        { id: 'B2-L3', number: '13', status: 'occupied' },
        { id: 'B2-L4', number: '14', status: 'available' },
        { id: 'B2-L5', number: '15', status: 'available' }
      ],
      rightSlots: [
        { id: 'B2-R1', number: '16', status: 'occupied' },
        { id: 'B2-R2', number: '17', status: 'available' },
        { id: 'B2-R3', number: '18', status: 'available' },
        { id: 'B2-R4', number: '19', status: 'occupied' },
        { id: 'B2-R5', number: '20', status: 'available' }
      ]
    }
    // Add more blocks here; they will appear to the right, then wrap below
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { booking?: Record<string, unknown>; location?: { id: string; name: string; address: string } } | undefined;
    this.bookingState = state?.booking ?? null;
    this.locationInfo = state?.location ?? null;
    this.locationName = this.locationInfo?.name ?? 'Parking Zone';
  }

  ngOnInit() {
    this.vehicleType = this.route.snapshot.paramMap.get('vehicleType') ?? '';
  }

  get availableCount(): number {
    let count = 0;
    this.slotBlocks.forEach(b => {
      count += [...b.leftSlots, ...b.rightSlots].filter(s => s.status !== 'occupied').length;
    });
    return count;
  }

  getSlotsWithSelection(column: ParkingSlot[]): ParkingSlot[] {
    return column.map(s => ({
      ...s,
      status: s.id === this.selectedSlotId ? 'selected' : s.status
    }));
  }

  onSlotClick(slot: ParkingSlot) {
    if (slot.status === 'occupied') return;
    this.selectedSlotId = this.selectedSlotId === slot.id ? null : slot.id;
  }

  goBack() {
    this.router.navigate(['/book', this.vehicleType, 'location'], {
      state: { booking: this.bookingState }
    });
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  confirmBooking = () => {
    if (!this.selectedSlotId) return;
    this.confirmPopupDetails = this.buildBookingDetails();
    this.showConfirmPopup = true;
  };

  private buildBookingDetails(): ConfirmPopupDetail[] {
    const b = this.bookingState ?? {};
    const rows: ConfirmPopupDetail[] = [
      { label: 'Vehicle type', value: this.vehicleType || '—' },
      { label: 'Location', value: this.locationName || '—' },
      { label: 'Slot', value: this.selectedSlotId ?? '—' },
      { label: 'Registration', value: (b['registrationNumber'] as string) || '—' },
      { label: 'Driver', value: (b['driverName'] as string) || '—' },
      { label: 'Contact', value: (b['contactNumber'] as string) || '—' },
      { label: 'Duration', value: (b['expectedDuration'] as string) || '—' }
    ];
    return rows;
  }

  onPopupConfirm = () => {
    this.showConfirmPopup = false;
    this.router.navigate(['/payment'], {
      state: {
        booking: this.bookingState,
        location: this.locationInfo,
        slotId: this.selectedSlotId,
        vehicleType: this.vehicleType
      }
    });
  };

  onPopupCancel = () => {
    this.showConfirmPopup = false;
  };
}
