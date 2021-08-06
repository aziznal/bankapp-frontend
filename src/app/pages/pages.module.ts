import { NgModule } from '@angular/core';

import { LoginPageModule } from './login-page/login-page.module';
import { PagesRoutingModule } from './pages.routing';
import { SignUpPageModule } from './signup-page/sign-up-page.module';

@NgModule({
  declarations: [],

  imports: [LoginPageModule, PagesRoutingModule, SignUpPageModule],

  providers: [],
  bootstrap: [],
})
export class PagesModule {}
