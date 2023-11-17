import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { IUser } from '../models/i-user';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  httpheader={}
  isUserlog: any;
  constructor(private httpClient:HttpClient) { 
this.httpheader={
 headers:new HttpHeaders({
  'Content-Type':'application/json'
})

 
}
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
      //** */
  }
  
}
