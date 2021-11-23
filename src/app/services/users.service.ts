import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BankingAccount } from '../interfaces/banking-account.interface';

import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) {}

  /**
   * Returns a user object with everything included, such as accounts and transactions.
   *
   * @return {*}  {Observable<User>}
   * @memberof UsersService
   */
  getAllUserData(): Observable<User> {
    return this.http.get<User>(environment.API.USERS.GET_USER_DATA);
  }

  /**
   * Returns an array of simplified transactions useful for building charts
   *
   * @return {*}  {Observable<{ date: Date; amount: number }[]>}
   * @memberof UsersService
   */
  getSimplifiedTransactions(): Observable<{ date: Date; amount: number }[]> {
    return this.http.get<any>(
      environment.API.USERS.GET_SIMPLIFIED_TRANSACTIONS
    );
  }

  /**
   * Sends request to get all user's banking accounts
   *
   * @return {*}  {Observable<BankingAccount[]>}
   * @memberof UsersService
   */
  getBankingAccounts(): Observable<BankingAccount[]> {
    return this.http.get<BankingAccount[]>(environment.API.USERS.GET_ACCOUNTS);
  }
}
