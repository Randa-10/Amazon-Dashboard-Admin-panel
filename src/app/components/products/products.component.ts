import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Products } from 'src/app/models/products';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent  implements OnInit {
  productForm!: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {}

  ngOnInit(): void {
    this.createForm();
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
      images: this.fb.array([]), 
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      subSubCategor: ['', Validators.required],
      sku: ['', Validators.required],
      quantityInStock: [0, Validators.required],
      price: [0, Validators.required],
      discountPercentage: [0, Validators.required],
      rating: [0, Validators.required],
      ratingQuantity: [0, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const newProduct: Products = this.productForm.value;
      console.log('Data to be sent:', newProduct);
      this.productService.SaveNewProduct(newProduct).subscribe(
        (savedProduct) => {
          console.log('Product saved successfully:', savedProduct);
          this.productForm.reset();
        },
        (error) => {
          console.error('Error saving product:', error);
        }
      );
    }
  }
  
}




