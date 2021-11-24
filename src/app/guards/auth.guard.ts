import { Injectable } from '@angular/core';

import {
  CanActivate,
  Router,
  UrlTree,
  CanLoad,
  CanActivateChild,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard to protect against accessing pages without being logged in.
 *
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 * @implements {CanLoad}
 * @implements {CanActivateChild}
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {
  /**
   * Creates an instance of AuthGuard.
   *
   * @param {AuthService} authService
   * @param {Router} router
   * @memberof AuthGuard
   */
  constructor(private authService: AuthService, public router: Router) {}

  /**
   * Returns true if user is logged in (according to auth-service). Otherwise,
   * returns false and re-directs user to login page
   *
   * @return {*}  {(boolean | UrlTree)}
   * @memberof AuthGuard
   */
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
