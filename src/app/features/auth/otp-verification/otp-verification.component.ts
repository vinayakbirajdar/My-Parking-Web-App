import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreButtonComponent } from '../../../shared/components/core-button/core-button.component';
import { CoreTitleComponent } from '../../../shared/components/core-title/core-title.component';
import { DEMO_OTP } from '../../../shared/constants/app.constants';

/**
 * OTP verification screen.
 * Demo OTP is DEMO_OTP ("1234") until a real SMS API is connected.
 */
@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [ReactiveFormsModule, CoreButtonComponent, CoreTitleComponent],
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.scss'
})
export class OtpVerificationComponent {
  errorMessage = '';

  otpForm = new FormGroup({
    digit1: new FormControl(''),
    digit2: new FormControl(''),
    digit3: new FormControl(''),
    digit4: new FormControl('')
  });

  constructor(private router: Router) {}

  /** Joins the 4 digit boxes into one string */
  private getOtpValue(): string {
    const v = this.otpForm.value;
    return `${v.digit1 || ''}${v.digit2 || ''}${v.digit3 || ''}${v.digit4 || ''}`.trim();
  }

  onVerify = () => {
    this.errorMessage = '';
    const entered = this.getOtpValue();

    if (entered.length !== 4) {
      this.errorMessage = 'Please enter all 4 digits';
      return;
    }

    if (entered !== DEMO_OTP) {
      this.errorMessage = `Invalid OTP. Try ${DEMO_OTP}`;
      return;
    }

    this.router.navigate(['/login']);
  };

  onResend = () => {
    this.errorMessage = '';
    alert(`OTP resent! Use ${DEMO_OTP} for demo.`);
  };
}
