import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

/**
 * Page for creating a new bank account.
 *
 * @export
 * @class CreateBankingAccountPageComponent
 */
@Component({
  selector: 'app-create-banking-account-page',
  templateUrl: './create-banking-account-page.component.html',
  styleUrls: ['./create-banking-account-page.component.scss'],
})
export class CreateBankingAccountPageComponent {
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
    private toastrService: ToastrService
  ) {
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

    if (this.form.valid) {
      this.toastrService.info(
        'Creating a new banking account with the entered information...',
        'Procesing your request...'
      );
    } else {
      this.form.markAllAsTouched();

      this.toastrService.error(
        'Make sure to provide all required information in all fields',
        "Couldn't Process your Request!"
      );
    }
  }
}
