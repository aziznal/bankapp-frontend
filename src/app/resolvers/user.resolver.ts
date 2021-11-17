import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

import { User } from '../models/user.model';
import { AppSettingsService } from '../services/app-settings.service';
import { finalize, map, take } from 'rxjs/operators';

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
  resolve(): any {
    this.appSettingsService.settings.showLoadingScreen = true;

    return this.authService.user.pipe(
      take(1),
      map((user) => {
        this.appSettingsService.settings.showLoadingScreen = false;
        return user;
      })
    );
  }
}
