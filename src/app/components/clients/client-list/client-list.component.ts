import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit ,AfterViewInit{
  @Input() data: any;
  @Input() DataLength: number;
  itemsPerPage = 1;
  currentPage = 1;
  ngOnInit(): void {
    console.log('Input received in ngOnInit:', this.data, this.DataLength);

  }
  ngAfterViewInit() {
    this.paginatedData;
  }
  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.data.slice(start, end)
  }
  changPage(page: number) {
    this.currentPage = page
  }

}
