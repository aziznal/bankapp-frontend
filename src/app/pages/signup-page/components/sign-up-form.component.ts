import { Component, ViewChild } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
  FormGroup,
} from '@angular/forms';

import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ToastrService } from 'ngx-toastr';
import { SignUpService } from '../services/sign-up.service';

import { User } from 'src/app/models/user.model';
import { CustomErrorStateMatcher } from './custom-error-matcher';

/**
 * Page with form that allows user to create a new account
 *
 * @export
 * @class SignUpFormComponent
 */
@UntilDestroy()
@Component({
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent {
  @ViewChild('signupButton') signupButton!: HTMLButtonElement;

  /** Stores user information from the fields they populate */
  user!: User;

  /** stores all form groups and form controls */
  signUpForm: FormGroup;

  /** Used to match fields with their complementary confirmation fields */
  errorMatcher: CustomErrorStateMatcher;

  /** a toggle for whether the password field(s) show their characters or not */
  hidePasswordField: boolean = true;

  /**
   * Creates an instance of SignUpFormComponent. Inits form.
   *
   * @param {SignUpService} signUpService
   * @param {FormBuilder} formBuilder
   * @memberof SignUpFormComponent
   */
  constructor(
    private toastrService: ToastrService,
    private signUpService: SignUpService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.user = new User('', '', '');
    this.errorMatcher = new CustomErrorStateMatcher();
    this.signUpForm = this.createFormGroup();
  }

  /**
   * Creates and returns form group and controls using FormBuilder
   *
   * @return {*}  {FormGroup}
   * @memberof SignUpFormComponent
   */
  createFormGroup(): FormGroup {
    let formGroup = this.formBuilder.group({
      fullName: ['', [Validators.required]],

      emailGroup: this.formBuilder.group(
        {
          email: ['', [Validators.required, Validators.email]],
          emailConfirm: [''],
        },
        { validators: [this.checkEmailsMatch] }
      ),

      passwordGroup: this.formBuilder.group(
        {
          password: [
            '',
            [
              Validators.required,
              Validators.pattern(
                // multiple-case, includes a number, includes a special char, at least 8 chars.
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
              ),
            ],
          ],

          passwordConfirm: [''],
        },
        { validators: [this.checkPasswordsMatch] }
      ),

      dateOfBirth: ['', [Validators.required]],

      phoneNumber: ['', [Validators.required]],
    });

    return formGroup;
  }

  /**
   *
   * Custom Validator to confirm password field matches password confirmation field
   *
   * @param  {AbstractControl} group
   * @returns ValidationErrors
   */
  checkPasswordsMatch: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let password = group.get('password')!.value;
    let passwordConfirm = group.get('passwordConfirm')!.value;

    return password === passwordConfirm ? null : { notSame: true };
  };

  /**
   *
   * Custom Validator to confrim email field matches email confirmation field
   *
   * @param  {AbstractControl} group
   * @returns ValidationErrors
   */
  checkEmailsMatch: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let email = group.get('email')!.value;
    let emailConfirm = group.get('emailConfirm')!.value;

    return email === emailConfirm ? null : { notSame: true };
  };

  /**
   *
   * Assigns all user properties from form-group
   *
   * @memberof SignUpFormComponent
   */
  assignUserData(): void {
    this.user.name = this.signUpForm.controls.fullName.value;
    this.user.email = this.signUpForm.get(['emailGroup', 'email'])!.value;

    this.user.password = this.signUpForm.get([
      'passwordGroup',
      'password',
    ])!.value;

    this.user.birthdate = this.signUpForm.controls.dateOfBirth.value;
    this.user.phoneNumber = this.signUpForm.controls.phoneNumber.value;
  }

  /**
   *
   * Sends request to create a new user
   *
   */
  createNewUser(): void {
    this.user.name = this.signUpForm.controls.fullName.value;
    this.user.email = this.signUpForm.get(['emailGroup', 'email'])!.value;

    if (this.signUpForm.valid) {
      this.signupButton.disabled = true;

      this.assignUserData();

      this.signUpService
        .createNewUser(this.user)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (_response) => {
            this.toastrService.success(
              'Successfully created new account. Redirecting to Login Page',
              'Success'
            );

            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000);
          },

          error: (error) => {
            this.toastrService.error(
              error.error.body,
              `${error.status} ${error.statusText}`
            );

            setTimeout(() => (this.signupButton.disabled = false), 1000);
          },
        });
    }
  }
}
