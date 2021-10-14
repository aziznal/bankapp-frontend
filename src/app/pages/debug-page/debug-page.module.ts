import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { DebugSetupComponent } from './components/debug-setup/debug-setup.component';

import { BarchartComponent } from 'src/app/components/barchart/barchart.component';

@NgModule({
  declarations: [DebugSetupComponent, BarchartComponent],

  imports: [SharedModule],

  exports: [DebugSetupComponent],
})
export class DebugPageModule {}
