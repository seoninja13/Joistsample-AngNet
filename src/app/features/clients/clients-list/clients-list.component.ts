import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../../core/models/client.model';
import { ClientService } from '../../../core/services/client.service';

@Component({
  selector: 'app-clients-list',
  template: `
    <div class="container mx-auto px-4 py-8">
      <app-page-header
        title="Clients"
        buttonText="Add Client"
        (buttonClick)="createClient()"
      ></app-page-header>

      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="p-4">
          <div class="flex gap-4 mb-4">
            <input
              type="text"
              [(ngModel)]="searchTerm"
              (input)="onSearch()"
              placeholder="Search clients..."
              class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              [(ngModel)]="filterBy"
              (change)="onFilterChange()"
              class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Clients</option>
              <option value="active">Active Projects</option>
              <option value="completed">Completed Projects</option>
            </select>
          </div>

          <app-data-table
            [columns]="columns"
            [data]="filteredClients"
            (onEdit)="editClient($event)"
            (onDelete)="deleteClient($event)"
          ></app-data-table>
        </div>
      </div>
    </div>
  `
})
export class ClientsListComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  searchTerm = '';
  filterBy = 'all';

  columns = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'projectIds', label: 'Projects', type: 'number' }
  ];

  constructor(
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.applyFilters();
    });
  }

  createClient() {
    this.router.navigate(['/clients/new']);
  }

  editClient(client: Client) {
    this.router.navigate(['/clients', client.id, 'edit']);
  }

  deleteClient(client: Client) {
    if (confirm('Are you sure you want to delete this client?')) {
      this.clientService.deleteClient(client.id).subscribe(() => {
        this.loadClients();
      });
    }
  }

  onSearch() {
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  private applyFilters() {
    let filtered = this.clients;

    // Apply search
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(client => 
        client.firstName.toLowerCase().includes(term) ||
        client.lastName.toLowerCase().includes(term) ||
        client.email.toLowerCase().includes(term)
      );
    }

    // Apply filters
    switch (this.filterBy) {
      case 'active':
        filtered = filtered.filter(client => client.projectIds.length > 0);
        break;
      case 'completed':
        // Add logic for completed projects
        break;
    }

    this.filteredClients = filtered;
  }
}