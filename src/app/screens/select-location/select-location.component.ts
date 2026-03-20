import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonInputComponent } from '../../Common/core-input/core-input.component';

export interface BookingState {
  registrationNumber?: string;
  company?: string;
  model?: string;
  vehicleColor?: string;
  expectedDuration?: string;
  driverName?: string;
  contactNumber?: string;
  entryDate?: string;
  entryTime?: string;
  specialRequirements?: string;
}

@Component({
  selector: 'app-select-location',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CommonInputComponent],
  templateUrl: './select-location.component.html',
  styleUrl: './select-location.component.scss'
})
export class SelectLocationComponent {
  vehicleType: string = '';
  bookingState: BookingState | null = null;

  searchControl = new FormControl('');

  recentLocations = [
    { id: '1', name: 'Mumbai Central Parking', address: 'Mumbai Central, Mumbai', distance: '2 km' },
    { id: '2', name: 'Andheri West Multi-level', address: 'Andheri West, Mumbai', distance: '5 km' },
    { id: '3', name: 'Bandra Kurla Complex', address: 'BKC, Mumbai', distance: '8 km' }
  ];

  nearbyLocations = [
    { id: 'n1', name: 'Nearest Mall Parking', address: 'Link Rd, Andheri', distance: '0.5 km', slots: 12 },
    { id: 'n2', name: 'Street Parking Zone A', address: 'SV Rd, Andheri', distance: '1.2 km', slots: 8 },
    { id: 'n3', name: 'Metro Station Parking', address: 'Andheri Metro', distance: '1.8 km', slots: 24 }
  ];

  filteredRecent: typeof this.recentLocations = [];
  filteredNearby: typeof this.nearbyLocations = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    const nav = this.router.getCurrentNavigation();
    this.bookingState = nav?.extras?.state?.['booking'] ?? null;
  }

  ngOnInit() {
    this.vehicleType = this.route.snapshot.paramMap.get('vehicleType') ?? '';
    this.filteredRecent = [...this.recentLocations];
    this.filteredNearby = [...this.nearbyLocations];

    this.searchControl.valueChanges.subscribe(term => {
      const q = (term ?? '').toLowerCase().trim();
      if (!q) {
        this.filteredRecent = [...this.recentLocations];
        this.filteredNearby = [...this.nearbyLocations];
        return;
      }
      this.filteredRecent = this.recentLocations.filter(
        l => l.name.toLowerCase().includes(q) || l.address.toLowerCase().includes(q)
      );
      this.filteredNearby = this.nearbyLocations.filter(
        l => l.name.toLowerCase().includes(q) || l.address.toLowerCase().includes(q)
      );
    });
  }

  goBack() {
    this.router.navigate(['/book', this.vehicleType]);
  }

  selectLocation = (location: { id: string; name: string; address: string }) => {
    this.router.navigate(['/book', this.vehicleType, 'location', 'slots'], {
      state: { booking: this.bookingState, location }
    });
  };
}
