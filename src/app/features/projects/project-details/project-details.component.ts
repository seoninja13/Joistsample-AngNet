import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../../core/models/project.model';
import { ProjectService } from '../../../core/services/project.service';
import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../core/models/client.model';

@Component({
  selector: 'app-project-details',
  template: `
    <div class="container mx-auto px-4 py-8" *ngIf="project">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">{{project.name}}</h1>
        <div class="space-x-4">
          <button
            (click)="editProject()"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Edit Project
          </button>
          <button
            (click)="createEstimate()"
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Create Estimate
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <!-- Project Overview -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Project Overview</h2>
          <div class="space-y-4">
            <div>
              <p class="text-sm text-gray-500">Status</p>
              <app-status-badge [status]="project.status" type="project"></app-status-badge>
            </div>
            <div>
              <p class="text-sm text-gray-500">Budget</p>
              <p class="text-lg font-medium">{{project.budget | currency}}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Timeline</p>
              <p class="text-lg font-medium">
                {{project.startDate | date}} - {{project.endDate | date}}
              </p>
            </div>
          </div>
        </div>

        <!-- Client Information -->
        <div class="bg-white rounded-lg shadow p-6" *ngIf="client">
          <h2 class="text-xl font-semibold mb-4">Client Information</h2>
          <div class="space-y-4">
            <div>
              <p class="text-sm text-gray-500">Name</p>
              <p class="text-lg font-medium">{{client.firstName}} {{client.lastName}}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Email</p>
              <p class="text-lg font-medium">{{client.email}}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Phone</p>
              <p class="text-lg font-medium">{{client.phone}}</p>
            </div>
          </div>
        </div>

        <!-- Financial Summary -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Financial Summary</h2>
          <div class="space-y-4">
            <div>
              <p class="text-sm text-gray-500">Total Invoiced</p>
              <p class="text-lg font-medium">{{totalInvoiced | currency}}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Total Paid</p>
              <p class="text-lg font-medium">{{totalPaid | currency}}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Outstanding Balance</p>
              <p class="text-lg font-medium text-red-600">{{totalInvoiced - totalPaid | currency}}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Project Timeline -->
      <div class="mb-6">
        <app-project-timeline [project]="project"></app-project-timeline>
      </div>

      <!-- Tasks and Files -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <app-project-tasks [projectId]="project.id"></app-project-tasks>
        <app-project-files [projectId]="project.id"></app-project-files>
      </div>
    </div>
  `
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | null = null;
  client: Client | null = null;
  totalInvoiced = 0;
  totalPaid = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.loadProject(projectId);
    }
  }

  loadProject(projectId: string) {
    this.projectService.getProject(projectId).subscribe(project => {
      this.project = project;
      this.loadClient(project.clientId);
      this.loadFinancials(projectId);
    });
  }

  loadClient(clientId: string) {
    this.clientService.getClient(clientId).subscribe(client => {
      this.client = client;
    });
  }

  loadFinancials(projectId: string) {
    // Load project financials
    this.totalInvoiced = 50000; // Mock data
    this.totalPaid = 30000; // Mock data
  }

  editProject() {
    if (this.project) {
      this.router.navigate(['/projects', this.project.id, 'edit']);
    }
  }

  createEstimate() {
    if (this.project) {
      this.router.navigate(['/estimates/new'], {
        queryParams: { projectId: this.project.id }
      });
    }
  }
}