import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { LoginPageGuard } from '../guards/login-page.guard';

import { LayoutComponent } from '../components/layout/layout.component';
import { LoginFormComponent } from './login-page/components/login-form/login-form.component';
import { SignUpFormComponent } from './signup-page/components/sign-up-form.component';
import { DebugSetupComponent } from './debug-page/components/debug-setup/debug-setup.component';
import { MainPageContentComponent } from './main-page/components/main-page-content/main-page-content.component';
import { AccountSettingsPageComponent } from './account-settings-page/components/account-settings-page/account-settings-page.component';
import { SendMoneyPageComponent } from './send-money-page/components/send-money-page/send-money-page.component';
import { SingleBankAccountPageComponent } from './single-bank-account-page/components/single-bank-account-page/single-bank-account-page.component';
import { SingleTransactionPageComponent } from './single-transaction-page/components/single-transaction-page/single-transaction-page.component';
import { UserResolver } from '../resolvers/user.resolver';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    resolve: {
      user: UserResolver,
    },
    component: LayoutComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        resolve: {
          user: UserResolver,
        },
        component: MainPageContentComponent,
      },
      {
        path: 'send-money',
        canActivate: [AuthGuard],
        resolve: {
          user: UserResolver,
        },
        component: SendMoneyPageComponent,
      },
      {
        path: 'account-settings',
        canActivate: [AuthGuard],
        resolve: {
          user: UserResolver,
        },
        component: AccountSettingsPageComponent,
      },
      {
        path: 'account/:accountNo',
        canActivate: [AuthGuard],
        resolve: {
          user: UserResolver,
        },
        component: SingleBankAccountPageComponent,
      },
      {
        path: 'transaction/:accountNo/:transactionNo',
        canActivate: [AuthGuard],
        resolve: {
          user: UserResolver,
        },
        component: SingleTransactionPageComponent,
      },
    ],
  },

  {
    path: 'login',
    component: LoginFormComponent,
    canActivate: [LoginPageGuard],
  },

  {
    path: 'sign-up',
    component: SignUpFormComponent,
  },

  {
    path: 'debug',
    component: DebugSetupComponent,
  },

  {
    path: '**',
    redirectTo: '/login',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
