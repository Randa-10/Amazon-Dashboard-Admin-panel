import { Observable } from 'rxjs';
// create a file named product-list.resolver.ts

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Injectable({
    providedIn: 'root',
})
export class ProductListResolver implements Resolve<number> {
    constructor(private productService: ProductService) { }
    resolve(): Observable<number> {
        return this.productService.getNumberOfProducts();
      }
   }

