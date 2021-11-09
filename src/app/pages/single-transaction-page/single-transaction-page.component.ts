import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { BankingAccount } from 'src/app/models/banking-account.model';
import { Transaction } from 'src/app/models/transaction.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-single-transaction-page',
  templateUrl: './single-transaction-page.component.html',
  styleUrls: ['./single-transaction-page.component.scss'],
})
export class SingleTransactionPageComponent {
  user: User;
  currentAccount!: BankingAccount;
  currentTransaction!: Transaction;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user = this.authService.getUser();

    this.route.params.subscribe({
      next: (params) => {
        this.currentAccount = this.user.accounts!.find((account) => {
          return account.accountNo === params['accountNo'];
        }) as BankingAccount;

        try {
          this.currentTransaction =
            this.currentAccount.transactionHistory!.find((transaction) => {
              return transaction.transactionNo === params['transactionNo'];
            }) as Transaction;
        } catch (e) {
          this.router.navigateByUrl('/');
          this.toastrService.error(
            "The account or transaction you're attempting to access don't seem to exist.",
            'Account or Transaction not found'
          );
        }

        console.log(this.currentAccount);
        console.log(this.currentAccount);

        // In case user is refreshing an old page or an account has been deleted in-session.
        if (
          !this.currentAccount.accountNo ||
          !this.currentTransaction.transactionNo
        ) {
          this.router.navigateByUrl('/');
          this.toastrService.error(
            "The account or transaction you're attempting to access don't seem to exist.",
            'Account or Transaction not found'
          );
        }
      },

      error: (e) => {
        console.log('ya done goofed');
        this.router.navigateByUrl('/');
        this.toastrService.error(
          "The account or transaction you're attempting to access don't seem to exist.",
          'Account or Transaction not found'
        );
      },
    });
  }

  navigateToAccountPage(account: BankingAccount) {
    this.router.navigate([`account`, `${account.accountNo}`]);
  }
}
