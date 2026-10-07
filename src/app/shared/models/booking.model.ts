/**
 * Shared booking models.
 * Keep data shapes in one place so every feature uses the same types.
 */

/** Vehicle types offered on the Home screen */
export type VehicleType = 'car' | 'bike' | 'heavy';

/** Form data collected on the Book Parking screen */
export interface BookingFormData {
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

/** Parking location selected by the user */
export interface ParkingLocation {
  id: string;
  name: string;
  address: string;
  distance?: string;
  slots?: number;
}

/**
 * Router state passed across booking → payment → ticket screens.
 * Single Responsibility: only describes navigation payload.
 */
export interface BookingFlowState {
  booking?: BookingFormData;
  location?: ParkingLocation;
  slotId?: string;
  vehicleType?: string;
  amount?: number;
}

/** Duration option shown in the book-parking dropdown */
export interface DurationOption {
  value: string;
  label: string;
}
