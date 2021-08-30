import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  username: string;
  userPassword: string;

  userIsLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(
    this.checkIfUserIsLoggedIn()
  );

  /**
   * Creates an instance of LoginService. Sets default values for username and password. Checks if user is logged in.
   *
   * @param {HttpClient} http
   * @param {ToastrService} toastrService
   * @memberof LoginService
   */
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.username = '';
    this.userPassword = '';
  }

  /**
   *
   * Checks user cookies to see if a session is active
   *
   * @returns boolean
   */
  checkIfUserIsLoggedIn(): boolean {
    return this.cookieService.check(environment.AUTH_COOKIE_NAME);
  }

  /**
   *
   * Logs User In and stores a session cookie
   *
   * @returns void
   */
  login(email: string, password: string): Observable<any> {
    return this.http
      .post(
        environment.API.LOGIN_URL,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        map((response) => {
          this.userIsLoggedIn.next(true);
        })
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
    this.userIsLoggedIn.next(false);
  }
}
