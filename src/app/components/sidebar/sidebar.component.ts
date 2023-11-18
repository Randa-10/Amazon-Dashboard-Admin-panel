import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
// sidebar.component.ts

isOpen: boolean = false;
isHovered:boolean=true

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


