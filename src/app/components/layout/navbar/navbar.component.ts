import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

/**
 * Navigation Bar displayed on the top of the page
 *
 * @export
 * @class NavbarComponent
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input('sidenav') sidenav!: MatSidenav;

  /**
   * Creates an instance of NavbarComponent.
   *
   * @param {AuthService} authService
   * @param {Router} router
   * @memberof NavbarComponent
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Causes sidenav to toggle between displayed / hidden
   *
   * @memberof NavbarComponent
   */
  toggleSidenav() {
    this.sidenav.toggle();
  }

  /**
   * calls auth service method to log user out
   *
   * @memberof NavbarComponent
   */
  logout() {
    this.authService.logout();
  }
}
