import { NgModule } from '@angular/core';

import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainPageContentComponent } from './components/main-page-content/main-page-content.component';

@NgModule({
  imports: [MaterialModule, SharedModule],
  declarations: [MainPageContentComponent],
  exports: [],
})
export class MainPageModule {}
