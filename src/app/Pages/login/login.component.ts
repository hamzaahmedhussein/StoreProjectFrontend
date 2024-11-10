import { Component, inject, Inject, Injector } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private _authService: AuthService) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  } 
  
  onSubmit(){
    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.value).subscribe(
        (data) => {
          console.log('res', data);
        },
        (error) => {
          console.log('res', error);
        }
      );
    } else {
      console.log('Invalid form');
    }  }
}