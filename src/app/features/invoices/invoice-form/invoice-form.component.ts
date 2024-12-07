import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../../core/services/invoice.service';
import { ProjectService } from '../../../core/services/project.service';
import { ClientService } from '../../../core/services/client.service';
import { TaxService } from '../../../core/services/tax.service';
import { InvoiceStatus, RecurringInterval } from '../../../core/models/invoice.model';
import { Project } from '../../../core/models/project.model';
import { Client } from '../../../core/models/client.model';

@Component({
  selector: 'app-invoice-form',
  template: `
    <div class="container mx-auto px-4 py-8">
      <app-page-header
        [title]="isEditMode ? 'Edit Invoice' : 'New Invoice'"
        [showButton]="false"
      ></app-page-header>

      <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <form [formGroup]="invoiceForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- Basic Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">Project</label>
              <select
                formControlName="projectId"
                (change)="onProjectChange($event)"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select a project</option>
                <option [value]="project.id" *ngFor="let project of projects">
                  {{project.name}}
                </option>
              </select>
              <app-validation-message [control]="invoiceForm.get('projectId')"></app-validation-message>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Invoice Number</label>
              <input
                type="text"
                formControlName="number"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <app-validation-message [control]="invoiceForm.get('number')"></app-validation-message>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                formControlName="dueDate"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <app-validation-message [control]="invoiceForm.get('dueDate')"></app-validation-message>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <select
                formControlName="status"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option [value]="status" *ngFor="let status of invoiceStatuses">
                  {{status}}
                </option>
              </select>
            </div>
          </div>

          <!-- Recurring Settings -->
          <div class="space-y-4">
            <div class="flex items-center">
              <input
                type="checkbox"
                id="isRecurring"
                formControlName="isRecurring"
                class="h-4 w-4 text-blue-600 rounded"
              />
              <label for="isRecurring" class="ml-2 text-sm font-medium text-gray-700">
                Recurring Invoice
              </label>
            </div>

            <div *ngIf="invoiceForm.get('isRecurring')?.value" class="ml-6">
              <label class="block text-sm font-medium text-gray-700">Interval</label>
              <select
                formControlName="recurringInterval"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option [value]="interval" *ngFor="let interval of recurringIntervals">
                  {{interval}}
                </option>
              </select>
            </div>
          </div>

          <!-- Line Items -->
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-medium">Line Items</h3>
              <button
                type="button"
                (click)="addLineItem()"
                class="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Item
              </button>
            </div>

            <div formArrayName="items" class="space-y-4">
              <div *ngFor="let item of items.controls; let i=index" [formGroupName]="i"
                   class="grid grid-cols-12 gap-4 items-start border p-4 rounded-lg">
                <div class="col-span-4">
                  <label class="block text-sm font-medium text-gray-700">Description</label>
                  <input
                    type="text"
                    formControlName="description"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div class="col-span-2">
                  <label class="block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    formControlName="category"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div class="col-span-2">
                  <label class="block text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    type="number"
                    formControlName="quantity"
                    (input)="calculateLineItemTotal(i)"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div class="col-span-2">
                  <label class="block text-sm font-medium text-gray-700">Unit Price</label>
                  <input
                    type="number"
                    formControlName="unitPrice"
                    (input)="calculateLineItemTotal(i)"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div class="col-span-1">
                  <label class="block text-sm font-medium text-gray-700">Total</label>
                  <input
                    type="number"
                    formControlName="total"
                    readonly
                    class="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm"
                  />
                </div>

                <div class="col-span-1 pt-6">
                  <button
                    type="button"
                    (click)="removeLineItem(i)"
                    class="text-red-600 hover:text-red-800"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Totals -->
          <div class="border-t pt-4">
            <div class="flex justify-end space-y-2">
              <div class="w-64 space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600">Subtotal:</span>
                  <span class="font-medium">{{invoiceForm.get('subtotal')?.value | currency}}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Tax ({{taxRate}}%):</span>
                  <span class="font-medium">{{invoiceForm.get('tax')?.value | currency}}</span>
                </div>
                <div class="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>{{invoiceForm.get('total')?.value | currency}}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              formControlName="notes"
              rows="4"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
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
              [disabled]="invoiceForm.invalid || isSubmitting"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ isEditMode ? 'Update' : 'Create' }} Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm: FormGroup;
  isEditMode = false;
  isSubmitting = false;
  invoiceId: string | null = null;
  projects: Project[] = [];
  clients: Client[] = [];
  invoiceStatuses = Object.values(InvoiceStatus);
  recurringIntervals = Object.values(RecurringInterval);
  taxRate: number;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private projectService: ProjectService,
    private clientService: ClientService,
    private taxService: TaxService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taxRate = this.taxService.getTaxRate();
    this.invoiceForm = this.createForm();
  }

  ngOnInit() {
    this.loadProjects();
    this.invoiceId = this.route.snapshot.paramMap.get('id');
    
    if (this.invoiceId) {
      this.isEditMode = true;
      this.loadInvoice();
    } else {
      this.addLineItem(); // Add first empty line item
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      projectId: ['', Validators.required],
      number: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: [InvoiceStatus.DRAFT],
      isRecurring: [false],
      recurringInterval: [null],
      items: this.fb.array([]),
      subtotal: [0],
      tax: [0],
      total: [0],
      notes: ['']
    });
  }

  get items() {
    return this.invoiceForm.get('items') as FormArray;
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  loadInvoice() {
    if (this.invoiceId) {
      this.invoiceService.getInvoice(this.invoiceId).subscribe(invoice => {
        // Clear existing items
        while (this.items.length) {
          this.items.removeAt(0);
        }

        // Add each item from the invoice
        invoice.items.forEach(item => {
          this.items.push(this.createLineItem(item));
        });

        this.invoiceForm.patchValue({
          projectId: invoice.projectId,
          number: invoice.number,
          dueDate: new Date(invoice.dueDate).toISOString().split('T')[0],
          status: invoice.status,
          isRecurring: invoice.isRecurring,
          recurringInterval: invoice.recurringInterval,
          subtotal: invoice.subtotal,
          tax: invoice.tax,
          total: invoice.total,
          notes: invoice.notes
        });
      });
    }
  }

  createLineItem(item: any = {}) {
    return this.fb.group({
      description: [item.description || '', Validators.required],
      category: [item.category || ''],
      quantity: [item.quantity || 1, [Validators.required, Validators.min(1)]],
      unitPrice: [item.unitPrice || 0, [Validators.required, Validators.min(0)]],
      total: [item.total || 0]
    });
  }

  addLineItem() {
    this.items.push(this.createLineItem());
  }

  removeLineItem(index: number) {
    this.items.removeAt(index);
    this.calculateTotals();
  }

  calculateLineItemTotal(index: number) {
    const item = this.items.at(index);
    const quantity = item.get('quantity')?.value || 0;
    const unitPrice = item.get('unitPrice')?.value || 0;
    const total = quantity * unitPrice;
    item.patchValue({ total }, { emitEvent: false });
    this.calculateTotals();
  }

  calculateTotals() {
    const subtotal = this.items.controls.reduce((sum, item) => {
      return sum + (item.get('total')?.value || 0);
    }, 0);

    const tax = this.taxService.calculateTax(subtotal);
    const total = subtotal + tax;

    this.invoiceForm.patchValue({
      subtotal,
      tax,
      total
    });
  }

  onProjectChange(event: any) {
    const projectId = event.target.value;
    if (projectId) {
      this.projectService.getProject(projectId).subscribe(project => {
        // Auto-fill client information if needed
      });
    }
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      this.isSubmitting = true;
      const invoiceData = this.invoiceForm.value;

      const request = this.isEditMode
        ? this.invoiceService.updateInvoice(this.invoiceId!, invoiceData)
        : this.invoiceService.createInvoice(invoiceData);

      request.subscribe({
        next: () => {
          this.router.navigate(['/invoices']);
        },
        error: (error) => {
          console.error('Error saving invoice:', error);
          this.isSubmitting = false;
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/invoices']);
  }
}