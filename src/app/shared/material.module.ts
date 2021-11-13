import { NgModule } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatSelectModule } from '@angular/material/select';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';

import { MatDividerModule } from '@angular/material/divider';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * This module is where all angular material components/modules etc. are
 * imported
 *
 * @export
 * @class MaterialModule
 */
@NgModule({
  imports: [
    MatSidenavModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],

  exports: [
    MatSidenavModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
})
export class MaterialModule {}
