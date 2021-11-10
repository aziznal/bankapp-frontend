import { Component } from '@angular/core';
import { Location } from '@angular/common';

/**
 * Global back button component that goes back to the last visited page using
 * the browser's built-in api
 *
 * @export
 * @class BackButtonComponent
 */
@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent {
  constructor(private location: Location) {}

  /**
   * Go back one page
   *
   * @memberof BackButtonComponent
   */
  navigateBackOnce() {
    this.location.back();
  }
}
