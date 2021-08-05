import { Injectable } from '@angular/core';

import { CanActivate, Router, UrlTree, CanLoad, CanActivateChild } from '@angular/router';
import { LoginService } from '../pages/login-page/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, public router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.loginService.userIsLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  CanActivateChild(): boolean | UrlTree {
    return this.canActivate();
  }

  CanLoad(): boolean | UrlTree {
    return this.canActivate();
  }

}
