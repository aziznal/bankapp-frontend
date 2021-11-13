import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BarchartComponent } from '../components/barchart/barchart.component';

/**
 * Shared module where modules used across different components are imported to
 * be used throughout the project
 *
 * @export
 * @class SharedModule
 */
@NgModule({
  declarations: [BarchartComponent],

  imports: [
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
  ],

  exports: [
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,

    BarchartComponent,
  ],

  providers: [],

  bootstrap: [],
})
export class SharedModule {}
