import { Component } from '@angular/core';

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

@Component({
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent {
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
   *
   * Initializes Services
   *
   * @param  {SignUpService} privatesignUpService
   * @param  {FormBuilder} privateformBuilder
   */
  constructor(
    private signUpService: SignUpService,
    private formBuilder: FormBuilder
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
   * Assigns values to user object and creates a new user using SignUpService
   *
   */
  createNewUser(): void {
    this.user.name = this.formGroup.controls.fullName.value;
    this.user.email = this.formGroup.get(['emailGroup', 'email'])!.value;

    if (this.formGroup.valid) {
      this.user.name = this.formGroup.controls.fullName.value;
      this.user.email = this.formGroup.get(['emailGroup', 'email'])!.value;
      this.user.password = this.formGroup.get([
        'passwordGroup',
        'password',
      ])!.value;
      this.user.birthdate = this.formGroup.controls.dateOfBirth.value;
      this.user.phoneNumber = this.formGroup.controls.phoneNumber.value;

      this.signUpService.createNewUser(this.user);
    }
  }
}
