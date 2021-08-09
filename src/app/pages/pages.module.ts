import { NgModule } from '@angular/core';

import { LoginPageModule } from './login-page/login-page.module';
import { PagesRoutingModule } from './pages.routing';
import { SignUpPageModule } from './signup-page/sign-up-page.module';
import { DebugPageModule } from './debug-page/debug-page.module';

@NgModule({
  declarations: [],

  imports: [
    LoginPageModule,
    PagesRoutingModule,
    SignUpPageModule,
    DebugPageModule,
  ],

  providers: [],
  bootstrap: [],
})
export class PagesModule {}
