import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AppSettingsService } from 'src/app/services/app-settings.service';

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
   * Creates an instance of LayoutComponent.
   *
   * @param {AppSettingsService} appSettingsService
   * @memberof LayoutComponent
   */
  constructor(private appSettingsService: AppSettingsService) {}

  get loading(): boolean {
    return this.appSettingsService.settings.showLoadingScreen;
  }

  set loading(val: boolean) {
    this.appSettingsService.settings.showLoadingScreen = val;
  }

  /**
   * causes sidenav to toggle between displayed / hidden
   *
   * @memberof LayoutComponent
   */
  toggleSidenav() {
    this.sidenav.toggle();
  }
}
