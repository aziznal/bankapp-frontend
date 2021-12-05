import { NgModule } from '@angular/core';

import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { DeleteAccountDialogComponent } from './components/delete-account-dialog/delete-account-dialog.component';
import { EditAccountDialogComponent } from './components/edit-account-dialog/edit-account-dialog.component';
import { ManageAccountsPageComponent } from './components/manage-accounts-page/manage-accounts-page.component';

@NgModule({
  imports: [SharedModule, MaterialModule],
  exports: [],
  declarations: [
    EditAccountDialogComponent,
    DeleteAccountDialogComponent,
    ManageAccountsPageComponent,
  ],
  providers: [],
})
export class AccountsManagementPageModule {}
