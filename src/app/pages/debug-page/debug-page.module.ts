import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { DebugSetupComponent } from './components/debug-setup/debug-setup.component';

@NgModule({
  declarations: [DebugSetupComponent],

  imports: [SharedModule],

  exports: [DebugSetupComponent],
})
export class DebugPageModule {}
