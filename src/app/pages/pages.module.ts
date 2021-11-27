import { NgModule } from '@angular/core';

import { LoginPageModule } from './login-page/login-page.module';
import { PagesRoutingModule } from './pages.routing';
import { SignUpPageModule } from './signup-page/sign-up-page.module';
import { DebugPageModule } from './debug-page/debug-page.module';
import { MainPageModule } from './main-page/main-page.module';
import { SharedModule } from '../shared/shared.module';

import { AccountSettingsPageModule } from './account-settings-page/account-settings-page.module';
import { SingleBankAccountPageModule } from './single-bank-account-page/single-bank-account-page.module';
import { SingleTransactionPageModule } from './single-transaction-page/single-transaction-page.module';
import { FinancialOperationsPageModule } from './financial-operations-page/financial-operations-page.module';
import { AccountsManagementPageModule } from './accounts-management-page/accounts-management.module';

@NgModule({
  declarations: [],

  imports: [
    LoginPageModule,
    PagesRoutingModule,
    SignUpPageModule,
    DebugPageModule,
    MainPageModule,
    SharedModule,

    AccountSettingsPageModule,
    FinancialOperationsPageModule,
    SingleBankAccountPageModule,
    SingleTransactionPageModule,
    AccountsManagementPageModule,
  ],

  providers: [],
  bootstrap: [],
})
export class PagesModule {}
