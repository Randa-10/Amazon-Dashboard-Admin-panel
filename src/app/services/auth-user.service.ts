import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable, catchError, retry, tap, throwError } from 'rxjs';
import { IUser } from '../models/i-user';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  httpheader={}
  private userLogged = new BehaviorSubject<boolean>(this.isUserlog());
constructor(private httpClient:HttpClient) { 
  
this.httpheader={
 headers:new HttpHeaders({
  'Content-Type':'application/json'
})

 
}
  } 

  get userLogged$() {
    return this.userLogged.asObservable();
  }

  isUserlog(): boolean {
    return !!localStorage.getItem('userToken');
  }



  logout(): void {
    localStorage.removeItem('userToken');
    this.userLogged.next(false);
  }
  //**sign up **/
  signUpUsers(user:IUser):Observable<IUser>{   //add user
    return this.httpClient.post<IUser>(`${environment.BaseApiURL}/api/user/signup`,JSON.stringify(user)
    ,this.httpheader).pipe(
      retry(3)  ,                  
    catchError((err)=>{
      return throwError(()=>{
        return new Error ('error match')  })
    })  )      
      
  }
login(admin:Admin):Observable<Admin>{
  return this.httpClient.post<Admin>(`${environment.BaseApiURL}/api/user/loginAdmin`,JSON.stringify(admin), this.httpheader )
  .pipe(
    tap(response => {
      const token = response.yourToken;
      localStorage.setItem('userToken', token);
      this.userLogged.next(true);
    })  )
}

}
