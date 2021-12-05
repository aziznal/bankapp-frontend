import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

import decode from 'jwt-decode';

import { environment } from 'src/environments/environment';

interface LoginResponse {
  access_token: string;
}

interface DecodedToken {
  iat: number;
  exp: number;

  email: string;
  fullname: string;
  sub: string;
}

interface UserFromToken {
  email: string;
  fullname: string;
  id: string;
}

/**
 * Authorization service is used to open a login session for user and make sure
 * they're logged in, as well as provide the current user's id.
 *
 * @export
 * @class AuthService
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  accessToken: string | undefined = '';

  user: BehaviorSubject<UserFromToken | null> = new BehaviorSubject(
    this.getUser()
  );

  /**
   * Shortcut for checking whether user is still logged in.
   *
   * @readonly
   * @type {boolean}
   * @memberof AuthService
   */
  get isLoggedIn(): boolean {
    return this.checkUserIsLoggedIn();
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
    private router: Router,
    private cookieService: CookieService
  ) {
    this.accessToken = this.getAccessTokenFromCookie();
    this.user.next(this.getUser());
  }

  /**
   * Returns the access token stored in the cookies from previous sessions (if it's still there)
   *
   * @private
   * @return {*}  {string}
   * @memberof AuthService
   */
  private getAccessTokenFromCookie(): string | undefined {
    return this.cookieService.get(environment.accessTokenCookieName);
  }

  private saveAccessTokenAsCookie(): void {
    const decodedToken = decode<DecodedToken>(this.accessToken!);

    this.cookieService.set(
      environment.accessTokenCookieName,
      this.accessToken!,
      decodedToken.exp,
      '/',
      environment.accessTokenCookieDomain
    );

    this.user.next(this.getUser());
  }

  private removeAccessTokenCookie(): void {
    this.cookieService.delete(
      environment.accessTokenCookieName,
      '/',
      environment.accessTokenCookieDomain
    );
  }

  getUser(): UserFromToken | null {
    if (!this.accessToken) return null;

    const decodedToken = decode<DecodedToken>(this.accessToken);

    return decodedToken
      ? {
          email: decodedToken.email,
          fullname: decodedToken.fullname,
          id: decodedToken.sub,
        }
      : null;
  }

  private checkUserIsLoggedIn(): boolean {
    if (!this.accessToken) return false;

    const decodedToken = decode<DecodedToken>(this.accessToken!);

    const now = Math.floor(new Date().valueOf() / 1000);

    return decodedToken !== undefined && decodedToken.exp >= now;
  }

  /**
   * Logs User In and stores a session cookie
   *
   * @returns Observable<any>
   */
  login(email: string, password: string): Observable<any> {
    return this.http
      .post<LoginResponse>(
        environment.API.LOGIN,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        map((response: LoginResponse) => {
          this.accessToken = response.access_token;
          this.saveAccessTokenAsCookie();
        })
      );
  }

  /**
   * Logs user out and removes session cookies
   *
   * @returns void
   */
  logout(): void {
    if (this.accessToken) {
      this.removeAccessTokenCookie();
      this.accessToken = undefined;
      this.user.next(null);
    }

    this.router.navigateByUrl('login');
  }
}
