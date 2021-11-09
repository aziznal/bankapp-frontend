import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-settings-page',
  templateUrl: './account-settings-page.component.html',
  styleUrls: ['./account-settings-page.component.scss'],
})
export class AccountSettingsPageComponent {
  user: User;
  formGroup: FormGroup;
  passwordFormGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {
    this.user = this.authService.getUser();

    this.formGroup = this.createFormGroup();
    this.passwordFormGroup = this.createPasswordFormGroup();
  }

  createFormGroup(): FormGroup {
    // TODO: add validator to make sure email is not already taken

    return this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      birthdate: [this.user.birthdate],
      phoneNumber: [this.user.phoneNumber],
    });
  }

  createPasswordFormGroup(): FormGroup {
    // TODO: add validator to make sure first password is correct
    // TODO: add validator to make sure new password and its confirmation match eachother.

    return this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordConfirmation: ['', Validators.required],
    });
  }

  updateInformation(event: Event): void {
    if (!this.formGroup.valid) {
      this.toastrService.error(
        'Make sure you have entered valid values in all fields',
        'Failed to update'
      );
      return;
    }

    event.preventDefault();

    this.toastrService.info('Updating your information...', 'Updating');
  }

  changePassword(event: Event) {
    if (!this.passwordFormGroup.valid) {
      this.toastrService.error(
        'Make sure you have entered your current password correctly and that your new passwords match.',
        'Password change failed!'
      );

      return;
    }

    event.preventDefault();

    this.toastrService.info('Changing your password...', 'Changing password');
  }
}
