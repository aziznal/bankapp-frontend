import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

import { User } from 'src/app/models/user.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

/**
 * Sidenav component displayed on the left-side of the page
 *
 * @export
 * @class SidenavComponent
 */
@UntilDestroy()
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
    this.authService
      .getUser()
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.user = user;
      });
  }
}
