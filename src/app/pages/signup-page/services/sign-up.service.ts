import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  /**
   * Creates an instance of SignUpService.
   *
   * @param {HttpClient} http
   * @memberof SignUpService
   */
  constructor(private http: HttpClient) {}

  /**
   * Sends request to create a new user
   *
   * @param {User} user
   * @return {*}  {Observable<any>}
   * @memberof SignUpService
   */
  createNewUser(user: User): Observable<any> {
    return this.http.post(environment.API.REGISTER, user);
  }
}
