import { Routes } from '@angular/router';
import { EstimatesListComponent } from './estimates-list/estimates-list.component';
import { EstimateFormComponent } from './estimate-form/estimate-form.component';

export const ESTIMATE_ROUTES: Routes = [
  {
    path: '',
    component: EstimatesListComponent
  },
  {
    path: 'new',
    component: EstimateFormComponent
  },
  {
    path: ':id',
    component: EstimateFormComponent
  }
];
