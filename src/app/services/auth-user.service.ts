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
  constructor(private httpClient:HttpClient) { 
this.httpheader={
 headers:new HttpHeaders({
  'Content-Type':'application/json'
})

 
}
  }   
  //**sign up **/
  signUpUsers(user:IUser):Observable<IUser>{   //add user
    return this.httpClient.post<IUser>(`${environment.BaseApiURL}/Iuser`,JSON.stringify(user)
    ,this.httpheader).pipe(
      retry(3)  ,                  // resubscribe بحيث لو حصل مشكلة في البوست يحاول بيعد كام مره عشان يبعت الحاجة دي او بيحاول اكتر من مره 
    catchError((err)=>{
      return throwError(()=>{
        return new Error ('error match')  })
    })  )      
      //** */
  }
  
}
