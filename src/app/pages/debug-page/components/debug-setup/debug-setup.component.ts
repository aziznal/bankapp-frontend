import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';

import { ToastrService } from 'ngx-toastr';
import { DebugPageService } from '../../services/debug-page.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  templateUrl: './debug-setup.component.html',
  styleUrls: ['./debug-setup.component.scss'],
})
export class DebugSetupComponent {
  mockUser: User;

  constructor(
    private toastrService: ToastrService,
    private debugService: DebugPageService
  ) {
    this.mockUser = new User(
      'Aziz',
      'abodenaal@gmail.com',
      'password',
      new Date('1999-08-01'),
      '+90 534 620 64 60'
    );
  }

  sendGetRequest() {
    this.debugService
      .sendGetRequest()
      .pipe(untilDestroyed(this))
      .subscribe(
        (res) => {
          console.log(res);
          this.toastrService.success(`${ res.status } ${res.body}`);
        },

        (err) => {
          console.error(err);
          this.toastrService.error(`${ err.status } ${err.error.body}`)
        }
      );
  }

  sendPostRequest() {
    this.debugService
      .sendPostRequest()
      .pipe(untilDestroyed(this))
      .subscribe(
        (res) => {
          console.log(res);
          this.toastrService.success(`${ res.status } ${res.body}`);
        },
        (err) => {
          console.error(err);
          this.toastrService.error(`${ err.status } ${err.error.body}`)
        }
      );
  }

  sendNewAccountRequest() {
    this.debugService
      .sendNewAccountRequest(this.mockUser)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res) => {
          console.log(res);
          this.toastrService.success(`${ res.status } ${res.body}`);
        },
        (err) => {
          console.error(err);
          this.toastrService.error(`${ err.status } ${err.error.body}`)
        }
      );
  }
}
