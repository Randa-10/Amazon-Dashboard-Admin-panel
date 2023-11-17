import { TestBed } from '@angular/core/testing';

import { AuthUserTokenService } from './auth-user-token.service';

describe('AuthUserTokenService', () => {
  let service: AuthUserTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUserTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
