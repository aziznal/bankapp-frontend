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

  /**
   * Sends request to get all user's banking accounts
   *
   * @return {*}  {Observable<BankingAccount[]>}
   * @memberof CreateBankingAccountService
   */
  getBankAccounts(): Observable<BankingAccount[]> {
    return this.http.get<BankingAccount[]>(environment.API.USERS.GET_ACCOUNTS);
  }
}
