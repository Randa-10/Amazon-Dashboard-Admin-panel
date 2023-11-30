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
export class OverallComponent {
  @ViewChildren('acquisitionsChart') acquisitionsCharts!: QueryList<ElementRef>;
  products: any[] = [];
  chartInstance: Chart | null = null;
  isLoading = true;

  constructor(
    private productService: ProductService,
    private orderService: OrderServService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  createChartFromServiceA(data: any[]): void {
    // Chart creation logic for Service A's data
    this.isLoading = false;
    const chartData = data.map((item) => ({
      title: item.en.title ? item.en.title.toString() : 'Unknown',
      rating: +item.rating,
    }));

    const chartElement = this.acquisitionsCharts.first.nativeElement;

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
            text: 'Rating For Products',
            font: {
              size: 32, 
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false, 
      },
      data: {
        labels: chartData.map((row) => row.title),
        datasets: [
          {
            label: 'Rating',
            data: chartData.map((row) => row.rating),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      }})
  }

  createChartFromServiceB(data: any[]): void {
    const chartData = data.map((item) => ({
      title: item.en.title ? item.en.title.toString() : 'Unknown',
      quantityInStock: +item.quantityInStock,
    }));

    const chartElement = this.acquisitionsCharts.last.nativeElement; // Using first element for the chart

    const newChart = new Chart(chartElement, {
      type: 'polarArea',
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
            text: 'Quantity In Stock',
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
        this.isLoading = false;
        if (response && response.data) {
          this.createChartFromServiceA(response.data);
          this.createChartFromServiceB(response.data);
        } else {
          console.error('Invalid data from Service A:', response);
        }
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching products:', error);
      }
    );
  }
}
