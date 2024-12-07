import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    InvoicesListComponent,
    InvoiceFormComponent,
    InvoiceDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: InvoicesListComponent },
      { path: 'new', component: InvoiceFormComponent },
      { path: ':id', component: InvoiceDetailsComponent },
      { path: ':id/edit', component: InvoiceFormComponent }
    ])
  ]
})
export class InvoicesModule { }