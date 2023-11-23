import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent  implements OnInit{

isOpen: boolean = false;
isHovered:boolean=true
isLoggedIn: boolean = false;
constructor(private userService: AuthUserService) {

}

ngOnInit(): void {
  this.userService.userLogged$.subscribe((status) => {
    this.isLoggedIn = status;
  })
}

toggleSidebar() {
  this.isOpen = !this.isOpen;
}

openSidebar() {
  this.isOpen = true;
}

closeSidebar() {
  this.isOpen = false;
}
}


