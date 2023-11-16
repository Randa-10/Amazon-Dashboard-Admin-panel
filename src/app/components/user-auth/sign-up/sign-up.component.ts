import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';

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
      userType: ['admin'] // Set a default value if needed
    }, { validator: this.passwordMatchValidator });
  }

  onSubmit() {
    // Check if the form is valid before submitting
    if (this.userForm.valid) {
      this.userService.signUpUsers(this.userForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['']);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  // Custom validator function
  passwordMatchValidator(control: FormGroup) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('ConfirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }
}
// export class SignUpComponent {
// //  OnInit {
// //   userForm: FormGroup ;

// //   constructor(private formBuilder: FormBuilder) {}

// //   ngOnInit() {
// //     this.userForm = this.formBuilder.group({
// //       name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
// //       email: ['', [Validators.required, Validators.email, Validators.minLength(12), Validators.maxLength(50)]],
// //       password: ['', [Validators.required, Validators.minLength(8)]],
// //       ConfirmPassword: ['', [Validators.required, Validators.minLength(8)]],
// //       userType: ['admin'] // Set the default value to 'admin'
// //     });
// //   }
//   userForm:FormGroup 
//   constructor( private formbuilder:FormBuilder ,private userserv:AuthUserService,private router:Router){
//     // this.userForm=new FormGroup({
//     //   fname: new FormControl('',[Validators.required,Validators.minLength(3)]),
//     //   lname: new FormControl('',[Validators.required,Validators.pattern('[A-Za-z] {5,}')]),
//     //   email: new FormControl('',[Validators.required,Validators.email]),

//     // })
//     this.userForm = this.formbuilder.group({
//       FullName: ['', [Validators.required, Validators.minLength(5)]],
//       Email: ['', [Validators.required, Validators.email]],
//       // MobileNumber: ['', [Validators.required, Validators.pattern('[0-9]{11}')]],
//       City: ['', [Validators.required]],
//       PostalCode: ['', [Validators.required]],
//       street: ['', [Validators.required]],
//       Password: ['', [Validators.required, Validators.minLength(8)]],
//       ConfirmPassword: ['', [Validators.required]],
//       MobileNumber:this.formbuilder.array([this.getcontrol()])

//     },{
//       validators:this.MustMatch('Password','ConfirmPassword'),
//       // Validators:
//      } ,
//      )
//     ;
//   }


//   get FullName(){
//     return this.userForm.get('FullName');
//   }
//   get Email(){
//     return this.userForm.get('Email');
//   }

//   get City(){
//     return this.userForm.get('City');
//   }
//   get PostalCode(){
//     return this.userForm.get('PostalCode');
//   }
//   get street(){
//     return this.userForm.get('street');
//   }
//    //**mobile **/
//   get MobileNumber(){
//     return <FormArray>this.userForm.get('MobileNumber')
//   }
  
//   add(){
//     this.MobileNumber.push(this.getcontrol())
//   }
//   getcontrol() :FormGroup{
//     return this.formbuilder.group({
//       MobileNumber:['', [Validators.required, Validators.pattern('[0-9]{11}')]]
//     })
//   }
//   remove(i:number):void{
//     this.MobileNumber.removeAt(i)
//   }
//   //**mobile **//
//   //**password and match */
//   get Password(){
//     return this.userForm.get('Password');
//   }
//   get ConfirmPassword(){
//     return this.userForm.get('ConfirmPassword');
//   }
//   get f(){
//     return this.userForm.controls
//   }
//   MustMatch(Password:any,ConfirmPassword:any){
// return (FormGroup:FormGroup)=>{
//   const PasswordControl=FormGroup.controls[Password]
//   const confirmPasswordControl=FormGroup.controls[ConfirmPassword]
//   if(confirmPasswordControl.errors&& !confirmPasswordControl.errors['MustMatch']){
//     return;
//   }if (PasswordControl.value!==confirmPasswordControl.value){
//     confirmPasswordControl.setErrors({MustMatch:true})
//   }else {
//     confirmPasswordControl.setErrors(null)
//   }

// }
//   }
//   valueofphone( MobileNumber:number){
//     return (FormArray:FormArray)=>{
// const formphone=FormArray.controls[MobileNumber]
// // if(formphone.value!==)
//   }
// }

//   ///submit in db///
//   onSubmit() {

//      this.userserv.signUpUsers(this.userForm.value).subscribe({
//     next:(data)=>{
//      console.log(data)
//      this.router.navigate(['/product'])
//    },
//    error:(error)=>{
//    console.log(error)
//    }
//   })
//   }


