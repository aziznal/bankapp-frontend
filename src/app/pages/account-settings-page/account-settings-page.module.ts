import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { AccountSettingsService } from './services/account-settings.service';
import { AccountSettingsPageComponent } from './components/account-settings-page/account-settings-page.component';
import { DeleteAccountDialogComponent } from './components/delete-account-dialog/delete-account-dialog.component';
import { EditAccountDialogComponent } from './components/edit-account-dialog/edit-account-dialog.component';

@NgModule({
  imports: [SharedModule],
  exports: [],
  declarations: [
    AccountSettingsPageComponent,
    DeleteAccountDialogComponent,
    EditAccountDialogComponent,
  ],
  providers: [AccountSettingsService],
})
export class AccountSettingsPageModule {}
