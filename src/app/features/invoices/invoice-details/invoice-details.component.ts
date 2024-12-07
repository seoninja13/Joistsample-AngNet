import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../../../core/models/invoice.model';
import { InvoiceService } from '../../../core/services/invoice.service';
import { PaymentService } from '../../../core/services/payment.service';
import { CurrencyUtils } from '../../../core/utils/currency.utils';

@Component({
  selector: 'app-invoice-details',
  template: `
    <div class="container mx-auto px-4 py-8" *ngIf="invoice">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Invoice #{{invoice.number}}</h1>
        <div class="space-x-4">
          <button
            (click)="editInvoice()"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Edit Invoice
          </button>
          <button
            (click)="downloadPdf()"
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Download PDF
          </button>
          <button
            *ngIf="invoice.status !== 'PAID'"
            (click)="processPayment()"
            class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Process Payment
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <!-- Invoice Status -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Status</h2>
          <div class="space-y-4">
            <div>
              <app-status-badge [status]="invoice.status" type="invoice"></app-status-badge>
            </div>
            <div>
              <p class="text-sm text-gray-500">Due Date</p>
              <p class="text-lg font-medium">{{invoice.dueDate | date}}</p>
            </div>
            <div *ngIf="invoice.isRecurring">
              <p class="text-sm text-gray-500">Recurring</p>
              <p class="text-lg font-medium">{{invoice.recurringInterval}}</p>
            </div>
          </div>
        </div>

        <!-- Project Information -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Project Details</h2>
          <div class="space-y-4">
            <div>
              <p class="text-sm text-gray-500">Project</p>
              <p class="text-lg font-medium">{{projectName}}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Client</p>
              <p class="text-lg font-medium">{{clientName}}</p>
            </div>
          </div>
        </div>

        <!-- Payment Summary -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Payment Summary</h2>
          <div class="space-y-4">
            <div>
              <p class="text-sm text-gray-500">Total Amount</p>
              <p class="text-lg font-medium">{{invoice.total | currency}}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Amount Paid</p>
              <p class="text-lg font-medium">{{amountPaid | currency}}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Balance Due</p>
              <p class="text-lg font-medium text-red-600">{{invoice.total - amountPaid | currency}}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Line Items -->
      <div class="bg-white rounded-lg shadow overflow-hidden mb-6">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unit Price
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let item of invoice.items">
              <td class="px-6 py-4 whitespace-nowrap">{{item.description}}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{item.category}}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{item.quantity}}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{item.unitPrice | currency}}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{item.total | currency}}</td>
            </tr>
          </tbody>
          <tfoot class="bg-gray-50">
            <tr>
              <td colspan="4" class="px-6 py-3 text-right text-sm font-medium text-gray-500">
                Subtotal
              </td>
              <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                {{invoice.subtotal | currency}}
              </td>
            </tr>
            <tr>
              <td colspan="4" class="px-6 py-3 text-right text-sm font-medium text-gray-500">
                Tax
              </td>
              <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                {{invoice.tax | currency}}
              </td>
            </tr>
            <tr>
              <td colspan="4" class="px-6 py-3 text-right text-sm font-bold text-gray-900">
                Total
              </td>
              <td class="px-6 py-3 whitespace-nowrap text-sm font-bold text-gray-900">
                {{invoice.total | currency}}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- Payment History -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Payment History</h2>
        <div class="space-y-4">
          <div *ngFor="let payment of payments" class="flex justify-between items-center p-4 border rounded">
            <div>
              <p class="font-medium">{{payment.amount | currency}}</p>
              <p class="text-sm text-gray-500">{{payment.createdAt | date}}</p>
            </div>
            <div>
              <app-status-badge [status]="payment.status"></app-status-badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class InvoiceDetailsComponent implements OnInit {
  invoice: Invoice | null = null;
  payments: any[] = [];
  amountPaid = 0;
  projectName = '';
  clientName = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    const invoiceId = this.route.snapshot.paramMap.get('id');
    if (invoiceId) {
      this.loadInvoice(invoiceId);
      this.loadPayments(invoiceId);
    }
  }

  loadInvoice(invoiceId: string) {
    this.invoiceService.getInvoice(invoiceId).subscribe(invoice => {
      this.invoice = invoice;
      // Load project and client details
      this.projectName = 'Sample Project'; // Replace with actual project name
      this.clientName = 'Sample Client'; // Replace with actual client name
    });
  }

  loadPayments(invoiceId: string) {
    this.paymentService.getPaymentsByInvoice(invoiceId).subscribe(payments => {
      this.payments = payments;
      this.amountPaid = payments
        .filter(p => p.status === 'COMPLETED')
        .reduce((sum, p) => sum + p.amount, 0);
    });
  }

  editInvoice() {
    if (this.invoice) {
      this.router.navigate(['/invoices', this.invoice.id, 'edit']);
    }
  }

  downloadPdf() {
    if (this.invoice) {
      this.invoiceService.generatePdf(this.invoice.id).subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `invoice-${this.invoice?.number}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      });
    }
  }

  processPayment() {
    if (this.invoice) {
      // Implement payment processing logic
      console.log('Processing payment for invoice:', this.invoice.id);
    }
  }
}