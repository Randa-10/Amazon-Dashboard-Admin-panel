
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthUserService } from '../services/auth-user.service'; 
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
          this.router.navigate(['/Users/login']);
          return false;
        }
      })
    );
  }
}

// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthUserService } from '../services/auth-user.service'; 
// import { Observable, combineLatest } from 'rxjs';
// import { map, take } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserAuthGuard implements CanActivate {
//   constructor(private authService: AuthUserService, private router: Router) {}

//   canActivate(): Observable<boolean> {
//     return combineLatest([
//       this.authService.userLogged$,
//       this.authService.products$,
//     ]).pipe(
//       take(1),
//       map(([userLogged, products]) => {
//         if (userLogged && products.length > 0) {
//           return true;
//         } else {
//           this.router.navigate(['home/Users/login']);
//           return false;
//         }
//       })
//     );
//   }
// }
