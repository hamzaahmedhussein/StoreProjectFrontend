import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private auth =inject(AuthService);
  form: FormGroup;
  constructor(private fb: FormBuilder)
   {
    this.form = this.fb.group({
      displayName :new FormControl('',[Validators.required]),
      userType: new FormControl('0', [Validators.required]),
      email :new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required]),
      confirmPassword: new FormControl('',[Validators.required]),
      street: new FormControl('',[Validators.required]),
      city: new FormControl('',[Validators.required]),
      state: new FormControl('',[Validators.required]),
    });
  }

sellerRegister(){

  this.auth.registerSeller(this.form.value).subscribe(
    (response)=>{
           
      console.log(response);
    },
    (error)=>{
      console.log(error);
    }
  );
}
customerRegister(){

  this.auth.customerRegister(this.form.value).subscribe(
    (response)=>{
           
      console.log(response);
    },
    (error)=>{
      console.log(error);
    }
  );
}

 onSubmit() {
    if (this.form.valid) {
      const userType = this.form.get('userType')?.value;
      if (userType === '1') {
        this.sellerRegister();
      } else {
        this.customerRegister();
      }
    } else {
      console.log('Form is invalid');
    }
  }
}