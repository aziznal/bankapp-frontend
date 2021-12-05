import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

import { BankingAccount } from 'src/app/interfaces/banking-account.interface';
import { User } from 'src/app/interfaces/user.interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

/**
 * Page showing details of a single bank account
 *
 * @export
 * @class SingleBankAccountPageComponent
 */
@UntilDestroy()
@Component({
  selector: 'app-single-bank-account-page',
  templateUrl: './single-bank-account-page.component.html',
  styleUrls: ['./single-bank-account-page.component.scss'],
})
export class SingleBankAccountPageComponent {
  /** Current user */
  user!: User;

  /** The current selected account */
  currentAccount!: BankingAccount;

  barchartWidth: number;

  /**
   * Creates an instance of SingleBankAccountPageComponent. Handles errors if
   * bad account id is given
   *
   * @param {AuthService} authService
   * @param {ToastrService} toastrService
   * @param {ActivatedRoute} route
   * @param {Router} router
   * @memberof SingleBankAccountPageComponent
   */
  constructor(
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user = this.route.snapshot.data.user;
    this.getAccountInfoFromUrl();

    this.barchartWidth = (window.innerWidth * 35) / 100;
  }

  @HostListener('window:resize', ['$event'])
  onResize(_event: any) {
    this.barchartWidth = (window.innerWidth * 35) / 100;
  }

  /**
   * Displays info about the account the info of which is passed in the url.
   * Goes to home page if the given account id is invalid.
   *
   * @memberof SingleBankAccountPageComponent
   */
  getAccountInfoFromUrl() {
    this.route.params.subscribe((params) => {
      this.currentAccount = this.user.accounts!.find((account) => {
        return account.label === params['accountNo'];
      }) as BankingAccount;

      // In case user is refreshing an old page or an account has been deleted in-session.
      if (!this.currentAccount) {
        this.router.navigateByUrl('/');
        this.toastrService.error(
          "The account you're attempting to access doesn't seem to exist.",
          'Account not found'
        );
      }
    });
  }

  navigateToTransactionPage(transactionId: string): void {
    this.router.navigate([
      'transaction',
      this.currentAccount.label,
      transactionId,
    ]);
  }
}
