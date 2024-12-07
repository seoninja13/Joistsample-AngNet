import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center">
        <div class="flex-1">
          <h3 class="text-lg font-medium text-gray-900">{{ title }}</h3>
          <p class="mt-1 text-3xl font-semibold text-gray-900">
            <ng-container [ngSwitch]="type">
              <span *ngSwitchCase="'currency'">{{ value | currency }}</span>
              <span *ngSwitchDefault>{{ value }}</span>
            </ng-container>
          </p>
          <p *ngIf="change" class="mt-2 text-sm" [class.text-green-600]="change > 0" [class.text-red-600]="change < 0">
            <span>{{ change > 0 ? '↑' : '↓' }} {{ change }}% from last month</span>
          </p>
        </div>
        <div class="ml-4">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `
})
export class StatsCardComponent {
  @Input() title: string = '';
  @Input() value: number | string = 0;
  @Input() type: 'number' | 'currency' = 'number';
  @Input() change?: number;
}