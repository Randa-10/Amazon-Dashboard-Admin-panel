import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Chart } from 'chart.js';
import { ProductService } from '../services/product.service';
import { OrderServService } from '../services/order-serv.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  @ViewChildren('acquisitionsChart') acquisitionsCharts!: QueryList<ElementRef>;
  products: any[] = [];
  chartInstance: Chart | null = null;

  constructor(
    private productService: ProductService,
    private orderService: OrderServService
  ) {}

  ngOnInit() {
    this.orders();
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
            size: 32, // Change this to your desired font size
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
        },
      ],
    },
  });
    
  }

  orders(): void {
    this.orderService.getOrders().subscribe(
      (response: any) => {
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
