import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../models/products';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(`${environment.BaseApiURL}/products`);
  }

 SaveNewProduct(prd:Products):Observable<Products>{
    return this.http.post<Products>(`${environment.BaseApiURL}/products`,
    JSON.stringify(prd),
    {
   headers:new HttpHeaders({
   
     'Content-Type':'application/json'
   })
   }).pipe(
     retry(3)  ,                  // resubscribe بحيث لو حصل مشكلة في البوست يحاول بيعد كام مره عشان يبعت الحاجة دي او بيحاول اكتر من مره 
   catchError((err)=>{
     return throwError(()=>{
       return new Error ('error match')  })
   })  )      
    
   }
}
