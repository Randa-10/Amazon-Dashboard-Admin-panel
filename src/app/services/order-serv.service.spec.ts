import { TestBed } from '@angular/core/testing';

import { OrderServService } from './order-serv.service';

describe('OrderServService', () => {
  let service: OrderServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
