import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { AccountSettingsService } from './services/account-settings.service';

import { AccountSettingsPageComponent } from './components/account-settings-page/account-settings-page.component';

@NgModule({
  imports: [SharedModule],
  exports: [],
  declarations: [AccountSettingsPageComponent],
  providers: [AccountSettingsService],
})
export class AccountSettingsPageModule {}
