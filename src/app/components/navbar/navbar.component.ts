import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isOpen = false;
  isClose=false

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.isClose=!this.isClose
  }
 
}


