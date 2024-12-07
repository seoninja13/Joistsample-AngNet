import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project, ProjectStatus } from '../../../core/models/project.model';
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-projects-list',
  template: `
    <div class="container mx-auto px-4 py-8">
      <app-page-header
        title="Projects"
        buttonText="Create Project"
        (buttonClick)="createProject()"
      ></app-page-header>

      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="p-4">
          <!-- Filters -->
          <div class="flex gap-4 mb-6">
            <input
              type="text"
              [(ngModel)]="searchTerm"
              (input)="applyFilters()"
              placeholder="Search projects..."
              class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              [(ngModel)]="statusFilter"
              (change)="applyFilters()"
              class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option [value]="status" *ngFor="let status of projectStatuses">
                {{status}}
              </option>
            </select>
          </div>

          <!-- Projects Table -->
          <app-data-table
            [columns]="columns"
            [data]="filteredProjects"
            (onEdit)="editProject($event)"
            (onDelete)="deleteProject($event)"
          ></app-data-table>
        </div>
      </div>
    </div>
  `
})
export class ProjectsListComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  searchTerm = '';
  statusFilter = 'all';
  projectStatuses = Object.values(ProjectStatus);

  columns = [
    { key: 'name', label: 'Project Name' },
    { key: 'clientId', label: 'Client' },
    { key: 'startDate', label: 'Start Date', type: 'date' },
    { key: 'budget', label: 'Budget', type: 'currency' },
    { key: 'status', label: 'Status', type: 'status' }
  ];

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
      this.applyFilters();
    });
  }

  createProject() {
    this.router.navigate(['/projects/new']);
  }

  editProject(project: Project) {
    this.router.navigate(['/projects', project.id, 'edit']);
  }

  deleteProject(project: Project) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(project.id).subscribe(() => {
        this.loadProjects();
      });
    }
  }

  applyFilters() {
    let filtered = this.projects;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(project => 
        project.name.toLowerCase().includes(term)
      );
    }

    if (this.statusFilter !== 'all') {
      filtered = filtered.filter(project => 
        project.status === this.statusFilter
      );
    }

    this.filteredProjects = filtered;
  }
}