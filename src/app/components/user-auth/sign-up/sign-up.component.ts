import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent {
  userForm: FormGroup;

  constructor(private userService: AuthUserService, private router: Router, private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      ConfirmPassword: ['', Validators.required],
      userType: ['admin'] 
    }, { validator: this.passwordMatchValidator });
  }

  get name(){
    return this.userForm.get('name')
  }

  get email(){
    return this.userForm.get('email');
  }

  onSubmit(){
    if (this.userForm.valid) {
      this.userService.signUpUsers(this.userForm.value).subscribe(
        (response) => {
          console.log('Signup successful!', response);
          Swal.fire({
            title: 'Signup successful!',
            icon: 'success',
            confirmButtonText: 'Ok', 
            customClass: {
              confirmButton: 'btn btn-warning'  
            }
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/home/dashboard']); 
            }
          })


              },
        (error) => {
          console.error('Error in signup', error);
              }
      );
    }
  }


  passwordMatchValidator(control: FormGroup): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('ConfirmPassword')?.value;
  
    return password === confirmPassword ? null : { mismatch: true };
  }
  
}


