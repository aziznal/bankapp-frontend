import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { DebugPageService } from '../../services/debug-page.service';

@Component({
  templateUrl: './debug-setup.component.html',
  styleUrls: ['./debug-setup.component.scss'],
})
export class DebugSetupComponent {

  mockUser: User;

  constructor(private debugService: DebugPageService) {
    
    this.mockUser = new User(
      "Aziz",
      "abodenaal@gmail.com",
      "password",
      new Date("1999-08-01"),
      "+90 534 620 64 60"
    )

  }

  sendGetRequest() {
    this.debugService.sendGetRequest();
  }

  sendPostRequest() {
    this.debugService.sendPostRequest();
  }

  sendNewAccountRequest() {
    this.debugService.sendNewAccountRequest(this.mockUser);
  }

}
