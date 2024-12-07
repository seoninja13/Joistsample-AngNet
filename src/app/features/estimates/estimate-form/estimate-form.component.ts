import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { EstimateService } from '../../../core/services/estimate.service';
import { Project } from '../../../core/models/project.model';
import { EstimateStatus } from '../../../core/models/estimate.model';
import { CurrencyUtils } from '../../../core/utils/currency.utils';

@Component({
  selector: 'app-estimate-form',
  template: `
    <div class="container mx-auto px-4 py-8">
      <app-page-header
        [title]="isEditMode ? 'Edit Estimate' : 'New Estimate'"
        [showButton]="false"
      ></app-page-header>

      <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <form [formGroup]="estimateForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- Project Selection -->
          <div *ngIf="!projectId">
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
            <app-validation-message [control]="estimateForm.get('projectId')"></app-validation-message>
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
                  <span class="font-medium">{{estimateForm.get('subtotal')?.value | currency}}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Tax ({{taxRate}}%):</span>
                  <span class="font-medium">{{estimateForm.get('tax')?.value | currency}}</span>
                </div>
                <div class="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>{{estimateForm.get('total')?.value | currency}}</span>
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
              [disabled]="estimateForm.invalid || isSubmitting"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ isEditMode ? 'Update' : 'Create' }} Estimate
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class EstimateFormComponent implements OnInit {
  estimateForm: FormGroup;
  isEditMode = false;
  isSubmitting = false;
  estimateId: string | null = null;
  projectId: string | null = null;
  projects: Project[] = [];
  taxRate = 8.5; // Example tax rate

  constructor(
    private fb: FormBuilder,
    private estimateService: EstimateService,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.estimateForm = this.fb.group({
      projectId: ['', Validators.required],
      items: this.fb.array([]),
      subtotal: [0],
      tax: [0],
      total: [0],
      notes: [''],
      status: [EstimateStatus.DRAFT],
      validUntil: [new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)]
    });
  }

  ngOnInit() {
    this.loadProjects();
    this.estimateId = this.route.snapshot.paramMap.get('id');
    this.projectId = this.route.snapshot.queryParamMap.get('projectId');

    if (this.projectId) {
      this.estimateForm.patchValue({ projectId: this.projectId });
    }

    if (this.estimateId) {
      this.isEditMode = true;
      this.loadEstimate();
    } else {
      this.addLineItem(); // Add first empty line item
    }
  }

  get items() {
    return this.estimateForm.get('items') as FormArray;
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  loadEstimate() {
    if (this.estimateId) {
      this.estimateService.getEstimate(this.estimateId).subscribe(estimate => {
        // Clear existing items
        while (this.items.length) {
          this.items.removeAt(0);
        }

        // Add each item from the estimate
        estimate.items.forEach(item => {
          this.items.push(this.createLineItem(item));
        });

        this.estimateForm.patchValue({
          projectId: estimate.projectId,
          subtotal: estimate.subtotal,
          tax: estimate.tax,
          total: estimate.total,
          notes: estimate.notes,
          status: estimate.status,
          validUntil: estimate.validUntil
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

    const tax = CurrencyUtils.calculateTax(subtotal, this.taxRate);
    const total = subtotal + tax;

    this.estimateForm.patchValue({
      subtotal,
      tax,
      total
    });
  }

  onProjectChange(event: any) {
    const projectId = event.target.value;
    // Additional logic if needed when project changes
  }

  onSubmit() {
    if (this.estimateForm.valid) {
      this.isSubmitting = true;
      const estimateData = this.estimateForm.value;

      const request = this.isEditMode
        ? this.estimateService.updateEstimate(this.estimateId!, estimateData)
        : this.estimateService.createEstimate(estimateData);

      request.subscribe({
        next: () => {
          this.router.navigate(['/estimates']);
        },
        error: (error) => {
          console.error('Error saving estimate:', error);
          this.isSubmitting = false;
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/estimates']);
  }
}