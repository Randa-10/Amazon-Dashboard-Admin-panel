import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  implements OnInit{
  isOpen = false;
  isClose=false
  isLoggedIn: boolean = false;
  constructor(private userService: AuthUserService) {

  }

  ngOnInit(): void {
    this.userService.userLogged$.subscribe((status) => {
      this.isLoggedIn = status;
    })
  }
  logout(): void {
    this.userService.logout();
  }
  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.isClose=!this.isClose
  }
  
 
}


