import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Products } from 'src/app/models/products';
import { SubSubcategory } from 'src/app/models/sub-subcategory';
import { Subcategory } from 'src/app/models/subcategory';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  Btitle: string = 'Add Product';
  Head: string = 'Add New Product';
  product: Products = {} as Products;
  productForm!: FormGroup;
  currentProductID: string = '';
  categories: Category[] = [];
  subCategory: Subcategory[] = [];
  SubSubcategory: SubSubcategory[] = [];
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.createForm();
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.currentProductID = paramMap.get('prodID')
        ? String(paramMap.get('prodID'))
        : '';
      console.log(this.currentProductID);

      // let foundProd=this.prodService.getProductByID(this.currentProductID)
      if (this.currentProductID.length > 5) {
        this.productService
          .getProductByID(this.currentProductID)
          .subscribe((foundProd: any) => {
            const productData = foundProd.data;

            if (productData) {
              this.product = foundProd;
              console.log(productData, 'found product that you want to update');
              this.Btitle = 'update product';
              this.Head = 'update your  product';

              this.productForm.patchValue(productData);
            } else {
              this.router.navigate(['/home/sales']);
            }
          });
      } else {
        console.log(Error);
      }
    });

    this.getCategories();
    this.getSubCategories();
    this.getsubSubCategories();
  }

  private createForm(): void {
    this.productForm = this.fb.group({
      en: this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        brand: ['', Validators.required],
      }),
      ar: this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        brand: ['', Validators.required],
      }),
      thumbnail: ['', Validators.required],
      images: this.fb.array(
        [
          this.fb.control('', Validators.required), // Image 1
          this.fb.control('', Validators.required), // Image 2
          this.fb.control('', Validators.required), // Image 3
          this.fb.control('', Validators.required), // Image 4
        ],
        Validators.required // Ensure all fields are filled
      ),
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      subSubCategor: ['', Validators.required],
      sku: ['', Validators.required],
      quantityInStock: [0, Validators.required],
      price: [0, Validators.required],
      discountPercentage: [0, Validators.required],
    });
  }
  //valisation//
  get enTitle() {
    return this.productForm.get('en.title');
  }

  get arTitle() {
    return this.productForm.get('ar.title');
  }

  get enDescription() {
    return this.productForm.get('en.description');
  }
  get arDescription() {
    return this.productForm.get('ar.description');
  }
  get brand() {
    return this.productForm.get('ar.brand');
  }
  get enbrand() {
    return this.productForm.get('en.brand');
  }
  get thum() {
    return this.productForm.get('thumbnail');
  }
  get imagesArray() {
    return this.productForm.get('images') as FormArray;
  }

  onSubmit(): void {
    if (this.currentProductID) {
      console.log(this.productForm.value, 'form value');
      this.productService
        .updateProduct(this.currentProductID, this.productForm.value)
        .subscribe({
          next: (data) => {
            this.isLoading = false;
            console.log('updated prod:', data);
            Swal.fire({
              icon: 'success',
              title: 'Product Updated!',
              text: 'Product updated successfully.',
            }).then(() => {
              this.router.navigate(['home/dashboard']);
            });
          },
          error: (err) => {
            this.isLoading = false;
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Please insert valid data.',
            });
            console.log(err);
          },
        });
    } else if (this.productForm.valid && !this.currentProductID) {
      console.log(this.productForm.value);
  
      const newProduct: Products = this.productForm.value;
      this.productService.SaveNewProduct(newProduct).subscribe({
        next: (data) => {
          this.isLoading = false;
  
          console.log('Product saved successfully:', data);
          Swal.fire({
            icon: 'success',
            title: 'Product Saved!',
            text: 'Product saved successfully.',
          }).then(() => {
            this.productForm.reset();
            this.router.navigate(['home/dashboard']);
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error saving product. Please try again.',
          });
          console.error('Error saving product:', err);
        },
      });
    }
  }
  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (response) => {
        this.isLoading = false;
        this.categories = response;
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching categories:', error);
      }
    );
  }
  getSubCategories(): void {
    this.categoryService.getsubCategories().subscribe(
      (response) => {
        this.isLoading = false;
        this.subCategory = response;
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching categories:', error);
      }
    );
  }
  getsubSubCategories(): void {
    this.categoryService.getsubSubCategories().subscribe(
      (response) => {
        this.isLoading = false;
        this.SubSubcategory = response;
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching categories:', error);
      }
    );
  }
}
