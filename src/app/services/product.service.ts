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

  constructor(private http: HttpClient) {
    this.httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })

    }
  }

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(`${environment.BaseApiURL}/products/all`);
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
    const authToken = localStorage.getItem('userToken')

    return this.http.post<Products>(`${environment.BaseApiURL}/products/addbyAd`,
      JSON.stringify(prd),
      {
        headers: new HttpHeaders({

          'Content-Type': 'application/json',
          'Authorization': `${authToken}`
        })
      }).pipe(
        retry(3),                  // resubscribe بحيث لو حصل مشكلة في البوست يحاول بيعد كام مره عشان يبعت الحاجة دي او بيحاول اكتر من مره 
        catchError((err) => {
          return throwError(() => {
            return new Error('error match')
          })
        }))

  }
}
