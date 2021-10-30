import { NgModule } from '@angular/core';

import { LoginPageModule } from './login-page/login-page.module';
import { PagesRoutingModule } from './pages.routing';
import { SignUpPageModule } from './signup-page/sign-up-page.module';
import { DebugPageModule } from './debug-page/debug-page.module';
import { MainPageModule } from './main-page/main-page.module';
import { SharedModule } from '../shared/shared.module';
import { SendMoneyPageComponent } from './send-money-page/send-money-page.component';
import { AccountSettingsPageComponent } from './account-settings-page/account-settings-page.component';
import { SingleBankAccountPageComponent } from './single-bank-account-page/single-bank-account-page.component';
import { SingleTransactionPageComponent } from './single-transaction-page/single-transaction-page.component';

@NgModule({
  declarations: [
    SendMoneyPageComponent,
    AccountSettingsPageComponent,
    SingleBankAccountPageComponent,
    SingleTransactionPageComponent
  ],

  imports: [
    LoginPageModule,
    PagesRoutingModule,
    SignUpPageModule,
    DebugPageModule,
    MainPageModule,
    SharedModule,
  ],

  providers: [],
  bootstrap: [],
})
export class PagesModule {}
