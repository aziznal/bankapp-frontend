import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SendMoneyPageComponent } from './components/send-money-page/send-money-page.component';

@NgModule({
  imports: [SharedModule],
  exports: [],
  declarations: [SendMoneyPageComponent],
  providers: [],
})
export class SendMoneyPageModule {}
