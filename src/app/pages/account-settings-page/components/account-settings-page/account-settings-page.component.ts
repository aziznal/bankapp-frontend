import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

import { User } from 'src/app/models/user.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
  ) {
    this.user = this.route.snapshot.data.user;
    this.personalDetailsForm = this.createPersonalDetailsForm();
    this.passwordChangeForm = this.createPasswordChangeForm();
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
      name: [this.user.fullname, Validators.required],
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

    this.toastrService.info('Updating your information...', 'Updating');
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
