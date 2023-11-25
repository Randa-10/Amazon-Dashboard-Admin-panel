import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges, AfterViewInit } from '@angular/core';
import { Products } from 'src/app/models/products';
import { ProductService } from 'src/app/services/product.service';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit, OnChanges {
  products: Products[] = [];
  private _numberOfProducts: number = 0;


  ngOnChanges(changes: SimpleChanges): void {
    if ('numberOfProducts' in changes) {
      this.cdr.detectChanges();
    }
  }
  get numberOfProducts(): number {
    return this._numberOfProducts;
  }

  set numberOfProducts(value: number) {
    this._numberOfProducts = value;
    this.cdr.detectChanges();

  }
  itemsPerPage = 2;
  currentPage = 1;
  constructor(private productService: ProductService, private route: ActivatedRoute
    , private http: HttpClient, private cdr: ChangeDetectorRef  // Inject ChangeDetectorRef
  ) { }

  ngOnInit(): void {
     this.route.data.subscribe((data:any) => {
      this.numberOfProducts = data.numberOfProducts.count;
      console.log(this.numberOfProducts, "resolved numberOfProducts");
      this.getProducts();
    });


  }
  getProducts(): void {
    this.productService.getProducts().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.numberOfProducts = response.data.length; // Update numberOfProducts
          this.products = response.data
          // Manually trigger change detection
          this.cdr.detectChanges();
          // Process the data as needed
        } else {
          console.error('Invalid type of products:', response);
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }


  // private handleApiResponse(response: any): void {
  //   if (response.message === 'Products fetched successfully' && Array.isArray(response.data)) {
  //     this.products = response.data;
  //     console.log(this.products)

  //   } else {
  //     console.error('Invalid API response:', response);
  //   }
  // }
  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.products.slice(start, end)
  }
  changPage(page: number) {
    this.currentPage = page
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
        this.ngOnInit();
        console.log('Product deleted successfully', response);
      },
      (error) => {
        console.error('Error deleting product', error);
      }
    );
  }
}
