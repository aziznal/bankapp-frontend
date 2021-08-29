import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { LoginPageGuard } from '../guards/login-page.guard';

import { LayoutComponent } from './main-page/components/layout/layout.component';
import { LoginFormComponent } from './login-page/components/login-form/login-form.component';
import { SignUpFormComponent } from './signup-page/components/sign-up-form.component';
import { DebugSetupComponent } from './debug-page/components/debug-setup/debug-setup.component';
import { MainPageContentComponent } from './main-page/components/main-page-content/main-page-content.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: MainPageContentComponent,
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
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
