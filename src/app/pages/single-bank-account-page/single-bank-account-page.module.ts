import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SingleBankAccountPageComponent } from './components/single-bank-account-page/single-bank-account-page.component';

@NgModule({
  imports: [SharedModule],
  exports: [],
  declarations: [SingleBankAccountPageComponent],
  providers: [],
})
export class SingleBankAccountPageModule {}
