import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AccountSettingsService {
  constructor(private http: HttpClient) {}

  /**
   * Sends request to update account information
   *
   * @param {{
   *     fullname?: string;
   *     email?: string;
   *     birthdate?: Date;
   *     phoneNumber?: string;
   *   }} newInformation
   * @return {*}  {Observable<any>}
   * @memberof AccountSettingsService
   */
  updateAccountInformation(newInformation: {
    fullname?: string;
    email?: string;
    birthdate?: Date;
    phoneNumber?: string;
  }): Observable<any> {
    return this.http.post(
      environment.API.USERS.UPDATE_ACCOUNT_INFO,
      newInformation
    );
  }
}
