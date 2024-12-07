import { Component, Input } from '@angular/core';

export interface Activity {
  id: string;
  type: 'project' | 'estimate' | 'invoice' | 'payment';
  title: string;
  description: string;
  date: Date;
  status?: string;
}

@Component({
  selector: 'app-recent-activity',
  template: `
    <div class="bg-white rounded-lg shadow">
      <div class="p-6">
        <h3 class="text-lg font-medium text-gray-900">Recent Activity</h3>
        <div class="mt-6 flow-root">
          <ul role="list" class="-mb-8">
            <li *ngFor="let activity of activities; let last = last">
              <div class="relative pb-8">
                <span *ngIf="!last" class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                <div class="relative flex space-x-3">
                  <div>
                    <span class="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                          [ngClass]="{
                            'bg-blue-500': activity.type === 'project',
                            'bg-green-500': activity.type === 'estimate',
                            'bg-purple-500': activity.type === 'invoice',
                            'bg-yellow-500': activity.type === 'payment'
                          }">
                      <i class="text-white text-sm fas"
                         [ngClass]="{
                           'fa-project-diagram': activity.type === 'project',
                           'fa-file-invoice': activity.type === 'estimate',
                           'fa-file-invoice-dollar': activity.type === 'invoice',
                           'fa-money-bill-wave': activity.type === 'payment'
                         }"></i>
                    </span>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="text-sm font-medium text-gray-900">{{ activity.title }}</div>
                    <p class="mt-0.5 text-sm text-gray-500">{{ activity.description }}</p>
                    <p class="mt-0.5 text-xs text-gray-400">{{ activity.date | date:'short' }}</p>
                  </div>
                  <div *ngIf="activity.status" class="flex-shrink-0">
                    <app-status-badge [status]="activity.status"></app-status-badge>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `
})
export class RecentActivityComponent {
  @Input() activities: Activity[] = [];
}