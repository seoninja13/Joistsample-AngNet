import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { StatsCardComponent } from './components/stats-card.component';
import { RecentActivityComponent } from './components/recent-activity.component';
import { ProjectSummaryComponent } from './components/project-summary.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    StatsCardComponent,
    RecentActivityComponent,
    ProjectSummaryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent }
    ])
  ]
})
export class DashboardModule { }