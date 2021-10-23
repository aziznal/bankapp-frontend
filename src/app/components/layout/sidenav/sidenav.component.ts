import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/pages/login-page/services/login.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
