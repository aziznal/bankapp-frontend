import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/**
 *
 * This class is used to match a field with its complementary confirmation field.
 *
 * @class
 */
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidControl = !!(
      control?.invalid &&
      control?.parent?.dirty &&
      control?.parent?.touched
    );
    const invalidParent = !!(
      control?.parent?.invalid &&
      control?.parent?.dirty &&
      control?.parent?.touched
    );

    return invalidControl || invalidParent;
  }
}
