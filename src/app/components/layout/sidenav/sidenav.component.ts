import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { User } from 'src/app/interfaces/user.interface';

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
  constructor(private route: ActivatedRoute) {
    this.user = this.route.snapshot.data.user;
  }
}
