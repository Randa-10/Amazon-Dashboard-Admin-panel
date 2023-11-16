import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
// sidebar.component.ts

  isOpen = false;
  isClose=false

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.isClose=!this.isClose
  }
}


