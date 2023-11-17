import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthUserTokenService {
  userLogged: BehaviorSubject<boolean>;
  // isUserlog: boolean;

  constructor(private http: HttpClient) {
    this.userLogged = new BehaviorSubject<boolean>(this.isUserLogged);
  }

  login(email: string, password: string): void {
    // Make a POST request to your API for authentication
    this.http.post<{ token: string }>(`${environment.BaseApiURL}/api/user/login`, { email, password })
      .subscribe(
        response => {
          const token = response.token;
          localStorage.setItem('userToken', token);
          this.userLogged.next(true);
        },
        error => {
          console.error('Login failed', error);

        }
      );
  }

  logout(): void {
    localStorage.removeItem('userToken');
    this.userLogged.next(false);
  }

  get isUserLogged(): boolean {
    return !!localStorage.getItem('userToken');
  }

  getUserLoggedStatus(): Observable<boolean> {
    return this.userLogged.asObservable();
  }
}