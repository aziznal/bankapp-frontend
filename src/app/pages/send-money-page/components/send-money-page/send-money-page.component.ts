import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

// TODO: add button to 'check' if receiving person actually exists

// TODO: add validator to make sure user can't send more money than they have

// TODO: add field so user can pick which account they're sending money from (make all other fields disabled until this field is populated)

/**
 * Page allowing user to send money to another account
 *
 * @export
 * @class SendMoneyPageComponent
 */
@Component({
  templateUrl: './send-money-page.component.html',
  styleUrls: ['./send-money-page.component.scss'],
})
export class SendMoneyPageComponent {
  /** Current user */
  user: User;

  /** Form for sending money */
  sendMoneyForm: FormGroup;

  /**
   * Creates an instance of SendMoneyPageComponent.
   *
   * @param {AuthService} authService
   * @param {FormBuilder} formBuilder
   * @param {ToastrService} toastrService
   * @memberof SendMoneyPageComponent
   */
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {
    this.user = this.authService.getUser();
    this.sendMoneyForm = this.createFormGroup();
  }

  /**
   * Creates and returns form for sending money
   *
   * @return {*}  {FormGroup}
   * @memberof SendMoneyPageComponent
   */
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      sendTo: ['', Validators.required],
      amount: [1, [Validators.minLength(1), Validators.maxLength(10)]],
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

    if (!this.sendMoneyForm.valid) {
      this.toastrService.error(
        'Unable to send money. Check that all fields have valid values.',
        'Failed to send money'
      );

      return;
    }

    this.toastrService.info(
      `Sending ${this.sendMoneyForm.controls.amount.value} ₺ to ${this.sendMoneyForm.controls.sendTo.value}`,
      'Sending Money'
    );
  }
}
