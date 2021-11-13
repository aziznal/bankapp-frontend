import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountSettingsPageComponent } from './components/account-settings-page/account-settings-page.component';

@NgModule({
  imports: [SharedModule],
  exports: [],
  declarations: [AccountSettingsPageComponent],
  providers: [],
})
export class AccountSettingsPageModule {}
