import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estimate } from '../../../core/models/estimate.model';

@Component({
  selector: 'app-estimates-list',
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Estimates</h1>
        <button 
          (click)="createEstimate()"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create Estimate
        </button>
      </div>

      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Number
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let estimate of estimates">
              <td class="px-6 py-4 whitespace-nowrap">{{estimate.id}}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{estimate.clientId}}</td>
              <td class="px-6 py-4 whitespace-nowrap">${{estimate.total}}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span [class]="getStatusClass(estimate.status)">
                  {{estimate.status}}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button 
                  (click)="editEstimate(estimate.id)"
                  class="text-indigo-600 hover:text-indigo-900 mr-4">
                  Edit
                </button>
                <button 
                  (click)="deleteEstimate(estimate.id)"
                  class="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class EstimatesListComponent implements OnInit {
  estimates: Estimate[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // Load estimates
  }

  createEstimate() {
    this.router.navigate(['/estimates/new']);
  }

  editEstimate(id: string) {
    this.router.navigate(['/estimates/edit', id]);
  }

  deleteEstimate(id: string) {
    // Implement delete functionality
  }

  getStatusClass(status: string): string {
    const classes = {
      'DRAFT': 'bg-gray-100 text-gray-800',
      'SENT': 'bg-blue-100 text-blue-800',
      'ACCEPTED': 'bg-green-100 text-green-800',
      'REJECTED': 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 text-xs font-medium rounded-full ${classes[status] || ''}`;
  }
}