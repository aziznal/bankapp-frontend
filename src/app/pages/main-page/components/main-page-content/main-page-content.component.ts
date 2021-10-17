import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/pages/login-page/services/login.service';

import { User } from 'src/app/models/user.model';
import { Transaction } from 'src/app/models/transaction.model';

@Component({
  templateUrl: './main-page-content.component.html',
  styleUrls: ['./main-page-content.component.scss'],
})
export class MainPageContentComponent {
  @ViewChild('accountsList') accountsList!: ElementRef<HTMLDivElement>;
  user: User;
  netBalance: number;
  allTransactions: Transaction[];
  transactionOrderType: 'Date' | 'Amount' = 'Date';

  constructor(private loginService: LoginService) {
    this.user = this.loginService.getUser();
    this.netBalance = this.getNetBalance();

    this.allTransactions = this.getAllTransactions();
    this.reOrderTransactions();
  }

  /**
   * Returns sum of all balance available in all accounts
   *
   * @return {*}  {number}
   * @memberof MainPageContentComponent
   */
  getNetBalance(): number {
    let netBalance = 0;

    this.user.accounts?.forEach((account) => {
      netBalance += account.balance;
    });

    return netBalance;
  }

  /**
   * Returns all user's transactions from all accounts, sorted by date.
   *
   * @return {*}  {Transaction[]}
   * @memberof MainPageContentComponent
   */
  getAllTransactions(): Transaction[] {
    let aggregatedTransactions = [] as Transaction[];

    this.user.accounts?.forEach((account) => {
      account.transactionHistory?.forEach((transaction) => {
        aggregatedTransactions.push(transaction);
      });
    });

    return aggregatedTransactions;
  }

  /**
   * Orders given array of transactions by transaction array
   *
   * @param {Transaction[]} transactionArray
   * @return {*}  {Transaction[]}
   * @memberof MainPageContentComponent
   */
  orderTransactionsByDate(): Transaction[] {
    return this.allTransactions.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
  }

  /**
   * Orders given transaction array by amount involved in transaction
   *
   * @param {Transaction[]} transactionArray
   * @return {*}  {Transaction[]}
   * @memberof MainPageContentComponent
   */
  orderTransactionsByAmount(): Transaction[] {
    return this.allTransactions.sort((a, b) => b.amount - a.amount);
  }

  reOrderTransactions() {
    if (this.transactionOrderType === 'Amount') {
      this.orderTransactionsByAmount();
    } else {
      this.orderTransactionsByDate();
    }
  }

  scrollAccountsListToRight() {
    this.accountsList.nativeElement.scrollBy({
      left: 225,
      behavior: 'smooth',
    });
  }

  scrollAccountsListToLeft() {
    this.accountsList.nativeElement.scrollBy({
      left: -225,
      behavior: 'smooth',
    });
  }
}
