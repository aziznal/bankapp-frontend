import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, concatMap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';
import { FinancialOperationsService } from '../../services/financial-operations.service';

import { User } from 'src/app/interfaces/user.interface';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Page allowing user to send money to another account
 *
 * @export
 * @class SendMoneyPageComponent
 */
@UntilDestroy()
@Component({
  templateUrl: './financial-operations-page.component.html',
  styleUrls: ['./financial-operations-page.component.scss'],
})
export class FinancialOperationsPageComponent {
  /** Current user */
  user!: User;

  /** Form for sending money */
  sendMoneyForm: FormGroup;

  borrowMoneyForm: FormGroup;

  disableSendButton: boolean = false;

  /**
   * Creates an instance of SendMoneyPageComponent.
   *
   * @param {AuthService} authService
   * @param {FormBuilder} formBuilder
   * @param {ToastrService} toastrService
   * @memberof SendMoneyPageComponent
   */
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private financialOperationsService: FinancialOperationsService,
    private usersService: UsersService
  ) {
    this.user = this.route.snapshot.data.user;
    this.sendMoneyForm = this.createSendMoneyFormGroup();
    this.borrowMoneyForm = this.createBorrowMoneyFormGroup();
  }

  /**
   * Creates and returns form for sending money
   *
   * @return {*}  {FormGroup}
   * @memberof SendMoneyPageComponent
   */
  createSendMoneyFormGroup(): FormGroup {
    return this.formBuilder.group({
      sendingAccountLabel: ['', Validators.required],
      receiverEmail: ['', [Validators.email, Validators.required]],
      receivingAccountLabel: ['', Validators.required],
      amount: [1, [Validators.min(1), Validators.required]],
    });
  }

  createBorrowMoneyFormGroup(): FormGroup {
    return this.formBuilder.group({
      borrowingAccountLabel: ['', Validators.required],
      amount: [1, [Validators.min(1), Validators.required]],
    });
  }

  /**
   * Sends money according to provided fields if form is correct
   *
   * @param {Event} event
   * @return {*}  {void}
   * @memberof SendMoneyPageComponent
   */
  sendMoney(event: Event): void {
    event.preventDefault();

    // Confirm form is valid
    if (!this.sendMoneyForm.valid) {
      this.sendMoneyForm.markAllAsTouched();

      this.toastrService.error(
        'Unable to send money. Check that all fields have valid values.',
        'Failed to send money'
      );

      return;
    }

    // Confirm user has enough money
    const sendingAccount = this.user.accounts!.find(
      (account) =>
        account.label === this.sendMoneyForm.controls.sendingAccountLabel.value
    );
    if (sendingAccount!.balance < this.sendMoneyForm.controls.amount.value) {
      this.toastrService.error(
        'The chosen account does not have enough money to commit the transaction',
        'Insufficient Funds'
      );

      return;
    }

    // If everything checks out

    // Disable the send button to prevent issues
    this.disableSendButton = true;

    this.financialOperationsService
      .sendMoney(
        this.sendMoneyForm.controls.sendingAccountLabel.value,
        this.sendMoneyForm.controls.receiverEmail.value,
        this.sendMoneyForm.controls.receivingAccountLabel.value,
        this.sendMoneyForm.controls.amount.value
      )
      .pipe(
        untilDestroyed(this),
        concatMap(() => {
          return this.usersService.getBankingAccounts();
        }),
        catchError((error: { error: HttpErrorResponse }) => {
          this.toastrService.error(
            `Something went wrong. ${error.error.message}`,
            `${error.error.error}` // Why, yes! I do consider myself a professional programmer. Why do you ask?
          );

          this.disableSendButton = false;

          throw error;
        })
      )
      .subscribe((newBankingAccounts) => {
        this.user.accounts = newBankingAccounts;

        this.toastrService.success(
          'Successfully performed money transfer.',
          'Success!'
        );

        // re-enable button if everything is good
        this.disableSendButton = false;
      });
  }

  borrowMoney(event: Event): void {
    event.preventDefault();

    // Confirm form is valid
    if (!this.borrowMoneyForm.valid) {
      this.borrowMoneyForm.markAllAsTouched();

      this.toastrService.error(
        'Unable to borrow money. Check that all fields have valid values.',
        'Failed to borrow money'
      );

      return;
    }

    // confirm borrowing account label actually exists for user
    if (
      !this.user.accounts?.some(
        (account) =>
          account.label ===
          this.borrowMoneyForm.controls.borrowingAccountLabel.value
      )
    ) {
      this.toastrService.error(
        'Given account does not seem to exist for current user',
        'Account does not exist'
      );

      return;
    }

    this.financialOperationsService
      .borrowMoney(
        this.borrowMoneyForm.controls.borrowingAccountLabel.value,
        this.borrowMoneyForm.controls.amount.value
      )
      .pipe(
        untilDestroyed(this),
        concatMap(() => this.usersService.getAllUserData())
      )
      .subscribe({
        next: (newUser) => {
          this.user = newUser;

          this.toastrService.success('Successfully went into debt', 'Great!');
        },
        error: (error: HttpErrorResponse) => {
          this.toastrService.error(
            'Something went wrong. ' + error.message,
            error.name
          );
        },
      });
  }
}
