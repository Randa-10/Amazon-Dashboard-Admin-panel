import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  {path:'sign-up',component:SignUpComponent,title:'Sign-up page'},
  {path:'login',component:LoginComponent,title:'Login page'},
]
@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserAuthModule { }
