import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderServService } from 'src/app/services/order-serv.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default, // Ensure this line is present
})
export class OrdersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  orders: any[] = [];
  displayedColumns: string[] = [
    'orderID',
    'title',
    'image',
    'quantity',
    'totalPrice',
  ];
  defaultPageSize = 5;
  totalSales: number = 0;
  isLoading = true;

  constructor(
    private orderSrv: OrderServService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    try {
      this.isLoading = true;
      this.route.data.subscribe((data: any) => {
        this.orders = data.orders.orderedProducts;
        this.totalSales = data.orders.totalSales;
        this.dataSource.data = this.orders;
        console.log(this.orders);
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      });
    } catch (err) {
      console.log(err);
      this.isLoading = false;
    }
  }
  ngAfterViewInit() {
    if (this.paginator && this.orders) {
      this.paginator.page.subscribe((event: PageEvent) => {
        this.loadData(event.pageIndex, event.pageSize);
      });
      this.loadData(1, this.paginator.pageSize);
    }
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }
  loadData(pageIndex: number, pageSize: number) {
    this.isLoading = true;
    if (this.orders.length > 0) {
      this.dataSource.data = this.orders;
      this.paginator.length = Math.min(this.orders.length, 50 * pageSize);
      console.log(this.paginator);
      this.updateDataSource(pageIndex, pageSize);
    } else {
      // Update the data source based on the current page
      this.updateDataSource(pageIndex, pageSize);
    }
    this.isLoading = false;
  }
  updateDataSource(pageIndex: number, pageSize: number) {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = this.orders.slice(startIndex, endIndex);
    this.dataSource.data = pageData;
    this.cdr.detectChanges();
  }
}
