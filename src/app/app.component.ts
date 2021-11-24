import { Component } from '@angular/core';
import { AppSettingsService } from './services/app-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * Creates an instance of AppComponent.
   *
   * @param {AppSettingsService} appSettingsService
   * @memberof AppComponent
   */
  constructor(private appSettingsService: AppSettingsService) {}

  get loading(): boolean {
    return this.appSettingsService.settings.showLoadingScreen;
  }

  set loading(val: boolean) {
    this.appSettingsService.settings.showLoadingScreen = val;
  }
}
