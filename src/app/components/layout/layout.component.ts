import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

/**
 * Component to define the basic layout of the site and place main components /
 * sections
 *
 * @export
 * @class LayoutComponent
 */
@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  /**
   * Ref for sidenav component
   *
   * @type {MatSidenav}
   * @memberof LayoutComponent
   */
  @ViewChild('sidenav') sidenav!: MatSidenav;

  /**
   * causes sidenav to toggle between displayed / hidden
   *
   * @memberof LayoutComponent
   */
  toggleSidenav() {
    this.sidenav.toggle();
  }
}
