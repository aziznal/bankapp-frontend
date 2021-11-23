import { Injectable } from '@angular/core';
import { Settings } from '../interfaces/app-settings.interface';

@Injectable({ providedIn: 'root' })
export class AppSettingsService {
  /**
   * App settings config
   *
   * @type {Settings}
   * @memberof AppSettingsService
   */
  settings!: Settings;

  /**
   * Creates an instance of AppSettingsService.
   *
   * @memberof AppSettingsService
   */
  constructor() {
    this.settings = {
      showLoadingScreen: false,
    };
  }
}
