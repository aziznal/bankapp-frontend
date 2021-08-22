import { Component, ViewChild } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
  FormGroup,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ToastrService } from 'ngx-toastr';

import { User } from 'src/app/models/user.model';
import { SignUpService } from '../services/sign-up.service';

/**
 *
 * This class is used to match a field with its complementary confirmation field.
 *
 * @class
 */
class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidControl = !!(
      control?.invalid &&
      control?.parent?.dirty &&
      control?.parent?.touched
    );
    const invalidParent = !!(
      control?.parent?.invalid &&
      control?.parent?.dirty &&
      control?.parent?.touched
    );

    return invalidControl || invalidParent;
  }
}

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

  /**
   *
   * Used to store user properties
   *
   * @type {User}
   */
  user!: User;

  /**
   *
   * stores all form groups and form controls
   *
   * @type {FormGroup}
   */
  formGroup: FormGroup;

  /**
   *
   * Used to match fields with their complementary confirmation fields
   *
   * @type {CustomErrorStateMatcher}
   */
  errorMatcher: CustomErrorStateMatcher;

  /**
   *
   * a toggle for whether the password field(s) show their characters or not
   *
   * @type boolean
   */
  hidePasswordField: boolean = true;

  /**
   * Creates an instance of SignUpFormComponent.
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

    this.formGroup = this.createFormGroup();
  }

  /**
   *
   * Creates and returns form group and controls using FormBuilder
   *
   * @returns FormGroup
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
    this.user.name = this.formGroup.controls.fullName.value;
    this.user.email = this.formGroup.get(['emailGroup', 'email'])!.value;

    this.user.password = this.formGroup.get([
      'passwordGroup',
      'password',
    ])!.value;

    this.user.birthdate = this.formGroup.controls.dateOfBirth.value;
    this.user.phoneNumber = this.formGroup.controls.phoneNumber.value;
  }

  /**
   *
   * Sends request to create a new user
   *
   */
  createNewUser(): void {
    this.user.name = this.formGroup.controls.fullName.value;
    this.user.email = this.formGroup.get(['emailGroup', 'email'])!.value;

    if (this.formGroup.valid) {
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
