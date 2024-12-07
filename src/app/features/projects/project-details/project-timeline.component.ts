import { Component, Input } from '@angular/core';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-timeline',
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Project Timeline</h3>
      <div class="relative">
        <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        <div class="space-y-6">
          <div *ngFor="let milestone of milestones" class="relative pl-10">
            <div class="absolute left-0 top-2 w-8 h-8 rounded-full flex items-center justify-center"
                 [ngClass]="getMilestoneStatusClass(milestone.status)">
              <i class="fas fa-check text-white" *ngIf="milestone.status === 'completed'"></i>
              <i class="fas fa-clock text-white" *ngIf="milestone.status === 'in_progress'"></i>
              <i class="fas fa-hourglass text-white" *ngIf="milestone.status === 'pending'"></i>
            </div>
            <div>
              <h4 class="text-md font-medium">{{milestone.title}}</h4>
              <p class="text-sm text-gray-500">{{milestone.date | date}}</p>
              <p class="text-sm text-gray-600 mt-1">{{milestone.description}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProjectTimelineComponent {
  @Input() project: Project | null = null;
  
  milestones = [
    {
      title: 'Project Start',
      date: new Date(),
      description: 'Project kickoff and initial planning',
      status: 'completed'
    },
    {
      title: 'Design Phase',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      description: 'Design approval and finalization',
      status: 'in_progress'
    },
    {
      title: 'Construction',
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      description: 'Main construction phase',
      status: 'pending'
    }
  ];

  getMilestoneStatusClass(status: string): string {
    const classes = {
      completed: 'bg-green-500',
      in_progress: 'bg-blue-500',
      pending: 'bg-gray-400'
    };
    return classes[status] || classes.pending;
  }
}