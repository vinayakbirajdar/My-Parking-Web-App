import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showMessage = false;

  constructor(private router: Router) {}

  showGreeting() {
    this.showMessage = true;
  }

  onVehicleSelect(vehicleType: string) {
    this.router.navigate(['/book', vehicleType]);
  }
}
