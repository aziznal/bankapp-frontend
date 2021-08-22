import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/pages/login-page/services/login.service';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
