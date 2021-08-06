import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { LayoutComponent } from './main-page/components/layout/layout.component';
import { LoginFormComponent } from './login-page/components/login-form/login-form.component';
import { SignUpFormComponent } from './signup-page/components/sign-up-form.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
  },

  {
    path: 'login',
    component: LoginFormComponent,
  },

  {
    path: 'sign-up',
    component: SignUpFormComponent
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
