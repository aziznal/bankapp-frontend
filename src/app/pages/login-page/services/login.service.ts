import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';

import { User } from 'src/app/models/user.model';

import { environment } from 'src/environments/environment';

const DEFAULT_USER: User = {
  email: 'mockuser@email.com',
  name: 'John Doe',
  password: 'password',
  accounts: [
    {
      accountNo: "1",
      balance: Math.round(Math.random() * 10 ** 4),
      ownerName: 'John Doe',
      transactionHistory: [
        {
          action: 'RECEIVED',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-08-01'),
          from: 'Jane Doe',
          to: 'John Doe',
          transactionNo: '1',
        },
        {
          action: 'SENT',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-08-07'),
          from: 'John Doe',
          to: 'Jane Doe',
          transactionNo: '2',
        },
        {
          action: 'RECEIVED',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-09-23'),
          from: 'Jane Doe',
          to: 'John Doe',
          transactionNo: '3',
        },
      ],
    },
    {
      accountNo: Math.round(Math.random() * 10 ** 6).toString(),
      balance: 3500,
      ownerName: 'John Doe',
      transactionHistory: [
        {
          action: 'RECEIVED',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-08-13'),
          from: 'Jane Doe',
          to: 'John Doe',
          transactionNo: '4',
        },
        {
          action: 'SENT',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-08-19'),
          from: 'John Doe',
          to: 'Jane Doe',
          transactionNo: '5',
        },
        {
          action: 'RECEIVED',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-09-07'),
          from: 'Jane Doe',
          to: 'John Doe',
          transactionNo: '7',
        },
        {
          action: 'RECEIVED',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-09-09'),
          from: 'Jane Doe',
          to: 'John Doe',
          transactionNo: '8',
        },
        {
          action: 'RECEIVED',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-09-10'),
          from: 'Jane Doe',
          to: 'John Doe',
          transactionNo: '9',
        },
        {
          action: 'RECEIVED',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-09-15'),
          from: 'Jane Doe',
          to: 'John Doe',
          transactionNo: '10',
        },
        {
          action: 'RECEIVED',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-09-16'),
          from: 'Jane Doe',
          to: 'John Doe',
          transactionNo: '16',
        },
        {
          action: 'RECEIVED',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-09-17'),
          from: 'Jane Doe',
          to: 'John Doe',
          transactionNo: '17',
        },
        {
          action: 'RECEIVED',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-09-18'),
          from: 'Jane Doe',
          to: 'John Doe',
          transactionNo: '18',
        },
        {
          action: 'RECEIVED',
          amount: Math.round(Math.random() * 1000),
          date: new Date('2021-09-19'),
          from: 'Jane Doe',
          to: 'John Doe',
          transactionNo: '19',
        },
      ],
    },
    {
      accountNo: Math.round(Math.random() * 10 ** 6).toString(),
      balance: Math.round(Math.random() * 10 ** 4),
      ownerName: 'John Doe',
      transactionHistory: [],
    },
    {
      accountNo: Math.round(Math.random() * 10 ** 6).toString(),
      balance: Math.round(Math.random() * 10 ** 4),
      ownerName: 'John Doe',
      transactionHistory: [],
    },
    {
      accountNo: Math.round(Math.random() * 10 ** 6).toString(),
      balance: Math.round(Math.random() * 10 ** 4),
      ownerName: 'John Doe',
      transactionHistory: [],
    },
    {
      accountNo: Math.round(Math.random() * 10 ** 6).toString(),
      balance: Math.round(Math.random() * 10 ** 4),
      ownerName: 'John Doe',
      transactionHistory: [],
    },
  ],
};

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
   * Returns current user's information
   *
   * @return {*}  {User}
   * @memberof LoginService
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
