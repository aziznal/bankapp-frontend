import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class FinancialOperationsService {
  constructor(private http: HttpClient) {}

  /**
   * Sends request to send money from current user to another user's account
   *
   * @param {string} sendingAccountLabel
   * @param {string} receiverEmail
   * @param {string} receivingAccountLabel
   * @param {number} amount
   * @return {*}  {Observable<any>}
   * @memberof SendMoneyService
   */
  sendMoney(
    sendingAccountLabel: string,
    receiverEmail: string,
    receivingAccountLabel: string,
    amount: number
  ): Observable<any> {
    return this.http.post(environment.API.USERS.SEND_MONEY, {
      sendingAccountLabel,
      receiverEmail,
      receivingAccountLabel,
      amount,
    });
  }

  /**
   * Allows user to make bad life decisions and go into crippling debt
   *
   * @param {string} borrowingAccountLabel
   * @param {number} amount
   * @return {*}  {Observable<any>}
   * @memberof FinancialOperationsService
   */
  borrowMoney(borrowingAccountLabel: string, amount: number): Observable<any> {
    return this.http.post(environment.API.USERS.BORROW_MONEY, {
      borrowingAccountLabel,
      amount,
    });
  }
}
