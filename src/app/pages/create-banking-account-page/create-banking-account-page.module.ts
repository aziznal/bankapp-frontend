import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateBankingAccountPageComponent } from './components/create-banking-account-page/create-banking-account-page.component';
import { CreateBankingAccountService } from './services/create-banking-account.service';

@NgModule({
  imports: [SharedModule],
  exports: [],
  declarations: [CreateBankingAccountPageComponent],
  providers: [CreateBankingAccountService],
})
export class CreateBankingAccountPageModule {}
