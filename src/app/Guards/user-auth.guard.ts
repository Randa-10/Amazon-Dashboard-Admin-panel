// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthUserService } from '../services/auth-user.service';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthUserService } from '../services/auth-user.service'; // Adjust the import path accordingly
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthGuard {
  constructor(private authService: AuthUserService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.userLogged$.pipe(
      take(1),
      map((userLogged) => {
        if (userLogged) {
          return true;
        } else {
          this.router.navigate(['home/Users/login']);
          return false;
        }
      })
    );
  }
}
