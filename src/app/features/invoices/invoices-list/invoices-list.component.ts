import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice, InvoiceStatus } from '../../../core/models/invoice.model';
import { InvoiceService } from '../../../core/services/invoice.service';
import { CurrencyUtils } from '../../../core/utils/currency.utils';

@Component({
  selector: 'app-invoices-list',
  template: `
    <div class="container mx-auto px-4 py-8">
      <app-page-header
        title="Invoices"
        buttonText="Create Invoice"
        (buttonClick)="createInvoice()"
      ></app-page-header>

      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="p-4">
          <!-- Filters -->
          <div class="flex gap-4 mb-6">
            <input
              type="text"
              [(ngModel)]="searchTerm"
              (input)="applyFilters()"
              placeholder="Search invoices..."
              class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              [(ngModel)]="statusFilter"
              (change)="applyFilters()"
              class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option [value]="status" *ngFor="let status of invoiceStatuses">
                {{status}}
              </option>
            </select>
          </div>

          <!-- Invoices Table -->
          <app-data-table
            [columns]="columns"
            [data]="filteredInvoices"
            (onEdit)="editInvoice($event)"
            (onDelete)="deleteInvoice($event)"
          ></app-data-table>
        </div>
      </div>
    </div>
  `
})
export class InvoicesListComponent implements OnInit {
  invoices: Invoice[] = [];
  filteredInvoices: Invoice[] = [];
  searchTerm = '';
  statusFilter = 'all';
  invoiceStatuses = Object.values(InvoiceStatus);

  columns = [
    { key: 'number', label: 'Invoice #' },
    { key: 'clientId', label: 'Client' },
    { key: 'total', label: 'Amount', type: 'currency' },
    { key: 'dueDate', label: 'Due Date', type: 'date' },
    { key: 'status', label: 'Status', type: 'status' }
  ];

  constructor(
    private invoiceService: InvoiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadInvoices();
  }

  loadInvoices() {
    this.invoiceService.getInvoices().subscribe(invoices => {
      this.invoices = invoices;
      this.applyFilters();
    });
  }

  createInvoice() {
    this.router.navigate(['/invoices/new']);
  }

  editInvoice(invoice: Invoice) {
    this.router.navigate(['/invoices', invoice.id, 'edit']);
  }

  deleteInvoice(invoice: Invoice) {
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.invoiceService.deleteInvoice(invoice.id).subscribe(() => {
        this.loadInvoices();
      });
    }
  }

  applyFilters() {
    let filtered = this.invoices;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(invoice => 
        invoice.number.toLowerCase().includes(term)
      );
    }

    if (this.statusFilter !== 'all') {
      filtered = filtered.filter(invoice => 
        invoice.status === this.statusFilter
      );
    }

    this.filteredInvoices = filtered;
  }
}