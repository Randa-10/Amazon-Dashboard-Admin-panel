import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { Subcategory } from '../models/subcategory';
import { SubSubcategory } from '../models/sub-subcategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  httpHeader = {}
  constructor(private http: HttpClient) {
    this.httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
     }
  }

 getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.BaseApiURL}/category`,this.httpHeader);
  }
  getsubCategories(): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(`${environment.BaseApiURL}/subcategory`,this.httpHeader);
  }
  getsubSubCategories(): Observable<SubSubcategory[]> {
    return this.http.get<SubSubcategory[]>(`${environment.BaseApiURL}/subcategory/sub`,this.httpHeader);
  }

}
