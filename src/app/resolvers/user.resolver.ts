import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { AuthService } from '../services/auth.service';

import { User } from '../interfaces/user.interface';
import { AppSettingsService } from '../services/app-settings.service';
import { concatMap, map, take } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';

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
    private usersService: UsersService,
    private appSettingsService: AppSettingsService
  ) {}

  /**
   * Resolves when user has been fetched from backend
   *
   * @param {ActivatedRouteSnapshot} route
   * @return {*}  {(Observable<User> | Promise<User> | User)}
   * @memberof UserResolver
   */
  resolve(): Promise<User> | Observable<User> {
    this.appSettingsService.settings.showLoadingScreen = true;

    return this.authService.user.pipe(
      take(1),
      concatMap(() => {
        return this.usersService.getAllUserData();
      }),
      map((user) => {
        this.appSettingsService.settings.showLoadingScreen = false;

        user.accounts?.forEach((account, i) => {
          user.accounts![i].transactions = account.transactions?.map(
            (transaction) => {
              return { ...transaction, date: new Date(transaction.date) };
            }
          );
        });

        return user;
      })
    );
  }
}
