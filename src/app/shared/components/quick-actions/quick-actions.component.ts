import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quick-actions',
  template: `
    <div class="bg-white rounded-lg shadow-lg p-4">
      <h3 class="text-lg font-medium mb-4">Quick Actions</h3>
      <div class="grid grid-cols-2 gap-4">
        <button (click)="navigate('/projects/new')"
                class="p-4 text-center rounded-lg bg-blue-50 hover:bg-blue-100">
          <i class="fas fa-plus-circle text-blue-600 text-xl mb-2"></i>
          <div class="text-sm">New Project</div>
        </button>
        <button (click)="navigate('/estimates/new')"
                class="p-4 text-center rounded-lg bg-green-50 hover:bg-green-100">
          <i class="fas fa-file-invoice text-green-600 text-xl mb-2"></i>
          <div class="text-sm">New Estimate</div>
        </button>
        <button (click)="navigate('/invoices/new')"
                class="p-4 text-center rounded-lg bg-purple-50 hover:bg-purple-100">
          <i class="fas fa-file-invoice-dollar text-purple-600 text-xl mb-2"></i>
          <div class="text-sm">New Invoice</div>
        </button>
        <button (click)="navigate('/clients/new')"
                class="p-4 text-center rounded-lg bg-yellow-50 hover:bg-yellow-100">
          <i class="fas fa-user-plus text-yellow-600 text-xl mb-2"></i>
          <div class="text-sm">New Client</div>
        </button>
      </div>
    </div>
  `
})
export class QuickActionsComponent {
  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([path]);
  }
}