import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderServService } from '../services/order-serv.service';
@Injectable({
    providedIn: 'root',
  })
  export class ordersResolver implements Resolve<Observable<any[]>> {
    constructor(private order: OrderServService) {}
    resolve(): Observable<any[]> {
      return this.order.getOrders();
    }
  }