import { NgModule } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [MatFormFieldModule, MatButtonModule, MatInputModule],

  exports: [MatFormFieldModule, MatButtonModule, MatInputModule],
})
export class MaterialModule {}
