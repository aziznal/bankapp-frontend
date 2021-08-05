import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  email: string;
  password: string;

  /**
   * 
   * Sets default values and initializes Login Service 
   * 
   * @param  {LoginService} privateloginService
   */
  constructor(private loginService: LoginService) {
    this.email = '';
    this.password = '';
  }

  attemptUserLogin(event: Event) {
    event.preventDefault();
    
    this.loginService.logUserIn(this.email, this.password);
    
  }
}
