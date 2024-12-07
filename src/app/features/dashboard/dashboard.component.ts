import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from './components/stats-card.component';
import { RecentActivityComponent } from './components/recent-activity.component';
import { ProjectSummaryComponent } from './components/project-summary.component';
import { ProjectService } from '../../core/services/project.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { EstimateService } from '../../core/services/estimate.service';
import { Activity } from './components/recent-activity.component';
import { Project } from '../../core/models/project.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatsCardComponent, RecentActivityComponent, ProjectSummaryComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Dashboard</h1>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <app-stats-card
          title="Total Revenue"
          [value]="totalRevenue"
          type="currency"
          [change]="revenueChange">
          <div class="p-3 bg-green-100 rounded-full">
            <i class="fas fa-dollar-sign text-green-600"></i>
          </div>
        </app-stats-card>

        <app-stats-card
          title="Active Projects"
          [value]="activeProjects"
          [change]="projectsChange">
          <div class="p-3 bg-blue-100 rounded-full">
            <i class="fas fa-project-diagram text-blue-600"></i>
          </div>
        </app-stats-card>

        <app-stats-card
          title="Pending Estimates"
          [value]="pendingEstimates"
          [change]="estimatesChange">
          <div class="p-3 bg-yellow-100 rounded-full">
            <i class="fas fa-file-invoice text-yellow-600"></i>
          </div>
        </app-stats-card>

        <app-stats-card
          title="Outstanding Invoices"
          [value]="outstandingAmount"
          type="currency"
          [change]="outstandingChange">
          <div class="p-3 bg-red-100 rounded-full">
            <i class="fas fa-file-invoice-dollar text-red-600"></i>
          </div>
        </app-stats-card>
      </div>

      <!-- Activity and Projects -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <app-recent-activity [activities]="recentActivities"></app-recent-activity>
        <app-project-summary [projects]="activeProjectsList"></app-project-summary>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  // Stats
  totalRevenue = 0;
  revenueChange = 15;
  activeProjects = 0;
  projectsChange = 5;
  pendingEstimates = 0;
  estimatesChange = -2;
  outstandingAmount = 0;
  outstandingChange = 8;

  // Lists
  recentActivities: Activity[] = [];
  activeProjectsList: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private invoiceService: InvoiceService,
    private estimateService: EstimateService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    // Load projects
    this.projectService.getProjects().subscribe(projects => {
      this.activeProjectsList = projects.filter(p => p.status === 'IN_PROGRESS');
      this.activeProjects = this.activeProjectsList.length;
    });

    // Load estimates
    this.estimateService.getEstimates().subscribe(estimates => {
      this.pendingEstimates = estimates.filter(e => e.status === 'SENT').length;
    });

    // Load invoices
    this.invoiceService.getInvoices().subscribe(invoices => {
      this.totalRevenue = invoices
        .filter(i => i.status === 'PAID')
        .reduce((sum, inv) => sum + inv.total, 0);

      this.outstandingAmount = invoices
        .filter(i => i.status === 'SENT' || i.status === 'OVERDUE')
        .reduce((sum, inv) => sum + inv.total, 0);

      // Generate recent activities
      this.recentActivities = [
        ...invoices.map(inv => ({
          id: inv.id,
          type: 'invoice' as const,
          title: `Invoice #${inv.number}`,
          description: `${inv.status === 'PAID' ? 'Paid' : 'Created'} - $${inv.total}`,
          date: inv.createdAt,
          status: inv.status
        })),
        // Add other activities as needed
      ].sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 10);
    });
  }
}