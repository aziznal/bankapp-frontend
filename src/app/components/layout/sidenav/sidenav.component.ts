import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

/**
 * Sidenav component displayed on the left-side of the page
 *
 * @export
 * @class SidenavComponent
 */
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  /**
   * Current User object
   *
   * @type {User}
   * @memberof SidenavComponent
   */
  user!: User;

  /**
   * Creates an instance of SidenavComponent.
   *
   * @param {AuthService} authService
   * @memberof SidenavComponent
   */
  constructor(private authService: AuthService) {
    this.user = this.authService.getUser();
  }
}
