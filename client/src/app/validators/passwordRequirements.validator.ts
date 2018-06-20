import { AbstractControl } from '@angular/forms';

export function passwordRequirementsValidator (control: AbstractControl) {
    // Passwords must include:
    //at least 1 letter
    //at least 1 number
    //at least 1 special character: !@#$%^&*
    let specialChars = ['!', '@', '#', '$', '%', '^', '&', '*'];
    let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    if(control.get('password').value){
    let password = control.get('password').value;

    let hasSpecialChar = false;
    for (let i = 0; i < specialChars.length; i++) {
      if (password.includes(specialChars[i])) {
        hasSpecialChar = true;
      }
    }

    let hasNumber = false;
    for (let i = 0; i < numbers.length; i++) {
      if (password.includes(numbers[i])) {
        hasNumber = true;
      }
    }

    if (!hasSpecialChar) {
      control.get('password').setErrors({ 'noSpecialChar': true });
    } else if(!hasNumber) {
      control.get('password').setErrors({ 'noNumber': true });
    } else if (password === password.toUpperCase()) {
      control.get('password').setErrors({ 'allUpperCase': true });
    } else if (password === password.toLowerCase()) {
      control.get('password').setErrors({ 'allLowercase': true });
    } else {
      return null;
    }
  }
  }
