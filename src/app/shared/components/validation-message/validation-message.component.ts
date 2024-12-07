import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-message',
  template: `
    <div *ngIf="control?.invalid && (control?.dirty || control?.touched)" class="text-red-500 text-sm mt-1">
      <div *ngIf="control?.errors?.['required']">This field is required</div>
      <div *ngIf="control?.errors?.['email']">Please enter a valid email</div>
      <div *ngIf="control?.errors?.['minlength']">
        Must be at least {{control?.errors?.['minlength']?.requiredLength}} characters
      </div>
      <div *ngIf="control?.errors?.['pattern']">Invalid format</div>
    </div>
  `
})
export class ValidationMessageComponent {
  @Input() control: AbstractControl | null = null;
}