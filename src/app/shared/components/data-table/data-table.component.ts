import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Column {
  key: string;
  label: string;
  type?: 'text' | 'currency' | 'date' | 'status';
}

@Component({
  selector: 'app-data-table',
  template: `
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th *ngFor="let col of columns" 
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ col.label }}
            </th>
            <th *ngIf="showActions" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr *ngFor="let item of data">
            <td *ngFor="let col of columns" class="px-6 py-4 whitespace-nowrap">
              <ng-container [ngSwitch]="col.type">
                <span *ngSwitchCase="'currency'">{{ item[col.key] | currency }}</span>
                <app-status-badge *ngSwitchCase="'status'" [status]="item[col.key]"></app-status-badge>
                <span *ngSwitchCase="'date'">{{ item[col.key] | date }}</span>
                <span *ngSwitchDefault>{{ item[col.key] }}</span>
              </ng-container>
            </td>
            <td *ngIf="showActions" class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button 
                (click)="onEdit.emit(item)"
                class="text-indigo-600 hover:text-indigo-900 mr-4">
                Edit
              </button>
              <button 
                (click)="onDelete.emit(item)"
                class="text-red-600 hover:text-red-900">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class DataTableComponent {
  @Input() columns: Column[] = [];
  @Input() data: any[] = [];
  @Input() showActions = true;
  
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
}