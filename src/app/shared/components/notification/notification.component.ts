import { Component, OnInit } from '@angular/core';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

@Component({
  selector: 'app-notification',
  template: `
    <div class="fixed right-4 top-4 z-50">
      <div class="max-w-sm">
        <div *ngFor="let notification of notifications"
             class="mb-4 p-4 rounded-lg shadow-lg"
             [ngClass]="{
               'bg-blue-100': notification.type === 'info',
               'bg-green-100': notification.type === 'success',
               'bg-yellow-100': notification.type === 'warning',
               'bg-red-100': notification.type === 'error'
             }">
          <div class="flex justify-between items-start">
            <div>
              <h4 class="font-medium">{{ notification.title }}</h4>
              <p class="text-sm">{{ notification.message }}</p>
              <span class="text-xs text-gray-500">
                {{ notification.timestamp | date:'short' }}
              </span>
            </div>
            <button (click)="dismissNotification(notification.id)"
                    class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];

  ngOnInit() {
    // Demo notification
    this.notifications = [{
      id: '1',
      title: 'Welcome',
      message: 'Welcome to ContractorPro',
      type: 'info',
      timestamp: new Date(),
      read: false
    }];
  }

  dismissNotification(id: string) {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }
}