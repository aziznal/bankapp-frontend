import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

/**
 * Login form allowing user to type their email and password to attempt login
 *
 * @export
 * @class LoginFormComponent
 */
@UntilDestroy()
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild('loginButton') loginButton!: HTMLButtonElement;

  /** Form containing fields for email and password */
  loginForm: FormGroup;

  /** toggle for showing or hiding password field */
  hidePasswordField: boolean = true;

  /**
   * Creates an instance of LoginFormComponent. Inits form.
   *
   * @param {AuthService} authService
   * @param {ToastrService} toastrService
   * @param {Router} router
   * @param {FormBuilder} formBuilder
   * @memberof LoginFormComponent
   */
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.createLoginForm();
  }

  /**
   * Creates and returns form for login fields
   *
   * @return {*}  {FormGroup}
   * @memberof LoginFormComponent
   */
  createLoginForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  /**
   * Attempts to log user in if form is valid
   *
   * @param {Event} event
   * @memberof LoginFormComponent
   */
  login(event: Event) {
    event.preventDefault();

    this.loginForm.markAllAsTouched();

    let email = this.loginForm.controls.email.value;
    let password = this.loginForm.controls.password.value;

    if (this.loginForm.valid) {
      this.loginButton.disabled = true;

      this.authService
        .login(email, password)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (_response) => {
            this.toastrService.success(
              'Successfully logged in as ' + email,
              'Login Successful'
            );

            setTimeout(() => {
              this.router.navigate(['/']);
            }, 1000);
          },

          error: (error) => {
            setTimeout(() => (this.loginButton.disabled = false), 1000);

            // Because the server sends back a 401 instead of a 404. (maybe the server shouldn't do that?)
            if (error.status === 401) {
              this.toastrService.error(
                'Check your email and password then try again.',
                '404 Not Found'
              );
            } else {
              this.toastrService.error(
                error.error.body,
                `${error.status} ${error.statusText}`
              );
            }
          },
        });
    }
  }
}
