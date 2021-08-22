import { Injectable } from '@angular/core';

import {
  CanActivate,
  Router,
  UrlTree,
  CanLoad,
  CanActivateChild,
} from '@angular/router';
import { LoginService } from '../pages/login-page/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(private loginService: LoginService, public router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.loginService.checkIfUserIsLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivateChild(): boolean | UrlTree {
    return this.canActivate();
  }

  canLoad(): boolean | UrlTree {
    return this.canActivate();
  }
}
