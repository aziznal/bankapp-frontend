import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],

  imports: [MaterialModule, FlexLayoutModule, FormsModule, RouterModule],

  exports: [MaterialModule, FlexLayoutModule, FormsModule, RouterModule],

  providers: [],

  bootstrap: [],
})
export class SharedModule {}
