import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

import { BankingAccount } from 'src/app/models/banking-account.model';
import { User } from 'src/app/models/user.model';

/**
 * Page showing details of a single bank account
 *
 * @export
 * @class SingleBankAccountPageComponent
 */
@Component({
  selector: 'app-single-bank-account-page',
  templateUrl: './single-bank-account-page.component.html',
  styleUrls: ['./single-bank-account-page.component.scss'],
})
export class SingleBankAccountPageComponent {
  /** Current user */
  user: User;

  /** The current selected account */
  currentAccount!: BankingAccount;

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
    private authService: AuthService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user = this.authService.getUser();

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
}
