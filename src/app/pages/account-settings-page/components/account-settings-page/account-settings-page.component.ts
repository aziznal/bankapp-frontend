import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { AccountSettingsService } from '../../services/account-settings.service';
import { UsersService } from 'src/app/services/users.service';

import { MatDialog } from '@angular/material/dialog';

import { User } from 'src/app/interfaces/user.interface';

/**
 * Page for showing account settings, including personal settings and banking
 * account settings
 *
 * @export
 * @class AccountSettingsPageComponent
 */
@UntilDestroy()
@Component({
  selector: 'app-account-settings-page',
  templateUrl: './account-settings-page.component.html',
  styleUrls: ['./account-settings-page.component.scss'],
})
export class AccountSettingsPageComponent {
  /**
   * The current user
   *
   * @type {User}
   * @memberof AccountSettingsPageComponent
   */
  user!: User;

  /**
   * form group for user's personal details
   *
   * @type {FormGroup}
   * @memberof AccountSettingsPageComponent
   */
  personalDetailsForm!: FormGroup;

  /**
   * form group allowing user to change their password
   *
   * @type {FormGroup}
   * @memberof AccountSettingsPageComponent
   */
  passwordChangeForm!: FormGroup;

  /**
   * Creates an instance of AccountSettingsPageComponent. Inits forms.
   *
   * @param {AuthService} authService
   * @param {FormBuilder} formBuilder
   * @param {ToastrService} toastrService
   * @memberof AccountSettingsPageComponent
   */
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private accountSettingsService: AccountSettingsService,
    private authService: AuthService,
    private usersService: UsersService,
    private dialog: MatDialog
  ) {
    this.user = this.route.snapshot.data.user;
    this.personalDetailsForm = this.createPersonalDetailsForm();
    this.passwordChangeForm = this.createPasswordChangeForm();

    this.passwordChangeForm.disable();
  }

  /**
   * Creates and returns a from group for the user's personal details
   *
   * @return {*}  {FormGroup}
   * @memberof AccountSettingsPageComponent
   */
  createPersonalDetailsForm(): FormGroup {
    // TODO: add validator to make sure email is not already taken

    return this.formBuilder.group({
      fullname: [this.user.fullname, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      birthdate: [this.user.birthdate],
      phoneNumber: [this.user.phoneNumber],
    });
  }

  /**
   * Creates and returns a form group allowing the user to change their password
   *
   * @return {*}  {FormGroup}
   * @memberof AccountSettingsPageComponent
   */
  createPasswordChangeForm(): FormGroup {
    // TODO: add validator to make sure first password is correct
    /* TODO: add validator to make sure new password and its confirmation match eachother. (this may be better to implement as a button or something) */

    return this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordConfirmation: ['', Validators.required],
    });
  }

  /**
   * Updates the user's personal details if the input information is valid
   *
   * @param {Event} event
   * @return {*}  {void}
   * @memberof AccountSettingsPageComponent
   */
  updatePersonalDetails(event: Event): void {
    event.preventDefault();

    if (!this.personalDetailsForm.valid) {
      this.toastrService.error(
        'Make sure you have entered valid values in all fields',
        'Failed to update'
      );
      return;
    }

    let userHasConfirmed = confirm(
      'Proceeding will cause your session to expire and you will need to login again. Do you still want to proceed?'
    );

    // Make sure only changed values are sent to be updated
    const changedValues = {
      fullname:
        this.personalDetailsForm.controls.fullname.value === this.user.fullname
          ? undefined
          : this.personalDetailsForm.controls.fullname.value,

      email:
        this.personalDetailsForm.controls.email.value === this.user.email
          ? undefined
          : this.personalDetailsForm.controls.email.value,

      birthdate:
        this.personalDetailsForm.controls.birthdate.value ===
        this.user.birthdate
          ? undefined
          : this.personalDetailsForm.controls.birthdate.value,

      phoneNumber:
        this.personalDetailsForm.controls.phoneNumber.value ===
        this.user.phoneNumber
          ? undefined
          : this.personalDetailsForm.controls.phoneNumber.value,
    };

    if (userHasConfirmed) {
      this.accountSettingsService
        .updateAccountInformation(changedValues)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: () => {
            this.toastrService.success(
              'Settings changed successfully. Please log in again using your new information',
              'Settings Changed Successfully'
            );

            this.authService.logout();
          },

          error: (error: HttpErrorResponse) => {
            this.toastrService.error(
              `Something went wrong. ${error.message}`,
              error.name
            );
          },
        });
    }
  }

  /**
   * Changes the user's password if the form is valid
   *
   * @param {Event} event
   * @return {*}
   * @memberof AccountSettingsPageComponent
   */
  changePassword(event: Event): void {
    event.preventDefault();

    if (!this.passwordChangeForm.valid) {
      this.toastrService.error(
        'Make sure you have entered your current password correctly and that your new passwords match.',
        'Password change failed!'
      );

      return;
    }

    this.toastrService.info('Changing your password...', 'Changing password');
  }
}
