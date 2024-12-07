import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { ClientService } from '../../../core/services/client.service';
import { ProjectStatus } from '../../../core/models/project.model';
import { Client } from '../../../core/models/client.model';

@Component({
  selector: 'app-project-form',
  template: `
    <div class="container mx-auto px-4 py-8">
      <app-page-header
        [title]="isEditMode ? 'Edit Project' : 'New Project'"
        [showButton]="false"
      ></app-page-header>

      <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <form [formGroup]="projectForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- Project Details -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Project Name</label>
              <input
                type="text"
                formControlName="name"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <app-validation-message [control]="projectForm.get('name')"></app-validation-message>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Client</label>
              <select
                formControlName="clientId"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select a client</option>
                <option [value]="client.id" *ngFor="let client of clients">
                  {{client.firstName}} {{client.lastName}}
                </option>
              </select>
              <app-validation-message [control]="projectForm.get('clientId')"></app-validation-message>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                formControlName="description"
                rows="4"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  formControlName="startDate"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <app-validation-message [control]="projectForm.get('startDate')"></app-validation-message>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  formControlName="endDate"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Budget</label>
              <input
                type="number"
                formControlName="budget"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <app-validation-message [control]="projectForm.get('budget')"></app-validation-message>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <select
                formControlName="status"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option [value]="status" *ngFor="let status of projectStatuses">
                  {{status}}
                </option>
              </select>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              (click)="cancel()"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="projectForm.invalid || isSubmitting"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ isEditMode ? 'Update' : 'Create' }} Project
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  isEditMode = false;
  isSubmitting = false;
  projectId: string | null = null;
  clients: Client[] = [];
  projectStatuses = Object.values(ProjectStatus);

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required]],
      clientId: ['', [Validators.required]],
      description: [''],
      startDate: ['', [Validators.required]],
      endDate: [''],
      budget: ['', [Validators.required, Validators.min(0)]],
      status: [ProjectStatus.DRAFT]
    });
  }

  ngOnInit() {
    this.loadClients();
    this.projectId = this.route.snapshot.paramMap.get('id');
    if (this.projectId) {
      this.isEditMode = true;
      this.loadProject();
    }
  }

  loadClients() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  loadProject() {
    if (this.projectId) {
      this.projectService.getProject(this.projectId).subscribe(project => {
        this.projectForm.patchValue({
          name: project.name,
          clientId: project.clientId,
          description: project.description,
          startDate: new Date(project.startDate).toISOString().split('T')[0],
          endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
          budget: project.budget,
          status: project.status
        });
      });
    }
  }

  onSubmit() {
    if (this.projectForm.valid) {
      this.isSubmitting = true;
      const projectData = this.projectForm.value;

      const request = this.isEditMode
        ? this.projectService.updateProject(this.projectId!, projectData)
        : this.projectService.createProject(projectData);

      request.subscribe({
        next: () => {
          this.router.navigate(['/projects']);
        },
        error: (error) => {
          console.error('Error saving project:', error);
          this.isSubmitting = false;
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/projects']);
  }
}