import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/products';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent  implements OnInit {
  products: Products[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (response) => {
        this.handleApiResponse(response);
      },
      (error) => {
        console.error('Error fetching products:', error);
        // Handle error (display message, etc.)
      }
    );
  }

  private handleApiResponse(response: any): void {
    if (response.message === 'Products fetched successfully' && Array.isArray(response.data)) {
      this.products = response.data;
    } else {
      console.error('Invalid API response:', response);
    }
  }

  confirmDelete(productId: string): void {
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');

    if (isConfirmed) {
      this.deleteProduct(productId);
    }
  }

  deleteProduct(productId: string): void {
    this.productService.deletProduct(productId).subscribe(
      (response) => {
        console.log('Product deleted successfully', response);
      },
      (error) => {
        console.error('Error deleting product', error);
      }
    );
  }
}
 