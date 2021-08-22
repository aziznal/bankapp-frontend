import { NgModule } from '@angular/core';

import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  imports: [MaterialModule, SharedModule],
  declarations: [LayoutComponent],
  exports: [],
})
export class MainPageModule {}
