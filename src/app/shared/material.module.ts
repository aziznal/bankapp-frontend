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
  ],
})
export class MaterialModule {}
