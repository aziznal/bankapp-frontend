import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  username: string;
  userPassword: string;

  userIsLoggedIn: boolean = false;

  /**
   *
   * Sets default values for username and password. Checks if user is logged in.
   *
   * @param  {HttpClient} privatehttp
   */
  constructor(private http: HttpClient) {
    this.userIsLoggedIn = this.checkIfUserIsLoggedIn();

    this.username = "";
    this.userPassword = "";

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
  logUserIn(email: string, password: string): void {
    // TODO: store session cookie after user logs in.
    this.userIsLoggedIn = true;
    console.log("User has been logged in!")

    

  }

  /**
   *
   * Logs user out and removes session cookies
   *
   * @returns void
   */
  logUserOut(): void {
    // TODO: delete session cookie after user logs out.
    this.userIsLoggedIn = false;
  }
}
