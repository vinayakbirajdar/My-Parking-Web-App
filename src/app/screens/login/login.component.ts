import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonInputComponent } from "../../Common/core-input/core-input.component";
import { CoreButtonComponent } from "../../Common/core-button/core-button.component";
import { CoreTitleComponent } from "../../Common/core-title/core-title.component";

@Component({
  selector: 'app-login',
  imports: [CommonInputComponent, ReactiveFormsModule, CoreButtonComponent, CoreTitleComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });


}


