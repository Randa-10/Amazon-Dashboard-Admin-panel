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
    this.getProducts();
  }

  createChartFromServiceA(data: any[]): void {
    // Chart creation logic for Service A's data
    const chartData = data.map((item) => ({
      title: item.en.title ? item.en.title.toString() : 'Unknown',
      quantityInStock: +item.quantityInStock,
    }));

    const chartElement = this.acquisitionsCharts.first.nativeElement; // Using first element for the chart

    const newChart = new Chart(chartElement, {
      type: 'polarArea',
      data: {
        labels: chartData.map((row) => row.title),
        datasets: [
          {
            label: 'Quantity In Stock',
            data: chartData.map((row) => row.quantityInStock),
          },
        ],
      },
    });
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.createChartFromServiceA(response.data);
          // this.createChartForProductsQuantity(response.data);
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
