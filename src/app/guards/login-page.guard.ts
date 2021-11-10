import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard for login page.
 *
 * @export
 * @class LoginPageGuard
 * @implements {CanActivate}
 */
@Injectable({ providedIn: 'root' })
export class LoginPageGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Returns true if user is NOT logged in i.e user can only visit this page if
   * they're not logged in
   *
   * @return {*}
   * @memberof LoginPageGuard
   */
  canActivate(): boolean {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
