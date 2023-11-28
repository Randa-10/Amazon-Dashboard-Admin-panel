import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderServService } from 'src/app/services/order-serv.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

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
  orders: any[] = []
  displayedColumns: string[] = ['orderID', 'title', 'image', 'quantity', 'totalPrice'];
  defaultPageSize = 5;
  totalSales:number=0;

  constructor(private orderSrv: OrderServService, private route: ActivatedRoute
    , private http: HttpClient, private cdr: ChangeDetectorRef,
  ) {
  }


  ngOnInit(): void {
    try{
       this.route.data.subscribe((data: any) => {
      this.orders = data.orders.orderedProducts;
      this.totalSales=data.orders.totalSales
      this.dataSource.data = this.orders;
      console.log(this.orders);
      this.dataSource.sort = this.sort;


    }); 
    }catch(err){
      console.log(err);
      
    }    
  


  }
  ngAfterViewInit() {
    if (this.paginator&&this.orders) {
      this.paginator.page.subscribe((event: PageEvent) => {
        this.loadData(event.pageIndex, event.pageSize);
      });
      this.loadData(1, this.paginator.pageSize);
    }
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();


  }
  // Assume there's a data service with a method getData()
  loadData(pageIndex: number, pageSize: number) {
    // Fetch all data from the API (assuming it's a one-time fetch)
    if (this.orders.length > 0) {
        this.dataSource.data = this.orders
        this.paginator.length = Math.min(this.orders.length, 50 * pageSize);
        console.log(this.paginator);
        this.updateDataSource(pageIndex, pageSize)
    } else {
      // Update the data source based on the current page
      this.updateDataSource(pageIndex, pageSize);
    }
  }
  updateDataSource(pageIndex: number, pageSize: number) {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;

    // Slice the array to get the data for the current page
    const pageData = this.orders.slice(startIndex, endIndex);

    // Update the data source with the sliced data
    this.dataSource.data = pageData;
    this.cdr.detectChanges();

  }




}
