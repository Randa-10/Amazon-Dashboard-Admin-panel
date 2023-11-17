import { Component } from '@angular/core';
import { AuthUserTokenService } from 'src/app/services/auth-user-token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userLog:boolean=true;
constructor(private userAuthService:AuthUserTokenService){

}
  ngOnInit(): void {

    this.userLog=this.userAuthService.isUserLogged;   
    // console.log(this.userLog);

  }

  loginFunc(){
//take lgib from userauth
    this.userAuthService.login("randa@gmail.com","22222");
    this.userLog=this.userAuthService.isUserLogged;                //to not need to refrsh
  }
  logOutFunc(){
    this.userAuthService.logout();
    this.userLog=this.userAuthService.isUserLogged;
  }
}
