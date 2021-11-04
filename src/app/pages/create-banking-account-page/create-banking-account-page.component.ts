import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-banking-account-page',
  templateUrl: './create-banking-account-page.component.html',
  styleUrls: ['./create-banking-account-page.component.scss'],
})
export class CreateBankingAccountPageComponent {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {
    this.formGroup = this.createFormGroup();
  }

  /**
   * Creates and returns a form-group for banking account creation
   *
   * @return {*}  {FormGroup}
   * @memberof CreateBankingAccountPageComponent
   */
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      accountLabel: ['', Validators.required],
    });
  }

  createNewAccount(event: Event): void {
    event.preventDefault();

    if (this.formGroup.valid) {
      this.toastrService.info(
        'Creating a new banking account with the entered information...',
        'Procesing your request...'
      );
    } else {
      this.formGroup.markAllAsTouched();

      this.toastrService.error(
        'Make sure to provide all required information in all fields',
        "Couldn't Process your Request!"
      );
    }
  }
}
