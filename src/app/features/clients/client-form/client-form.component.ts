import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../core/services/client.service';
import { CustomValidators } from '../../../core/validators/custom-validators';

@Component({
  selector: 'app-client-form',
  template: `
    <div class="container mx-auto px-4 py-8">
      <app-page-header
        [title]="isEditMode ? 'Edit Client' : 'New Client'"
        [showButton]="false"
      ></app-page-header>

      <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <form [formGroup]="clientForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Personal Information -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  formControlName="firstName"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <app-validation-message [control]="clientForm.get('firstName')"></app-validation-message>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  formControlName="lastName"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <app-validation-message [control]="clientForm.get('lastName')"></app-validation-message>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  formControlName="email"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <app-validation-message [control]="clientForm.get('email')"></app-validation-message>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  formControlName="phone"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <app-validation-message [control]="clientForm.get('phone')"></app-validation-message>
              </div>
            </div>

            <!-- Address -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Street Address</label>
                <input
                  type="text"
                  formControlName="street"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <app-validation-message [control]="clientForm.get('street')"></app-validation-message>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  formControlName="city"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <app-validation-message [control]="clientForm.get('city')"></app-validation-message>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  formControlName="state"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <app-validation-message [control]="clientForm.get('state')"></app-validation-message>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">ZIP Code</label>
                <input
                  type="text"
                  formControlName="zipCode"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <app-validation-message [control]="clientForm.get('zipCode')"></app-validation-message>
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
              [disabled]="clientForm.invalid || isSubmitting"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ isEditMode ? 'Update' : 'Create' }} Client
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  isEditMode = false;
  isSubmitting = false;
  clientId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.clientForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, CustomValidators.phoneNumber()]],
      company: [''],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
      notes: ['']
    });
  }

  ngOnInit() {
    this.clientId = this.route.snapshot.paramMap.get('id');
    if (this.clientId) {
      this.isEditMode = true;
      this.loadClient();
    }
  }

  loadClient() {
    if (this.clientId) {
      this.clientService.getClient(this.clientId).subscribe(client => {
        this.clientForm.patchValue({
          firstName: client.firstName,
          lastName: client.lastName,
          email: client.email,
          phone: client.phone,
          company: client.company,
          street: client.address.street,
          city: client.address.city,
          state: client.address.state,
          zipCode: client.address.zipCode,
          notes: client.notes
        });
      });
    }
  }

  onSubmit() {
    if (this.clientForm.valid) {
      this.isSubmitting = true;
      const clientData = this.prepareClientData();

      const request = this.isEditMode
        ? this.clientService.updateClient(this.clientId!, clientData)
        : this.clientService.createClient(clientData);

      request.subscribe({
        next: () => {
          this.router.navigate(['/clients']);
        },
        error: (error) => {
          console.error('Error saving client:', error);
          this.isSubmitting = false;
        }
      });
    }
  }

  private prepareClientData() {
    const formValue = this.clientForm.value;
    return {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      phone: formValue.phone,
      company: formValue.company,
      address: {
        street: formValue.street,
        city: formValue.city,
        state: formValue.state,
        zipCode: formValue.zipCode
      },
      notes: formValue.notes
    };
  }

  cancel() {
    this.router.navigate(['/clients']);
  }
}