import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { OrderServService } from 'src/app/services/order-serv.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-overall',
  templateUrl: './overall.component.html',
  styleUrls: ['./overall.component.scss'],
})
export class OverallComponent implements AfterViewInit {
  @ViewChildren('acquisitionsChart') acquisitionsCharts!: QueryList<ElementRef>;
  products: any[] = [];
  chartInstance: Chart | null = null;

  constructor(
    private productService: ProductService,
    private orderService: OrderServService
  ) {}

  ngOnInit() {
    this.getProducts();
    this.orders();
  }

  ngAfterViewInit() {
    // Access acquisitionsChart only after it's available in the DOM
    // if (this.acquisitionsChart) {
    //   this.createChart();
    // } else {
    //   console.error('acquisitionsChart is not available yet.');
    // }
  }
  createChartFromServiceA(data: any[]): void {
    // Chart creation logic for Service A's data
    const chartData = data.map((item) => ({
      title: item.en.title ? item.en.title.toString() : 'Unknown',
      rating: +item.rating,
    }));

    const chartElement = this.acquisitionsCharts.first.nativeElement; // Using first element for the chart

    const newChart = new Chart(chartElement, {
      type: 'bar',
      data: {
        labels: chartData.map((row) => row.title),
        datasets: [
          {
            label: 'Rating',
            data: chartData.map((row) => row.rating),
          },
        ],
      },
    });
  }

  createChartFromServiceB(data: any[]): void {
    console.log(data);
    // Chart creation logic for Service B's data
    const chartData = data.map((item) => ({
      title: item.product.en.title
        ? item.product.en.title.toString()
        : 'Unknown',
      value: +item.quantity,
    }));

    const chartElement = this.acquisitionsCharts.last.nativeElement; // Using last element for the chart

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
  // createChartForProductsQuantity(data: any[]): void {
  //   console.log(data);
  //   // Chart creation logic for Service B's data
  //   const chartData = data.map((product) => ({
  //     title: product.en.title ? product.en.title.toString() : 'Unknown',
  //     value: +product.quantityInStock,
  //   }));

  //   const chartElement = this.acquisitionsCharts.last.nativeElement; // Using last element for the chart

  //   const newChart = new Chart(chartElement, {
  //     type: 'bar',
  //     options: {
  //       animation: false,
  //       plugins: {
  //         legend: {
  //           display: true,
  //         },
  //         tooltip: {
  //           enabled: true,
  //         },
  //       },
  //     },
  //     data: {
  //       labels: chartData.map((row) => row.title),
  //       datasets: [
  //         {
  //           label: 'Quantity was Orderd',
  //           data: chartData.map((row) => row.value),
  //         },
  //       ],
  //     },
  //   });
  // }

  // private createChart() {
  //   const data = this.products.map((product) => {
  //     return {
  //       title: product.en.title ? product.en.title.toString() : 'Unknown',
  //       rating: +product.rating,
  //     };
  //   });

  //   const chartElement = this.acquisitionsChart.nativeElement;

  //   // Destroy the previous chart instance if it exists
  //   if (this.chartInstance) {
  //     this.chartInstance.destroy();
  //   }

  //   this.chartInstance = new Chart(chartElement, {
  //     type: 'bar',
  //     data: {
  //       labels: data.map((row) => row.title),
  //       datasets: [
  //         {
  //           label: 'Rating For Your Products',
  //           data: data.map((row) => row.rating),
  //         },
  //       ],
  //     },
  //   });
  // }

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
  orders(): void {
    this.orderService.getOrders().subscribe(
      (response: any) => {
        console.log(response.orderedProducts);
        if (response && response.orderedProducts) {
          this.createChartFromServiceB(response.orderedProducts);
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
