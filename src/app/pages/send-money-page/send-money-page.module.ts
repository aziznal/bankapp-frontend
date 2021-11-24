import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SendMoneyPageComponent } from './components/send-money-page/send-money-page.component';
import { SendMoneyService } from './services/send-money.service';

@NgModule({
  imports: [SharedModule],
  exports: [],
  declarations: [SendMoneyPageComponent],
  providers: [SendMoneyService],
})
export class SendMoneyPageModule {}
