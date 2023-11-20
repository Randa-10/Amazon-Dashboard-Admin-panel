import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/models/products';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  Btitle:string="Add Product";
  Head:string="Add New Product"
  product: Products = {} as Products;
  productForm!: FormGroup;
  currentProductID: string = "";
  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) {


  }
  ngOnInit(): void {
    this.createForm();
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.currentProductID = (paramMap.get('prodID')) ? String((paramMap.get('prodID'))) : "";
      console.log(this.currentProductID);

      // let foundProd=this.prodService.getProductByID(this.currentProductID)
      if(this.currentProductID.length>5){
      this.productService.getProductByID(this.currentProductID).subscribe((foundProd: any) => {
        const productData = foundProd.data;

        if (productData) {
          this.product = foundProd;
          console.log(productData, "found product that you want to update");
          this.Btitle="update product";
          this.Head="update your  product"

          this.productForm.patchValue(productData)

        } else {
          this.router.navigate(['/home/sales'])

        }
      })}else{
        console.log(Error);
        
      }



    })


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
    });
  }


  onSubmit(): void {
    // / add new product and update existing product&&this.productForm.valid)
    if (this.currentProductID) {
      console.log(this.productForm.value, "form value");
      this.productService.updateProduct(this.currentProductID, this.productForm.value).subscribe({
        next: (data) => {
          console.log("updated prod:", data);
          alert("product updated successfully")
          this.router.navigate(['home/dashboard'])
        },
        error: (err) =>{
           alert(" please insert valid data")
          console.log(err) 
        }
      
      })

    } else if(this.productForm.valid&&!this.currentProductID) {
       const newProduct: Products = this.productForm.value;
      this.productService.SaveNewProduct(newProduct).subscribe({
        next: (data) => {
          console.log('Product saved successfully:', data);
                this.productForm.reset();
              this.router.navigate(['./Products'])
        },
        error: (err) =>
        console.error('Error saving product:', err)
      })
    }

  }

}






