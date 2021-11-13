import { Component } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { DebugPageService } from '../../services/debug-page.service';

import { User } from 'src/app/models/user.model';
import { Transaction } from 'src/app/models/transaction.model';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@UntilDestroy()
@Component({
  templateUrl: './debug-setup.component.html',
  styleUrls: ['./debug-setup.component.scss'],
})
export class DebugSetupComponent {
  mockUser!: User;

  mockUserTransactions!: Transaction[];

  constructor(
    private toastrService: ToastrService,
    private debugService: DebugPageService,
    private cookieService: CookieService,
    private authService: AuthService
  ) {
    this.authService
      .getUser()
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.mockUser = user;

        this.mockUserTransactions = this.getSpreadUserTransactions();
      });
  }

  getSpreadUserTransactions(): Transaction[] {
    let allTransactions = [] as Transaction[];

    this.mockUser.accounts?.forEach((account) => {
      account.transactions?.forEach((transaction) => {
        allTransactions.push(transaction);
      });
    });

    // Order by date
    allTransactions = allTransactions.sort(
      (a, b) => a.date.getTime() - b.date.getDate()
    );

    return allTransactions;
  }

  sendGetRequest() {
    this.debugService
      .sendGetRequest()
      .pipe(untilDestroyed(this))
      .subscribe(
        (res) => {
          console.log(res);
          this.toastrService.success(`${res.status} ${res.body}`);
        },

        (err) => {
          console.error(err);
          this.toastrService.error(`${err.status} ${err.error.body}`);
        }
      );
  }

  sendPostRequest() {
    this.debugService
      .sendPostRequest()
      .pipe(untilDestroyed(this))
      .subscribe(
        (res) => {
          console.log(res);
          this.toastrService.success(`${res.status} ${res.body}`);
        },
        (err) => {
          console.error(err);
          this.toastrService.error(`${err.status} ${err.error.body}`);
        }
      );
  }

  sendNewAccountRequest() {
    this.debugService
      .sendNewAccountRequest(this.mockUser)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res) => {
          console.log(res);
          this.toastrService.success(`${res.status} ${res.body}`);
        },
        (err) => {
          console.error(err);
          this.toastrService.error(`${err.status} ${err.error.body}`);
        }
      );
  }

  checkAvailableCookies() {
    let cookieNames = Object.keys(this.cookieService.getAll());

    if (cookieNames.length > 0) {
      cookieNames.forEach((name) => {
        console.log(`${name}: ${this.cookieService.get(name)}\n\n`);
      });
    } else {
      console.log('Looks like you have no cookies :(');
    }
  }

  deleteAllAvailableCookies() {
    this.cookieService.deleteAll();
    console.log('All your cookies have been deleted >:D ');
  }

  getAuthenticatedCookie() {
    this.debugService.sendLoginRequest(this.mockUser).subscribe(() => {
      let authCookie = this.cookieService.get(environment.AUTH_COOKIE_NAME);

      if (authCookie !== '' && authCookie !== undefined) {
        console.log(`Got the following cookie: \n${authCookie}`);
      } else {
        console.log('No authed cookies for you :(');
      }
    });
  }
}
