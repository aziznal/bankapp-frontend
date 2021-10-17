import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/pages/login-page/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input('sidenav') sidenav!: MatSidenav;

  constructor(private loginService: LoginService, private router: Router) {}

  toggleSidenav() {
    this.sidenav.toggle();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
