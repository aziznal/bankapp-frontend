import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, concatMap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { CreateBankingAccountService } from '../../services/create-banking-account.service';

import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

/**
 * Page for creating a new bank account.
 *
 * @export
 * @class CreateBankingAccountPageComponent
 */
@UntilDestroy()
@Component({
  selector: 'app-create-banking-account-page',
  templateUrl: './create-banking-account-page.component.html',
  styleUrls: ['./create-banking-account-page.component.scss'],
})
export class CreateBankingAccountPageComponent {
  user: User;

  /**
   * Form for fields relating to creating a new banking account
   *
   * @type {FormGroup}
   * @memberof CreateBankingAccountPageComponent
   */
  form: FormGroup;

  /**
   * Creates an instance of CreateBankingAccountPageComponent. Inits form.
   *
   * @param {FormBuilder} formBuilder
   * @param {ToastrService} toastrService
   * @memberof CreateBankingAccountPageComponent
   */
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private createBankingAccountService: CreateBankingAccountService,
    private usersService: UsersService
  ) {
    this.user = this.route.snapshot.data.user;
    this.form = this.createFormGroup();
  }

  /**
   * Creates and returns a form for banking account creation
   *
   * @return {*}  {FormGroup}
   * @memberof CreateBankingAccountPageComponent
   */
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      accountLabel: ['', Validators.required],
    });
  }

  /**
   * Creates a new banking account if form is valid
   *
   * @param {Event} event
   * @memberof CreateBankingAccountPageComponent
   */
  createNewAccount(event: Event): void {
    event.preventDefault();

    // Check given label doesn't already exist
    if (
      this.user.accounts?.some(
        (account) => account.label === this.form.controls.accountLabel.value
      )
    ) {
      this.toastrService.error(
        'The given account label is already in use by another account',
        'invalid label'
      );
      return;
    }

    if (this.form.valid) {
      this.createBankingAccountService
        .createBankingAccount(this.form.controls.accountLabel.value)
        .pipe(
          untilDestroyed(this),
          concatMap(() => {
            return this.usersService.getBankingAccounts();
          }),
          catchError((error) => {
            this.toastrService.error(
              `Something went wrong. ${error.message}`,
              `${error.name}`
            );
            throw error;
          })
        )
        .subscribe((newBankingAccounts) => {
          this.user.accounts = newBankingAccounts;

          this.toastrService.success(
            'New account created successfully!',
            'Success'
          );
        });
    } else {
      this.form.markAllAsTouched();

      this.toastrService.error(
        'Make sure to provide all required information in all fields',
        "Couldn't Process your Request!"
      );
    }
  }
}
