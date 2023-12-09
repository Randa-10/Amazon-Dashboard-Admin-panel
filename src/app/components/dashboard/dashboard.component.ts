import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges, AfterViewInit } from '@angular/core';
import { Products } from 'src/app/models/products';
import { ProductService } from 'src/app/services/product.service';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit, OnChanges {
  products: Products[] = [];
  private _numberOfProducts: number = 0;
  isLoading = true;


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
  itemsPerPage = 4;
  currentPage = 1;
  constructor(private productService: ProductService, private route: ActivatedRoute
    , private http: HttpClient, private cdr: ChangeDetectorRef , // Inject ChangeDetectorRef
  ) { 
   // this.loadData();

  }

  ngOnInit(): void {
     this.route.data.subscribe((data:any) => {
      this.numberOfProducts = data.numberOfProducts;
      console.log(this.numberOfProducts, "resolved numberOfProducts");
      this.getProducts();
    });


  }
  getProducts(): void {
    this.productService.getProducts().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.isLoading = false;
          this.numberOfProducts = response.data.length; // Update numberOfProducts
          this.products = response.data
          this.cdr.detectChanges();
        } else {
          console.error('Invalid type of products:', response);
        }
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching products:', error);
      }
    );
  }


  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.products.slice(start, end)
  }
  changPage(page: number) {
    this.currentPage = page
  }

  confirmDelete(productId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProduct(productId);
      } else {
        console.log('Deletion canceled');
      }
    });
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
