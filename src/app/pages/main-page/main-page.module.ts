import { NgModule } from '@angular/core';

import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainPageContentComponent } from './components/main-page-content/main-page-content.component';
import { NewBankingAccountDialogComponent } from './components/new-banking-account-dialog/new-banking-account-dialog.component';
import { MainPageService } from './components/services/main-page.service';

@NgModule({
  imports: [MaterialModule, SharedModule],
  declarations: [MainPageContentComponent, NewBankingAccountDialogComponent],
  exports: [],
  providers: [MainPageService],
})
export class MainPageModule {}
