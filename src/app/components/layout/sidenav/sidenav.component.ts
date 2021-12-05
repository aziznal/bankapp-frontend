import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

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
  userName: string;

  /**
   * Creates an instance of SidenavComponent.
   *
   * @param {AuthService} authService
   * @memberof SidenavComponent
   */
  constructor(private authService: AuthService) {
    this.userName = this.authService.getUser()?.fullname || 'Unknown';
  }
}
