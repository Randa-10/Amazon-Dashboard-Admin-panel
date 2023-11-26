import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() totalItems: any;
  @Input() currentPage: any;
  @Input() ItemsPerPage: any;
  @Output() onClick: EventEmitter<number> = new EventEmitter()
  totalPages = 0;
  pages: number[] = []

  constructor() {

  }
  ngOnInit(): void {
    console.log(this.totalItems,this.currentPage,this.ItemsPerPage, "dddddddddddddd");

    if (this.totalItems) {
      this.totalPages = Math.ceil(this.totalItems / this.ItemsPerPage)
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

  }
  pageClicked(page: number) {
    if(page<=this.totalPages)
    this.onClick.emit(page);
  }


}
