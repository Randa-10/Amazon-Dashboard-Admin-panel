import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderServService } from 'src/app/services/order-serv.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
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
  // totalSales: number = 0;
  isLoading = true; 
  @Input() totalSales: number; 
  constructor(
    private orderSrv: OrderServService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    try {
      this.route.data.subscribe((data: any) => {
        this.orders = data.orders.orderedProducts;
        this.totalSales = data.orders.totalSales;
        this.dataSource.data = this.orders;
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

    this.orderSrv.getOrders().subscribe(
      (data: any) => {
        this.orders = data.orderedProducts;
        this.totalSales = data.totalSales;
        this.dataSource.data = this.orders;
        this.paginator.length = Math.min(this.orders.length, 50 * pageSize);
        this.updateDataSource(pageIndex, pageSize);
        this.isLoading = false; 
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isLoading = false; 
      }
    );
  }

  updateDataSource(pageIndex: number, pageSize: number) {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = this.orders.slice(startIndex, endIndex);
    this.dataSource.data = pageData;
    this.cdr.detectChanges();
  }
}
