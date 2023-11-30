import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Chart } from 'chart.js';
import { ProductService } from '../services/product.service';
import { OrderServService } from '../services/order-serv.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @ViewChildren('acquisitionsChart') acquisitionsCharts!: QueryList<ElementRef>;
  products: any[] = [];
  chartInstance: Chart | null = null;
  orderCount: number = 0; 
  productCount$: Observable<number>;
  isLoading = true;

  constructor(
    private productService: ProductService,
    private orderService: OrderServService,
 
  ) {}

  ngOnInit() {
    this.orders();
    this.isLoading = false;
    this.productCount$ = this.productService.getNumberOfProducts(); 
  }

  createChartForOrder(data: any[]): void {  const chartData = data.map((item) => ({
    title: item.product.en.title
      ? item.product.en.title.toString()
      : 'Unknown',
    value: +item.quantity,
  }));

  const chartElement = this.acquisitionsCharts.last.nativeElement;

  const newChart = new Chart(chartElement, {
    type: 'bar',
    options: {
      animation: false,
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          enabled: true,
        },
        title: {
          display: true,
          text: 'Quantity was Orderd',
          font: {
            size: 32,
          },
        },
      },
    },
    data: {
      labels: chartData.map((row) => row.title),
      datasets: [
        {
          label: 'Quantity was Orderd',
          data: chartData.map((row) => row.value),
        }
      ],
    },
  });
  this.orderCount = data.length;
  }

  orders(): void {
    this.orderService.getOrders().subscribe(
      (response: any) => {
        // this.isLoading = false;
        console.log(response.orderedProducts);
        if (response && response.orderedProducts) {
          this.createChartForOrder(response.orderedProducts);
        } else {
          console.error('Invalid data from Service A:', response);
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
