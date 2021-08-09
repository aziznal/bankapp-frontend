import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from 'src/app/models/user.model';

const BACKEND_URL = 'http://localhost:8080';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class DebugPageService {
  constructor(private http: HttpClient) {}

  sendGetRequest() {
    console.log('Sending Get Request');

    this.http
      .get(BACKEND_URL)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res) => {
          console.log(res);
        },

        (err) => {
          console.error(err);
        }
      );
  }

  sendPostRequest() {
    console.log('Sending Post Request');

    this.http
      .post(BACKEND_URL, { body: 'hello backend!' })
      .pipe(untilDestroyed(this))
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.error(err);
        }
      );
  }

  sendNewAccountRequest(user: User) {
    console.log('Sending new account request');

    console.log('Including user');
    console.log(user);

    this.http
      .post<any>(`${BACKEND_URL}/new-user`, user)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.error(err);
        }
      );
  }
}
