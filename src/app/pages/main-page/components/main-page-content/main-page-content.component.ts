import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { UsersService } from 'src/app/services/users.service';

import { User } from 'src/app/interfaces/user.interface';
import { BankingAccount } from 'src/app/interfaces/banking-account.interface';
import { Transaction } from 'src/app/interfaces/transaction.interface';
import { MatDialog } from '@angular/material/dialog';
import { NewBankingAccountDialogComponent } from '../new-banking-account-dialog/new-banking-account-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { MainPageService } from '../services/main-page.service';
import { concatMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * an object that extends transaction but also has a field for the account
 * associated with that transaction
 *
 * @interface AppendedTransaction
 */
interface AppendedTransaction {
  transaction: Transaction;
  account: BankingAccount;
}

/**
 * Main page component shows three main sections, including "Accounts",
 * "Assets", and "Recent Transactions"
 *
 * @export
 * @class MainPageContentComponent
 */
@UntilDestroy()
@Component({
  templateUrl: './main-page-content.component.html',
  styleUrls: ['./main-page-content.component.scss'],
})
export class MainPageContentComponent {
  /**  Stores ref to list of banking accounts */
  @ViewChild('accountsList') accountsList!: ElementRef<HTMLDivElement>;

  /**
   * Current user
   *
   * @type {User}
   * @memberof MainPageContentComponent
   */
  user!: User;

  /** Total balance of all accounts of the current user */
  netBalance!: number;

  /** stores ordered list of appended transactions */
  appendedTransactions!: AppendedTransaction[];

  /** Stores list of transactions */
  flatTransactionList!: Transaction[];

  simplifiedTransactions!: { date: Date; amount: number }[];

  /** Stores order-type of transactions */
  transactionOrderType: 'Date' | 'Amount' = 'Date';

  loading: boolean;

  barchartWidth!: number;

  /**
   * Creates an instance of MainPageContentComponent.
   *
   * @param {AuthService} authService
   * @param {Router} router
   * @memberof MainPageContentComponent
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private usersService: UsersService,
    private mainPageService: MainPageService,
    private dialog: MatDialog
  ) {
    this.loading = true;

    this.user = this.route.snapshot.data.user;
    this.netBalance = this.getNetBalance();

    this.appendedTransactions = this.getAppendedTransactions();
    this.flatTransactionList = this.getFlatTransactionList();
    this.reOrderTransactions();

    this.usersService
      .getSimplifiedTransactions()
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        this.simplifiedTransactions = result;
        this.loading = false;
      });

    this.barchartWidth = (window.innerWidth * 35) / 100;
  }

  @HostListener('window:resize', ['$event'])
  onResize(_event: any) {
    this.barchartWidth = (window.innerWidth * 35) / 100;
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
      account.transactions?.forEach((transaction) => {
        aggregatedTransactions.push({ transaction, account });
      });
    });

    return aggregatedTransactions;
  }

  /**
   * Returns a list of transaction objects from all accounts
   *
   * @return {*}  {Transaction[]}
   * @memberof MainPageContentComponent
   */
  getFlatTransactionList(): Transaction[] {
    let transactions = [] as Transaction[];

    this.user.accounts?.forEach((account) => {
      account.transactions?.forEach((transaction) => {
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

  /**
   * Causes transaction list to get re-ordered according to chosen ordering type
   *
   * @memberof MainPageContentComponent
   */
  reOrderTransactions(): void {
    if (this.transactionOrderType === 'Amount') {
      this.orderTransactionsByAmount();
    } else {
      this.orderTransactionsByDate();
    }
  }

  /**
   * Scrolls list of banking accounts to the right
   *
   * @memberof MainPageContentComponent
   */
  scrollAccountsListToRight(): void {
    // TODO: change this to make it scroll exactly one account-card
    this.accountsList.nativeElement.scrollBy({
      left: 225,
      behavior: 'smooth',
    });
  }

  /**
   * Scrolls list of banking accounts to the left
   *
   * @memberof MainPageContentComponent
   */
  scrollAccountsListToLeft() {
    // TODO: change this to make it scroll exactly one account-card
    this.accountsList.nativeElement.scrollBy({
      left: -225,
      behavior: 'smooth',
    });
  }

  /**
   * Navigates to a page showing chosen account in more detail
   *
   * @param {BankingAccount} account
   * @memberof MainPageContentComponent
   */
  navigateToAccountPage(account: BankingAccount) {
    this.router.navigate([`account`, `${account.label}`]);
  }

  /**
   * Navigates to page showing chosen transaction with more detail
   *
   * @param {AppendedTransaction} appendedTransaction
   * @memberof MainPageContentComponent
   */
  navigateToTransactionPage(appendedTransaction: AppendedTransaction) {
    this.router.navigate([
      `transaction`,
      `${appendedTransaction.account.label}`,
      `${appendedTransaction.transaction._id}`,
    ]);
  }

  createNewBankingAccount() {
    const dialogRef = this.dialog.open(NewBankingAccountDialogComponent, {
      width: '400px',
    });

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((newAccountLabel: string) => {
        if (!newAccountLabel) {
          this.toastrService.error(
            'Must provide new label in order to create account',
            'Account not created'
          );

          return;
        }

        // Confirm label is not already taken
        if (
          this.user.accounts?.some(
            (account) => account.label === newAccountLabel
          )
        ) {
          this.toastrService.error(
            'This label is already in use by another account',
            'Label already in use'
          );

          return;
        }

        this.mainPageService
          .createBankingAccount(newAccountLabel)
          .pipe(
            untilDestroyed(this),
            concatMap(() => {
              return this.usersService.getBankingAccounts();
            })
          )
          .subscribe({
            next: (newAccounts) => {
              this.user.accounts = newAccounts;

              this.toastrService.success(
                'Successfully deleted account',
                'Success'
              );
            },
            error: (error: HttpErrorResponse) => {
              this.toastrService.error(
                `Something went wrong. ${error.message}`,
                error.name
              );
            },
          });
      });
  }
}
