import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EstimatesListComponent } from './estimates-list/estimates-list.component';
import { EstimateFormComponent } from './estimate-form/estimate-form.component';
import { LineItemFormComponent } from './components/line-item-form/line-item-form.component';
import { EstimateTotalsComponent } from './components/estimate-totals/estimate-totals.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    EstimatesListComponent,
    EstimateFormComponent,
    LineItemFormComponent,
    EstimateTotalsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: EstimatesListComponent },
      { path: 'new', component: EstimateFormComponent },
      { path: 'edit/:id', component: EstimateFormComponent }
    ])
  ]
})
export class EstimatesModule { }