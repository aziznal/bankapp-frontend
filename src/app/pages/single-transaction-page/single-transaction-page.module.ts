import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SingleTransactionPageComponent } from './components/single-transaction-page/single-transaction-page.component';

@NgModule({
  imports: [SharedModule],
  exports: [],
  declarations: [SingleTransactionPageComponent],
  providers: [],
})
export class SingleTransactionPageModule {}
