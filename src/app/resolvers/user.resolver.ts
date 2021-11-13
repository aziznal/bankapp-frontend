import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

import { User } from '../models/user.model';
import { AppSettingsService } from '../services/app-settings.service';
import { finalize } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<User> {
  /**
   * Creates an instance of UserResolver.
   *
   * @param {AuthService} authService
   * @param {AppSettingsService} appSettingsService
   * @memberof UserResolver
   */
  constructor(
    private authService: AuthService,
    private appSettingsService: AppSettingsService
  ) {}

  /**
   * Resolves when user has been fetched from backend
   *
   * @param {ActivatedRouteSnapshot} route
   * @return {*}  {(Observable<User> | Promise<User> | User)}
   * @memberof UserResolver
   */
  resolve(): Observable<User> | Promise<User> | User {
    this.appSettingsService.settings.showLoadingScreen = true;

    return this.authService.getUser().pipe(
      finalize(() => {
        this.appSettingsService.settings.showLoadingScreen = false;
      })
    );
  }
}
