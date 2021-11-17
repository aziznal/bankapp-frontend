import { Injectable } from '@angular/core';
import { Settings } from '../models/app-settings.model';

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
