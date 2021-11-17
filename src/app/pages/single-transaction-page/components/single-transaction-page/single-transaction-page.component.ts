import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ToastrService } from 'ngx-toastr';

import { BankingAccount } from 'src/app/models/banking-account.model';
import { Transaction } from 'src/app/models/transaction.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

/**
 * Page for showing details for a single transaction
 *
 * @export
 * @class SingleTransactionPageComponent
 */
@UntilDestroy()
@Component({
  selector: 'app-single-transaction-page',
  templateUrl: './single-transaction-page.component.html',
  styleUrls: ['./single-transaction-page.component.scss'],
})
export class SingleTransactionPageComponent {
  /** Current user */
  user!: User;

  /** associated account for the current transaction */
  currentAccount!: BankingAccount;

  /** current transaction data */
  currentTransaction!: Transaction;

  /**
   * Creates an instance of SingleTransactionPageComponent. Handles errors for
   * bad transaction id
   * @param {AuthService} authService
   * @param {ToastrService} toastrService
   * @param {ActivatedRoute} route
   * @param {Router} router
   * @memberof SingleTransactionPageComponent
   */
  constructor(
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user = this.route.snapshot.data.user;
    this.getTransactionInfoFromUrl();
  }

  /**
   * Displays info about the transaction the info of which is passed in the url.
   * Goes to home page if the given transaction id is invalid.
   *
   * @memberof SingleTransactionPageComponent
   */
  getTransactionInfoFromUrl() {
    this.route.params.subscribe({
      next: (params) => {
        this.currentAccount = this.user.accounts!.find((account) => {
          return account.label === params['accountNo'];
        }) as BankingAccount;

        try {
          this.currentTransaction = this.currentAccount.transactions!.find(
            (transaction) => {
              return transaction.id === params['transactionNo'];
            }
          ) as Transaction;
        } catch (e) {
          this.router.navigateByUrl('/');
          this.toastrService.error(
            "The account or transaction you're attempting to access don't seem to exist.",
            'Account or Transaction not found'
          );
        }

        // In case user is refreshing an old page or an account has been deleted in-session.
        if (!this.currentAccount.label || !this.currentTransaction.id) {
          this.router.navigateByUrl('/');
          this.toastrService.error(
            "The account or transaction you're attempting to access don't seem to exist.",
            'Account or Transaction not found'
          );
        }
      },

      error: (e) => {
        this.router.navigateByUrl('/');
        this.toastrService.error(
          "The account or transaction you're attempting to access don't seem to exist.",
          'Account or Transaction not found'
        );
      },
    });
  }

  /**
   * Navigates to assoicated account page for the current transaction
   *
   * @param {BankingAccount} account
   * @memberof SingleTransactionPageComponent
   */
  navigateToAccountPage(account: BankingAccount) {
    this.router.navigate([`account`, `${account.label}`]);
  }
}
