import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderServService } from 'src/app/services/order-serv.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],

})
export class CardsComponent implements OnInit {
  productCount$: Observable<number>;
  orderCount: number=0;
  orders: any[] = [];


  constructor(private productService: ProductService,private orderService: OrderServService
,    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    this.productCount$ = this.productService.getNumberOfProducts();
    // this.orderCount=this.orderService.countOrders()
    this.orderService.countOrders().subscribe(
      (count) => {
        this.orderCount = count;
      },
      (error) => {
        console.error('Error counting orders:', error);
      }
    );
    try {
      // this.isLoading = true;
      this.route.data.subscribe((data: any) => {
        this.orders = data.orders.orderedProducts;
        // this.totalSales = data.orders.totalSales;
        // this.dataSource.data = this.orders;
        console.log(this.orders);
  
      });
    } catch (err) {
      console.log(err);
    }

  }
  cards = [
    { title: 'Total Sales', value: '$1,234,567', icon: 'fa-dollar-sign' },
    { title: 'Orders', value: '789', icon: 'fa-shopping-cart' },
    { title: 'Products', value: '123', icon: 'fa-box' },
    { title: 'Customers', value: '456', icon: 'fa-users' },
  ];
}
