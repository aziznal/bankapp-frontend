import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewUser } from 'src/app/interfaces/new-user.interface';

import { User } from 'src/app/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DebugPageService {
  constructor(private http: HttpClient) {}

  sendGetRequest(): Observable<any> {
    console.log('Sending Get Request');
    return this.http.get(environment.baseApiUrl, {
      withCredentials: true,
    });
  }

  sendPostRequest(): Observable<any> {
    console.log('Sending Post Request');
    return this.http.post(environment.baseApiUrl, { body: 'hello backend!' });
  }

  sendNewAccountRequest(user: User): Observable<any> {
    console.log('Sending new account request');

    console.log('Including user');
    console.log(user);

    return this.http.post<any>(environment.API.REGISTER, user);
  }

  sendLoginRequest(mockUser: NewUser): Observable<any> {
    return this.http.post(
      environment.API.LOGIN,
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
