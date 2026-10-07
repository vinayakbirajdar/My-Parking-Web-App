import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonInputComponent } from '../../../shared/components/core-input/core-input.component';
import { CoreButtonComponent } from '../../../shared/components/core-button/core-button.component';
import { CoreTitleComponent } from '../../../shared/components/core-title/core-title.component';
import { DEMO_LOGIN } from '../../../shared/constants/app.constants';

/**
 * Login screen.
 * Keeps only UI + navigation; credentials live in shared constants for now.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonInputComponent, ReactiveFormsModule, CoreButtonComponent, CoreTitleComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router) {}

  onSubmit = () => {
    const email = this.loginForm.value.email?.trim() || '';
    const password = this.loginForm.value.password || '';

    if (!email || !password) {
      alert('Email and password are mandatory');
      return;
    }

    if (email === DEMO_LOGIN.email && password === DEMO_LOGIN.password) {
      this.router.navigate(['/home']);
      return;
    }

    alert('Wrong Email or password');
  };

  handleCreateAccount = () => {
    this.router.navigate(['/registerUser']);
  };
}
