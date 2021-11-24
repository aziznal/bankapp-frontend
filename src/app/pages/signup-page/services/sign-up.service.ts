import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { User } from 'src/app/interfaces/user.interface';
import { Observable } from 'rxjs';
import { NewUser } from 'src/app/interfaces/new-user.interface';

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
  createNewUser(user: NewUser): Observable<any> {
    return this.http.post(environment.API.REGISTER, user);
  }
}
