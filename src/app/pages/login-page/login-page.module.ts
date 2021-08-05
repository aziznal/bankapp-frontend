import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { LoginFormComponent } from './components/login-form/login-form.component';

@NgModule({
  declarations: [LoginFormComponent],

  imports: [SharedModule],
})
export class LoginPageModule {}
