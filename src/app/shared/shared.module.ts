import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from './components/status-badge/status-badge.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

@NgModule({
  declarations: [
    ValidationMessageComponent,
    LoadingSpinnerComponent,
    StatusBadgeComponent,
    DataTableComponent,
    PageHeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ValidationMessageComponent,
    LoadingSpinnerComponent,
    StatusBadgeComponent,
    DataTableComponent,
    PageHeaderComponent,
    ReactiveFormsModule
  ]
})
export class SharedModule { }