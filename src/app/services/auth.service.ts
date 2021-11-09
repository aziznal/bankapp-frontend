import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

import { DEFAULT_USER } from './mock-user-data';

/**
 * Authorization service is used to open a login session for user and make sure
 * they're logged in, as well as provide the current user's id.
 *
 * @export
 * @class AuthService
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  userId!: string;

  /**
   * Shortcut for checking whether user is still logged in.
   *
   * @readonly
   * @type {boolean}
   * @memberof AuthService
   */
  get isLoggedIn(): boolean {
    return this.checkIfUserIsLoggedIn();
  }

  /**
   * Creates an instance of AuthService. Sets default values for username and password. Checks if user is logged in.
   *
   * @param {HttpClient} http
   * @param {ToastrService} toastrService
   * @memberof AuthService
   */
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  /**
   * Returns current user's information (mock data)
   *
   * @return {*}  {User}
   * @memberof AuthService
   */
  getUser(): User {
    return DEFAULT_USER;
  }

  /**
   *
   * Checks user cookies to see if a session is active
   *
   * @returns boolean
   */
  private checkIfUserIsLoggedIn(): boolean {
    return this.cookieService.check(environment.AUTH_COOKIE_NAME);
  }

  /**
   *
   * Logs User In and stores a session cookie
   *
   * @returns void
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post(
      environment.API.LOGIN_URL,
      { email, password },
      { withCredentials: true }
    );
  }

  /**
   *
   * Logs user out and removes session cookies
   *
   * @returns void
   */
  logout(): void {
    this.cookieService.delete(environment.AUTH_COOKIE_NAME);
    this.router.navigateByUrl('login');
  }
}
