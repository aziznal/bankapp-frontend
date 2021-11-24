import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BankingAccount } from 'src/app/interfaces/banking-account.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CreateBankingAccountService {
  constructor(private http: HttpClient) {}

  /**
   * Sends request to create a new banking account
   *
   * @param {string} newAccountLabel
   * @return {*}  {Observable<any>}
   * @memberof CreateBankingAccountService
   */
  createBankingAccount(newAccountLabel: string): Observable<any> {
    return this.http.post(environment.API.USERS.NEW_BANKING_ACCOUNT, {
      label: newAccountLabel,
    });
  }
}
