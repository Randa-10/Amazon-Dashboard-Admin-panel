import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthUserService } from '../services/auth-user.service';

export const userAuthGuard: CanActivateFn = (route, state) => {
  // return true;
  const usercard=inject(AuthUserService)
  const rout=inject(Router)
  if(usercard.isUserlog){
    return true
  }else{
    alert('please login first')
    rout.navigate(['/userLogin'])
    return false
  }
};
