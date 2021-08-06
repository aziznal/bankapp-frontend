import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { SignUpFormComponent } from './components/sign-up-form.component';

@NgModule({
  declarations: [SignUpFormComponent],

  imports: [SharedModule],
})
export class SignUpPageModule {}
