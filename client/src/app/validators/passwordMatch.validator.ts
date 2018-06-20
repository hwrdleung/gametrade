import { AbstractControl } from '@angular/forms';

  export function passwordMatchValidator(control: AbstractControl) {
    return control.get('password').value === control.get('password2').value ? null : control.get('password2').setErrors({ 'passwordMismatch': true });
  }
