import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-overall',
  templateUrl: './overall.component.html',
  styleUrls: ['./overall.component.scss'],
})
export class OverallComponent implements AfterViewInit {
  @ViewChild('acquisitionsChart') acquisitionsChart!: ElementRef;
  products: any[] = [];
  chartInstance: Chart | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  ngAfterViewInit() {
    // Access acquisitionsChart only after it's available in the DOM
    if (this.acquisitionsChart) {
      this.createChart();
    } else {
      console.error('acquisitionsChart is not available yet.');
    }
  }

  private createChart() {
    const data = this.products.map((product) => {
      return {
        title: product.en.title ? product.en.title.toString() : 'Unknown',
        rating: +product.rating,
      };
    });

    const chartElement = this.acquisitionsChart.nativeElement;

    // Destroy the previous chart instance if it exists
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new Chart(chartElement, {
      type: 'bar',
      data: {
        labels: data.map((row) => row.title),
        datasets: [
          {
            label: 'Rating For Your Products',
            data: data.map((row) => row.rating),
          },
        ],
      },
    });
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.products = response.data;
          if (this.acquisitionsChart) {
            this.createChart();
          }
        } else {
          console.error('Invalid type of products:', response);
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
