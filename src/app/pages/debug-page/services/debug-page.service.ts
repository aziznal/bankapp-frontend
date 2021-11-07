import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from 'src/app/models/user.model';

const BACKEND_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class DebugPageService {
  constructor(private http: HttpClient) {}

  sendGetRequest(): Observable<any> {
    console.log('Sending Get Request');
    return this.http.get(BACKEND_URL, {
      withCredentials: true,
    });
  }

  sendPostRequest(): Observable<any> {
    console.log('Sending Post Request');
    return this.http.post(BACKEND_URL, { body: 'hello backend!' });
  }

  sendNewAccountRequest(user: User): Observable<any> {
    console.log('Sending new account request');

    console.log('Including user');
    console.log(user);

    return this.http.post<any>(`${BACKEND_URL}/new-user`, user);
  }

  sendLoginRequest(mockUser: User): Observable<any> {
    return this.http.post(
      `${BACKEND_URL}/auth`,
      {
        email: mockUser.email,
        password: mockUser.password,
      },
      {
        withCredentials: true,
      }
    );
  }
}
