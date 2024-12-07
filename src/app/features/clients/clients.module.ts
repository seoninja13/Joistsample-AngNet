import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ClientsListComponent,
    ClientFormComponent,
    ClientDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ClientsListComponent },
      { path: 'new', component: ClientFormComponent },
      { path: ':id', component: ClientDetailsComponent },
      { path: ':id/edit', component: ClientFormComponent }
    ])
  ]
})
export class ClientsModule { }