import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';

/**
 * Auth feature routes (login, register, OTP).
 * Dependency Inversion: app.routes only depends on this module's routes, not every component.
 */
export const AUTH_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registerUser', component: RegisterUserComponent },
  { path: 'otp', component: OtpVerificationComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
