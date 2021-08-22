import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild('loginButton') loginButton!: HTMLButtonElement;

  formGroup: FormGroup;

  /**
   *
   * Sets default values and initializes Login Service
   *
   * @param  {LoginService} privateloginService
   */
  constructor(
    private loginService: LoginService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login(event: Event) {
    event.preventDefault();

    this.formGroup.markAllAsTouched();

    let email = this.formGroup.controls.email.value;
    let password = this.formGroup.controls.password.value;

    if (this.formGroup.valid) {
      this.loginButton.disabled = true;

      this.loginService.login(email, password).subscribe({
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
          this.toastrService.error(
            error.error.body,
            `${error.status} ${error.statusText}`
          );
          setTimeout(() => (this.loginButton.disabled = false), 1000);
        },

        complete: () => {
          console.log('Completed!');
          setTimeout(() => (this.loginButton.disabled = false), 1000);
        },
      });
    }
  }
}
