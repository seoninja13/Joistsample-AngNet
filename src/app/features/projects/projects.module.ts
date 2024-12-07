import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectTimelineComponent } from './project-details/project-timeline.component';
import { ProjectFilesComponent } from './project-details/project-files.component';
import { ProjectTasksComponent } from './project-details/project-tasks.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ProjectsListComponent,
    ProjectFormComponent,
    ProjectDetailsComponent,
    ProjectTimelineComponent,
    ProjectFilesComponent,
    ProjectTasksComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ProjectsListComponent },
      { path: 'new', component: ProjectFormComponent },
      { path: ':id', component: ProjectDetailsComponent },
      { path: ':id/edit', component: ProjectFormComponent }
    ])
  ]
})
export class ProjectsModule { }