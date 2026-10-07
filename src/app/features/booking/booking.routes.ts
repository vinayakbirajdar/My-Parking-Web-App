import { Routes } from '@angular/router';
import { BookParkingComponent } from './book-parking/book-parking.component';
import { SelectLocationComponent } from './select-location/select-location.component';
import { SlotSelectionComponent } from './slot-selection/slot-selection.component';

/**
 * Booking feature routes: form → location → slots.
 */
export const BOOKING_ROUTES: Routes = [
  { path: 'book/:vehicleType', component: BookParkingComponent },
  { path: 'book/:vehicleType/location', component: SelectLocationComponent },
  { path: 'book/:vehicleType/location/slots', component: SlotSelectionComponent }
];
