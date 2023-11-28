import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  userForm: FormGroup;
  isLoggedIn: boolean = false;
  constructor(private userService: AuthUserService, private router: Router, private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
    
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

    ngOnInit(): void {
      this.userService.userLogged$.subscribe((status) => {
        this.isLoggedIn = status;
      })
    }
  get email(){
    return this.userForm.get('email');
  }
  get password(){
    return this.userForm.get('password');
  }
  logout(): void {
    this.userService.logout();
  }
  onSubmit(){
    if (this.userForm.valid) {
      this.userService.login(this.userForm.value).subscribe(
        (response) => {
          console.log('login successful!', response);
          Swal.fire({
            title: 'login  successful!',
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
          console.error('Error in signup this email not match with admin', error);
          Swal.fire({
            title: 'this email not match with admin',
            icon: 'error',
            confirmButtonText: 'Ok', 
            customClass: {
              confirmButton: 'btn btn-warning'  
            }
              }
      );
    }
      )}
}

  ngOnDestroy() {
          location.reload()
        }
}
