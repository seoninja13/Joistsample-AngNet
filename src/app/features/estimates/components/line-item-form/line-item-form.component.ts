import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-line-item-form',
  template: `
    <div [formGroup]="itemForm" class="grid grid-cols-12 gap-4 items-start border p-4 rounded-lg">
      <div class="col-span-4">
        <label class="block text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
          formControlName="description"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      
      <div class="col-span-2">
        <label class="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          formControlName="category"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div class="col-span-2">
        <label class="block text-sm font-medium text-gray-700">Quantity</label>
        <input
          type="number"
          formControlName="quantity"
          (input)="onCalculateTotal()"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div class="col-span-2">
        <label class="block text-sm font-medium text-gray-700">Unit Price</label>
        <input
          type="number"
          formControlName="unitPrice"
          (input)="onCalculateTotal()"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div class="col-span-1">
        <label class="block text-sm font-medium text-gray-700">Total</label>
        <input
          type="number"
          formControlName="total"
          readonly
          class="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm"
        />
      </div>

      <div class="col-span-1 pt-6">
        <button
          type="button"
          (click)="onRemove.emit()"
          class="text-red-600 hover:text-red-800"
        >
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `
})
export class LineItemFormComponent {
  @Input() itemForm!: FormGroup;
  @Output() calculateTotal = new EventEmitter<void>();
  @Output() onRemove = new EventEmitter<void>();

  onCalculateTotal() {
    this.calculateTotal.emit();
  }
}