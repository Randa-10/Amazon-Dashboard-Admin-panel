import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
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
totalSales: number = 0;

  constructor(
    private productService: ProductService,
    private orderService: OrderServService,
  ) {}

  ngOnInit() {
    this.orders();
    this.isLoading = false;
    this.productCount$ = this.productService.getNumberOfProducts(); 
    this.orderService.getOrders().subscribe(
      (data: any) => {
        this.totalSales = data.totalSales;
        this.createChart();

      },
      (error) => {
        console.error('Error fetching total sales:', error);
      }
    );

    }
//
 createChart(): void {
  const chartElement = this.acquisitionsCharts.first.nativeElement;
  const myChart = new Chart(chartElement, {
      type: 'polarArea', 
      data: {
        labels: ['Total Sales'],
        datasets: [{
          label: 'Total Sales',
          data: [this.totalSales],
          backgroundColor: 'rgba(166, 179, 184,.7)', 
          borderColor: 'rgba(166, 179, 184,.8)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
//
  createChartForOrder(data: any[]): void {  const chartData = data.map((item) => ({
    title: item.product.en.title
      ? item.product.en.title.toString()
      : 'Unknown',
    value: +item.quantity,
  }));

  const chartElement = this.acquisitionsCharts.last.nativeElement;
  const myChart = new Chart(chartElement, {
    type: 'bar',
    data: {
      labels: chartData.map(row => row.title.slice(0, 20)), 
      datasets: [{
        label: 'Quantity Ordered',
        data: chartData.map(row => row.value),
        backgroundColor: '#f9d3ac',
        borderColor: '#f9d3ac',
        borderWidth: 1,
      }],
    },
    options: {
      plugins: {
        legend: { display: true, position: 'top' },
        tooltip: { enabled: true },
        title: { display: true, text: 'Quantity Ordered', font: { size: 16 } },
      },
      scales: {
        x: { grid: { display: false } },
        y: { beginAtZero: true, title: { display: true, text: 'Quantity' } },
      },
      responsive: true, 
      maintainAspectRatio: false,
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
function output(): (target: ChartComponent, propertyKey: "totalSales") => void {
  throw new Error('Function not implemented.');
}

