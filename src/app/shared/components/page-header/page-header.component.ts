import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-header',
  template: `
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">{{ title }}</h1>
      <button 
        *ngIf="showButton"
        (click)="buttonClick.emit()"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {{ buttonText }}
      </button>
    </div>
  `
})
export class PageHeaderComponent {
  @Input() title: string = '';
  @Input() showButton: boolean = true;
  @Input() buttonText: string = 'Create';
  
  @Output() buttonClick = new EventEmitter<void>();
}