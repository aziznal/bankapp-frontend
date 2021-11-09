import { Injectable } from '@angular/core';

import {
  CanActivate,
  Router,
  UrlTree,
  CanLoad,
  CanActivateChild,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(private authService: AuthService, public router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isLoggedIn) {
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
