import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonInputComponent } from '../../Common/core-input/core-input.component';
import { CoreButtonComponent } from '../../Common/core-button/core-button.component';

@Component({
  selector: 'app-book-parking',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonInputComponent,
    CoreButtonComponent
  ],
  templateUrl: './book-parking.component.html',
  styleUrl: './book-parking.component.scss'
})
export class BookParkingComponent {
  vehicleType: string = '';

  bookForm = new FormGroup({
    registrationNumber: new FormControl(''),
    company: new FormControl(''),
    model: new FormControl(''),
    vehicleColor: new FormControl(''),
    expectedDuration: new FormControl(''),
    driverName: new FormControl(''),
    contactNumber: new FormControl(''),
    entryDate: new FormControl(''),
    entryTime: new FormControl(''),
    specialRequirements: new FormControl('')
  });

  durationOptions = [
    { value: '1', label: '1 hour' },
    { value: '2', label: '2 hours' },
    { value: '4', label: '4 hours' },
    { value: '8', label: '8 hours' },
    { value: 'full', label: 'Full day' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.vehicleType = this.route.snapshot.paramMap.get('vehicleType') ?? '';
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  getDurationLabel(value: string): string {
    const opt = this.durationOptions.find(o => o.value === value);
    return opt ? opt.label : value || '';
  }

  /** Enable Book button only when required fields are filled */
  get canBook(): boolean {
    const v = this.bookForm.value;
    const hasRegistration = !!v.registrationNumber?.trim();
    const hasDriver = !!v.driverName?.trim();
    const hasContact = !!v.contactNumber?.trim();
    const hasDuration = !!v.expectedDuration;
    return hasRegistration && hasDriver && hasContact && hasDuration;
  }

  /** Arrow function so 'this' is correct when passed to core-button as [onClick] */
  onSubmit = () => {
    const value = this.bookForm.value;
    this.router.navigate(['/book', this.vehicleType, 'location'], {
      state: { booking: value }
    });
  };
}
