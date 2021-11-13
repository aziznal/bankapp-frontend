import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateBankingAccountPageComponent } from './components/create-banking-account-page/create-banking-account-page.component';

@NgModule({
  imports: [SharedModule],
  exports: [],
  declarations: [CreateBankingAccountPageComponent],
  providers: [],
})
export class CreateBankingAccountPageModule {}
