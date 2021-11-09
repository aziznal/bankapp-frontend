import { Component, ElementRef, ViewChild } from '@angular/core';

import { User } from 'src/app/models/user.model';
import { Transaction } from 'src/app/models/transaction.model';
import { BankingAccount } from 'src/app/models/banking-account.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

// TODO: make barchart width dynamic (make it fit its container's width)

interface AppendedTransaction {
  transaction: Transaction;
  account: BankingAccount;
}

@Component({
  templateUrl: './main-page-content.component.html',
  styleUrls: ['./main-page-content.component.scss'],
})
export class MainPageContentComponent {
  @ViewChild('accountsList') accountsList!: ElementRef<HTMLDivElement>;
  user: User;
  netBalance: number;

  appendedTransactions: AppendedTransaction[];
  flatTransactionList: Transaction[];

  transactionOrderType: 'Date' | 'Amount' = 'Date';

  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.getUser();
    this.netBalance = this.getNetBalance();

    this.appendedTransactions = this.getAppendedTransactions();
    this.flatTransactionList = this.getTransactionList();
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
  getAppendedTransactions(): AppendedTransaction[] {
    let aggregatedTransactions = [] as AppendedTransaction[];

    this.user.accounts?.forEach((account) => {
      account.transactionHistory?.forEach((transaction) => {
        aggregatedTransactions.push({ transaction, account });
      });
    });

    return aggregatedTransactions;
  }

  getTransactionList(): Transaction[] {
    let transactions = [] as Transaction[];

    this.user.accounts?.forEach((account) => {
      account.transactionHistory?.forEach((transaction) => {
        transactions.push(transaction);
      });
    });

    return transactions;
  }

  /**
   * Orders given array of transactions by transaction array
   *
   * @param {Transaction[]} transactionArray
   * @return {*}  {Transaction[]}
   * @memberof MainPageContentComponent
   */
  orderTransactionsByDate(): AppendedTransaction[] {
    return this.appendedTransactions.sort(
      (a, b) => a.transaction.date.getTime() - b.transaction.date.getTime()
    );
  }

  /**
   * Orders given transaction array by amount involved in transaction
   *
   * @param {Transaction[]} transactionArray
   * @return {*}  {Transaction[]}
   * @memberof MainPageContentComponent
   */
  orderTransactionsByAmount(): AppendedTransaction[] {
    return this.appendedTransactions.sort(
      (a, b) => b.transaction.amount - a.transaction.amount
    );
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

  navigateToAccountPage(account: BankingAccount) {
    this.router.navigate([`account`, `${account.accountNo}`]);
  }

  navigateToTransactionPage(appendedTransaction: AppendedTransaction) {
    this.router.navigate([
      `transaction`,
      `${appendedTransaction.account.accountNo}`,
      `${appendedTransaction.transaction.transactionNo}`,
    ]);
  }
}
