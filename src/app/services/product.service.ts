import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../models/products';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpHeader = {}
  authToken = localStorage.getItem('userToken');

  constructor(private http: HttpClient) {
    this.httpHeader = {
      headers: new HttpHeaders({
        // 'Authorization': `Bearer ${this.authToken}`,
        'Content-Type': 'application/json',
        'Authorization': `${this.authToken}`
      })

    }
  }

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(`${environment.BaseApiURL}/products/adminProducts`, this.httpHeader);
  }
  getProductByID(prodID: string): Observable<Products> {
    return this.http.get<Products>(`${environment.BaseApiURL}/products/admin/${prodID}`);
  }
  updateProduct(prodID: string, product: Products): Observable<Products> {
    console.log(prodID, product, "service");

    return this.http.patch<Products>(`${environment.BaseApiURL}/products/${prodID}`, JSON.stringify(product), this.httpHeader).pipe(
      retry(2),
      //   catch
      catchError((err) => {
        return throwError(() => {
          return new Error("error in updating")
        }
        )
      }
      )
    )
  }

  SaveNewProduct(prd: Products): Observable<Products> {
    return this.http.post<Products>(`${environment.BaseApiURL}/products/addbyAdmin`,
      JSON.stringify(prd),
      this.httpHeader).pipe(
        retry(3),                  // resubscribe بحيث لو حصل مشكلة في البوست يحاول بيعد كام مره عشان يبعت الحاجة دي او بيحاول اكتر من مره 
        catchError((err) => {
          return throwError(() => {
            return new Error('error match')
          })
        }))
  }
  deletProduct (proID:string):Observable<Products>{
    return this.http.delete<Products>(`${environment.BaseApiURL}/products/${proID}`,this.httpHeader);
  }
  getNumberOfProducts(): Observable<number> {
    // Adjust the endpoint based on your API
    const endpoint = `${environment.BaseApiURL}/products/count`; // Assuming there's an endpoint that provides the count of products

    return this.http.get<number>(endpoint,this.httpHeader);
  }


}
