import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FinancialOperationsPageComponent } from './components/send-money-section/financial-operations-page.component';
import { FinancialOperationsService } from './services/financial-operations.service';

@NgModule({
  imports: [SharedModule],
  exports: [],
  declarations: [FinancialOperationsPageComponent],
  providers: [FinancialOperationsService],
})
export class FinancialOperationsPageModule {}
