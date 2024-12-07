import { Component, Input } from '@angular/core';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-summary',
  template: `
    <div class="bg-white rounded-lg shadow">
      <div class="p-6">
        <h3 class="text-lg font-medium text-gray-900">Active Projects</h3>
        <div class="mt-6 flow-root">
          <ul role="list" class="divide-y divide-gray-200">
            <li *ngFor="let project of projects" class="py-4">
              <div class="flex items-center space-x-4">
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">
                    {{ project.name }}
                  </p>
                  <p class="text-sm text-gray-500">
                    Due: {{ project.endDate | date }}
                  </p>
                </div>
                <div>
                  <app-status-badge [status]="project.status" type="project"></app-status-badge>
                </div>
                <div class="flex-shrink-0">
                  <button 
                    (click)="viewProject(project.id)"
                    class="text-sm text-blue-600 hover:text-blue-900">
                    View
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `
})
export class ProjectSummaryComponent {
  @Input() projects: Project[] = [];

  viewProject(id: string) {
    // Navigate to project details
  }
}