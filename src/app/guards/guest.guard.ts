import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate() {
    if (localStorage.getItem('token')){
      this.router.navigateByUrl('/dash');
      return false;
    }
    return true;
  }

}