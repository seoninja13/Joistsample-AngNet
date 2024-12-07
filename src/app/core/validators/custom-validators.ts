import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static phoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^\+?1?\d{9,15}$/.test(control.value);
      return valid ? null : { phoneNumber: true };
    };
  }

  static password(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasNumber = /\d/.test(control.value);
      const hasUpper = /[A-Z]/.test(control.value);
      const hasLower = /[a-z]/.test(control.value);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
      
      const valid = hasNumber && hasUpper && hasLower && hasSpecial;
      
      return valid ? null : {
        password: {
          hasNumber,
          hasUpper,
          hasLower,
          hasSpecial
        }
      };
    };
  }

  static matchPassword(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get(passwordKey);
      const confirmPassword = control.get(confirmPasswordKey);

      if (!password || !confirmPassword) return null;

      return password.value === confirmPassword.value ? null : { passwordMismatch: true };
    };
  }
}