import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { concatMap } from 'rxjs/operators';
import { BankingAccount } from 'src/app/interfaces/banking-account.interface';
import { User } from 'src/app/interfaces/user.interface';
import { AccountSettingsService } from 'src/app/pages/account-settings-page/services/account-settings.service';
import { UsersService } from 'src/app/services/users.service';
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';
import { EditAccountDialogComponent } from '../edit-account-dialog/edit-account-dialog.component';

@UntilDestroy()
@Component({
  templateUrl: 'manage-accounts-page.component.html',
  styleUrls: ['manage-accounts-page.component.scss'],
})
export class ManageAccountsPageComponent {
  user: User;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private accountSettingsService: AccountSettingsService,
    private usersService: UsersService
  ) {
    this.user = this.route.snapshot.data.user;
  }

  editBankingAccount(editedAccount: BankingAccount) {
    const dialogRef = this.dialog.open(EditAccountDialogComponent, {
      width: '400px',
      disableClose: true,
      data: {
        editedAccountLabel: editedAccount.label,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((newAccountLabel: string) => {
        if (!newAccountLabel) {
          this.toastrService.error(
            'Must provide new label in order to apply changes',
            'Unable to proceed'
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

        this.accountSettingsService
          .editBankingAccount(editedAccount.label, newAccountLabel)
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

  deleteBankingAccount(deletedAccount: BankingAccount) {
    const dialogRef = this.dialog.open(DeleteAccountDialogComponent, {
      width: '400px',
      disableClose: true,
      data: {
        deletedAccountLabel: deletedAccount.label,
        userAccountLabels: this.user.accounts
          ?.map((account) => account.label)
          .filter((label) => label != deletedAccount.label),
      },
    });

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((fallbackAccountLabel: string) => {
        if (!fallbackAccountLabel) {
          this.toastrService.error(
            "Please provide an account label to transfer your deleted account's remaining funds",
            'Unable to proceed'
          );

          return;
        }

        this.accountSettingsService
          .deleteBankingAccount(deletedAccount.label, fallbackAccountLabel)
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
