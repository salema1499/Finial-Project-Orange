import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt from 'jwt-decode';
import storageKeys from '../shared/storageKeys';

@Injectable({
  providedIn: 'root',
})
export class AdminOnlyGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // check to if user is authenticated (logged in)
    let token = localStorage.getItem(storageKeys.aqarToken);
    let userData = token ? jwt.default(token) : null;
    if (!token || !userData) {
      this.router.navigateByUrl('/login');
      return false;
    } else {
      // if (JSON.parse(userData).role !== 'admin'){}
      console.log('user Data : ', userData);
    }
    return true;
  }
}
