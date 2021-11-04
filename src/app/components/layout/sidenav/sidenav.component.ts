import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/pages/login-page/services/login.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  user!: User;

  constructor(private loginService: LoginService) {
    this.user = this.loginService.getUser();
  }
}
