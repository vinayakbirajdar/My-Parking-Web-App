import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonInputComponent } from "../../Common/core-input/core-input.component";
import { CoreButtonComponent } from "../../Common/core-button/core-button.component";
import { CoreTitleComponent } from "../../Common/core-title/core-title.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonInputComponent, ReactiveFormsModule, CoreButtonComponent, CoreTitleComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router) { }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  onSubmit = () => {
    console.log('Submit clicked');
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    if (email === 'vsb@gmail.com' && password === '123456') {
      this.router.navigate(['home']);
    } else if (!email || !password) {
      alert("wrong");
      console.log("Email and password are mandatory");
    } else {
      alert('Wrong Email or password');
    }
  };

  handleCreateAccount = () => {
    this.router.navigate(['/registerUser']);
  }


}


