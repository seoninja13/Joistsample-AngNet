import { Component, OnInit } from '@angular/core';
import { ErrorService, ErrorMessage } from '../../../core/services/error.service';

@Component({
  selector: 'app-error-display',
  template: `
    <div *ngFor="let error of errors" 
         class="fixed top-4 right-4 p-4 rounded shadow-lg max-w-md"
         [ngClass]="{
           'bg-red-100 text-red-800': error.type === 'error',
           'bg-yellow-100 text-yellow-800': error.type === 'warning',
           'bg-blue-100 text-blue-800': error.type === 'info'
         }">
      <div class="flex items-center">
        <span class="mr-2">
          <i class="fas" [ngClass]="{
            'fa-exclamation-circle': error.type === 'error',
            'fa-exclamation-triangle': error.type === 'warning',
            'fa-info-circle': error.type === 'info'
          }"></i>
        </span>
        <span>{{ error.message }}</span>
      </div>
    </div>
  `
})
export class ErrorDisplayComponent implements OnInit {
  errors: ErrorMessage[] = [];

  constructor(private errorService: ErrorService) {}

  ngOnInit() {
    this.errorService.errors$.subscribe(error => {
      this.errors.unshift(error);
      setTimeout(() => {
        this.errors = this.errors.filter(e => e !== error);
      }, 5000);
    });
  }
}