import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  username: string;
  userPassword: string;

  userIsLoggedIn: boolean = false;

  /**
   * Creates an instance of LoginService. Sets default values for username and password. Checks if user is logged in.
   *
   * @param {HttpClient} http
   * @param {ToastrService} toastrService
   * @memberof LoginService
   */
  constructor(private http: HttpClient) {
    this.userIsLoggedIn = this.checkIfUserIsLoggedIn();

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
    // TODO: check for user session cookies.
    return false;
  }

  /**
   *
   * Logs User In and stores a session cookie
   *
   * @returns void
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post(environment.API.LOGIN_URL, { email, password }).pipe(
      map((response) => {
        // TODO: store session cookie after user logs in.
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
    // TODO: delete session cookie after user logs out.
    this.userIsLoggedIn = false;
  }
}
