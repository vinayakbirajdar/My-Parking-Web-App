import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonInputComponent } from '../../../shared/components/core-input/core-input.component';
import { CoreButtonComponent } from '../../../shared/components/core-button/core-button.component';
import { CoreTitleComponent } from '../../../shared/components/core-title/core-title.component';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonInputComponent,
    CoreButtonComponent,
    CoreTitleComponent
  ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {
  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    mobileNumber: new FormControl('')
  });

  constructor(private router: Router) {}

  onSubmit = () => {
    console.log('Register', this.registerForm.value);
    this.router.navigate(['/otp']);
  };
}
