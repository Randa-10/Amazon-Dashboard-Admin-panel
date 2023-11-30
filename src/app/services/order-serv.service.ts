import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderServService {
httpHeader={};
authToken = localStorage.getItem('userToken');
  constructor(private http:HttpClient) { 
    this.httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${this.authToken}`
      })

    }
  }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.BaseApiURL}/order/adminOrders`, this.httpHeader);
  }
  getClients(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.BaseApiURL}/order/adminClients`, this.httpHeader);
  }
}
