import { AbstractControl } from '@angular/forms';

  export function emailMatchValidator(control: AbstractControl) {
    return control.get('email').value === control.get('email2').value ? null : control.get('email2').setErrors({ 'emailMismatch': true });
  }
