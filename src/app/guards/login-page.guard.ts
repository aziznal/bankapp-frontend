import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../pages/login-page/services/login.service';

@Injectable({ providedIn: 'root' })
export class LoginPageGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate() {
    if (this.loginService.checkIfUserIsLoggedIn()) {
      this.router.navigate(['/debug']);
      return false;
    } else {
      return true;
    }
  }
}
