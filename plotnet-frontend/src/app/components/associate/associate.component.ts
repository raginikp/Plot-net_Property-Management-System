import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { SalesService } from '../../services/sales.service';
import { PropertyService } from '../../services/property.service';
import { Lead, Deal } from '../../models/sales.model';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-associate',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  template: `
    <div class="associate-container">
      <div class="header">
        <h1>Sales Management Dashboard</h1>
        <p>Manage leads, track deals, and monitor your sales performance</p>
      </div>

      <mat-tab-group>
        <!-- Dashboard Overview -->
        <mat-tab label="Dashboard">
          <div class="tab-content">
            <div class="stats-grid">
              <mat-card class="stat-card">
                <mat-card-header>
                  <mat-icon>contact_phone</mat-icon>
                  <mat-card-title>Total Leads</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="stat-number">{{ leads.length }}</div>
                  <div class="stat-label">Active Leads</div>
                </mat-card-content>
              </mat-card>

              <mat-card class="stat-card">
                <mat-card-header>
                  <mat-icon>handshake</mat-icon>
                  <mat-card-title>Active Deals</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="stat-number">{{ deals.length }}</div>
                  <div class="stat-label">In Progress</div>
                </mat-card-content>
              </mat-card>

              <mat-card class="stat-card">
                <mat-card-header>
                  <mat-icon>trending_up</mat-icon>
                  <mat-card-title>Conversion Rate</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="stat-number">{{ getConversionRate() }}%</div>
                  <div class="stat-label">Lead to Deal</div>
                </mat-card-content>
              </mat-card>

              <mat-card class="stat-card">
                <mat-card-header>
                  <mat-icon>attach_money</mat-icon>
                  <mat-card-title>Total Revenue</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="stat-number">₹{{ getTotalRevenue() | number:'1.0-0' }}</div>
                  <div class="stat-label">This Month</div>
                </mat-card-content>
              </mat-card>
            </div>

            <div class="performance-section">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>Sales Performance</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="performance-metrics">
                    <div class="metric">
                      <span class="metric-label">Monthly Target</span>
                      <mat-progress-bar mode="determinate" [value]="getTargetProgress()"></mat-progress-bar>
                      <span class="metric-value">{{ getTargetProgress() }}% Complete</span>
                    </div>
                    <div class="metric">
                      <span class="metric-label">Commission Earned</span>
                      <div class="metric-value">₹{{ getTotalCommission() | number:'1.0-0' }}</div>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <!-- Lead Management -->
        <mat-tab label="Lead Management">
          <div class="tab-content">
            <div class="section-header">
              <h2>Lead Management</h2>
              <button mat-raised-button color="primary" (click)="openLeadDialog()">
                <mat-icon>add</mat-icon>
                Add Lead
              </button>
            </div>

            <mat-card>
              <mat-card-content>
                <table mat-table [dataSource]="leads" class="leads-table">
                  <ng-container matColumnDef="name">
                    <th mat-header-cell *matHeaderCellDef>Name</th>
                    <td mat-cell *matCellDef="let lead">{{ lead.name }}</td>
                  </ng-container>

                  <ng-container matColumnDef="email">
                    <th mat-header-cell *matHeaderCellDef>Email</th>
                    <td mat-cell *matCellDef="let lead">{{ lead.email }}</td>
                  </ng-container>

                  <ng-container matColumnDef="phone">
                    <th mat-header-cell *matHeaderCellDef>Phone</th>
                    <td mat-cell *matCellDef="let lead">{{ lead.phone }}</td>
                  </ng-container>

                  <ng-container matColumnDef="source">
                    <th mat-header-cell *matHeaderCellDef>Source</th>
                    <td mat-cell *matCellDef="let lead">
                      <mat-chip>{{ lead.source | titlecase }}</mat-chip>
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="status">
                    <th mat-header-cell *matHeaderCellDef>Status</th>
                    <td mat-cell *matCellDef="let lead">
                      <mat-chip [color]="getLeadStatusColor(lead.status)">
                        {{ lead.status | titlecase }}
                      </mat-chip>
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="interestedProperty">
                    <th mat-header-cell *matHeaderCellDef>Interested Property</th>
                    <td mat-cell *matCellDef="let lead">{{ lead.interestedProperty }}</td>
                  </ng-container>

                  <ng-container matColumnDef="budget">
                    <th mat-header-cell *matHeaderCellDef>Budget</th>
                    <td mat-cell *matCellDef="let lead">₹{{ lead.budget | number:'1.0-0' }}</td>
                  </ng-container>

                  <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef>Actions</th>
                    <td mat-cell *matCellDef="let lead">
                      <button mat-icon-button (click)="editLead(lead)">
                        <mat-icon>edit</mat-icon>
                      </button>
                      <button mat-icon-button color="primary" (click)="convertToDeal(lead)">
                        <mat-icon>trending_up</mat-icon>
                      </button>
                      <button mat-icon-button (click)="callLead(lead)">
                        <mat-icon>phone</mat-icon>
                      </button>
                    </td>
                  </ng-container>

                  <tr mat-header-row *matHeaderRowDef="leadColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: leadColumns;"></tr>
                </table>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- Deal Management -->
        <mat-tab label="Deal Management">
          <div class="tab-content">
            <div class="section-header">
              <h2>Deal Management</h2>
              <button mat-raised-button color="primary" (click)="openDealDialog()">
                <mat-icon>add</mat-icon>
                Create Deal
              </button>
            </div>

            <mat-card>
              <mat-card-content>
                <table mat-table [dataSource]="deals" class="deals-table">
                  <ng-container matColumnDef="customerName">
                    <th mat-header-cell *matHeaderCellDef>Customer</th>
                    <td mat-cell *matCellDef="let deal">{{ deal.customerName }}</td>
                  </ng-container>

                  <ng-container matColumnDef="dealValue">
                    <th mat-header-cell *matHeaderCellDef>Deal Value</th>
                    <td mat-cell *matCellDef="let deal">₹{{ deal.dealValue | number:'1.0-0' }}</td>
                  </ng-container>

                  <ng-container matColumnDef="status">
                    <th mat-header-cell *matHeaderCellDef>Status</th>
                    <td mat-cell *matCellDef="let deal">
                      <mat-chip [color]="getDealStatusColor(deal.status)">
                        {{ deal.status | titlecase }}
                      </mat-chip>
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="commission">
                    <th mat-header-cell *matHeaderCellDef>Commission</th>
                    <td mat-cell *matCellDef="let deal">₹{{ deal.commission | number:'1.0-0' }}</td>
                  </ng-container>

                  <ng-container matColumnDef="createdAt">
                    <th mat-header-cell *matHeaderCellDef>Created</th>
                    <td mat-cell *matCellDef="let deal">{{ deal.createdAt | date:'short' }}</td>
                  </ng-container>

                  <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef>Actions</th>
                    <td mat-cell *matCellDef="let deal">
                      <button mat-icon-button (click)="viewDeal(deal)">
                        <mat-icon>visibility</mat-icon>
                      </button>
                      <button mat-icon-button (click)="editDeal(deal)">
                        <mat-icon>edit</mat-icon>
                      </button>
                      <button mat-icon-button (click)="generateContract(deal)">
                        <mat-icon>description</mat-icon>
                      </button>
                    </td>
                  </ng-container>

                  <tr mat-header-row *matHeaderRowDef="dealColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: dealColumns;"></tr>
                </table>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- Customer Management -->
        <mat-tab label="Customer Management">
          <div class="tab-content">
            <div class="section-header">
              <h2>Customer Database</h2>
              <button mat-raised-button color="primary" (click)="addCustomer()">
                <mat-icon>person_add</mat-icon>
                Add Customer
              </button>
            </div>

            <div class="customer-grid">
              <mat-card *ngFor="let lead of getCustomers()" class="customer-card">
                <mat-card-header>
                  <mat-card-title>{{ lead.name }}</mat-card-title>
                  <mat-card-subtitle>{{ lead.email }}</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <div class="customer-info">
                    <div class="info-item">
                      <mat-icon>phone</mat-icon>
                      <span>{{ lead.phone }}</span>
                    </div>
                    <div class="info-item">
                      <mat-icon>home</mat-icon>
                      <span>{{ lead.interestedProperty }}</span>
                    </div>
                    <div class="info-item">
                      <mat-icon>attach_money</mat-icon>
                      <span>₹{{ lead.budget | number:'1.0-0' }}</span>
                    </div>
                  </div>
                </mat-card-content>
                <mat-card-actions>
                  <button mat-button (click)="contactCustomer(lead)">
                    <mat-icon>phone</mat-icon>
                    Contact
                  </button>
                  <button mat-button (click)="viewCustomerHistory(lead)">
                    <mat-icon>history</mat-icon>
                    History
                  </button>
                </mat-card-actions>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <!-- Sales Reports -->
        <mat-tab label="Sales Reports">
          <div class="tab-content">
            <div class="reports-section">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>Performance Summary</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="report-stats">
                    <div class="report-stat">
                      <div class="stat-value">{{ leads.length }}</div>
                      <div class="stat-label">Total Leads Generated</div>
                    </div>
                    <div class="report-stat">
                      <div class="stat-value">{{ getConvertedLeads() }}</div>
                      <div class="stat-label">Leads Converted</div>
                    </div>
                    <div class="report-stat">
                      <div class="stat-value">₹{{ getTotalRevenue() | number:'1.0-0' }}</div>
                      <div class="stat-label">Total Revenue</div>
                    </div>
                    <div class="report-stat">
                      <div class="stat-value">₹{{ getTotalCommission() | number:'1.0-0' }}</div>
                      <div class="stat-label">Commission Earned</div>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>

              <mat-card>
                <mat-card-header>
                  <mat-card-title>Lead Sources</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="source-breakdown">
                    <div class="source-item" *ngFor="let source of getLeadSources()">
                      <span class="source-name">{{ source.name | titlecase }}</span>
                      <span class="source-count">{{ source.count }}</span>
                      <mat-progress-bar 
                        mode="determinate" 
                        [value]="(source.count / leads.length) * 100">
                      </mat-progress-bar>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .associate-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .header {
      background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
      color: white;
      padding: 30px;
      border-radius: 12px;
      margin-bottom: 30px;
      text-align: center;
    }

    .header h1 {
      margin: 0 0 10px 0;
      font-size: 2.5em;
      font-weight: 300;
    }

    .tab-content {
      padding: 20px 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .stat-card {
      text-align: center;
    }

    .stat-card mat-card-header {
      justify-content: center;
      align-items: center;
      gap: 10px;
    }

    .stat-number {
      font-size: 3em;
      font-weight: bold;
      color: #4CAF50;
      margin: 10px 0;
    }

    .stat-label {
      color: #666;
      font-size: 0.9em;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .leads-table, .deals-table {
      width: 100%;
    }

    .customer-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .customer-card {
      height: fit-content;
    }

    .customer-info {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .performance-metrics {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .metric {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .metric-label {
      font-weight: 500;
      color: #666;
    }

    .metric-value {
      font-size: 1.2em;
      font-weight: bold;
      color: #4CAF50;
    }

    .report-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      text-align: center;
    }

    .report-stat {
      padding: 20px;
      border: 1px solid #eee;
      border-radius: 8px;
    }

    .source-breakdown {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .source-item {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .source-name {
      font-weight: 500;
    }

    .source-count {
      font-size: 0.9em;
      color: #666;
    }

    mat-chip {
      font-size: 0.8em;
    }
  `]
})
export class AssociateComponent implements OnInit {
  leads: Lead[] = [];
  deals: Deal[] = [];
  properties: Property[] = [];
  
  leadColumns = ['name', 'email', 'phone', 'source', 'status', 'interestedProperty', 'budget', 'actions'];
  dealColumns = ['customerName', 'dealValue', 'status', 'commission', 'createdAt', 'actions'];

  constructor(
    private salesService: SalesService,
    private propertyService: PropertyService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.salesService.getLeads().subscribe(leads => this.leads = leads);
    this.salesService.getDeals().subscribe(deals => this.deals = deals);
    this.propertyService.getProperties().subscribe(properties => this.properties = properties);
  }

  getConversionRate(): number {
    if (this.leads.length === 0) return 0;
    const convertedLeads = this.leads.filter(lead => lead.status === 'converted').length;
    return Math.round((convertedLeads / this.leads.length) * 100);
  }

  getTotalRevenue(): number {
    return this.deals.reduce((total, deal) => total + deal.dealValue, 0);
  }

  getTotalCommission(): number {
    return this.deals.reduce((total, deal) => total + deal.commission, 0);
  }

  getTargetProgress(): number {
    const monthlyTarget = 10000000; // 1 Crore target
    const currentRevenue = this.getTotalRevenue();
    return Math.min((currentRevenue / monthlyTarget) * 100, 100);
  }

  getLeadStatusColor(status: string): string {
    switch (status) {
      case 'new': return 'primary';
      case 'contacted': return 'accent';
      case 'qualified': return 'warn';
      case 'converted': return 'primary';
      case 'lost': return '';
      default: return '';
    }
  }

  getDealStatusColor(status: string): string {
    switch (status) {
      case 'negotiation': return 'warn';
      case 'agreement': return 'primary';
      case 'payment-pending': return 'accent';
      case 'completed': return 'primary';
      case 'cancelled': return '';
      default: return '';
    }
  }

  getCustomers(): Lead[] {
    return this.leads.filter(lead => lead.status === 'converted' || lead.status === 'qualified');
  }

  getConvertedLeads(): number {
    return this.leads.filter(lead => lead.status === 'converted').length;
  }

  getLeadSources() {
    const sources = this.leads.reduce((acc, lead) => {
      acc[lead.source] = (acc[lead.source] || 0) + 1;
      return acc;
    }, {} as any);

    return Object.keys(sources).map(key => ({
      name: key,
      count: sources[key]
    }));
  }

  openLeadDialog() {
    this.snackBar.open('Lead creation dialog would open here', 'Close', { duration: 3000 });
  }

  openDealDialog() {
    this.snackBar.open('Deal creation dialog would open here', 'Close', { duration: 3000 });
  }

  editLead(lead: Lead) {
    this.snackBar.open(`Edit lead: ${lead.name}`, 'Close', { duration: 3000 });
  }

  convertToDeal(lead: Lead) {
    this.snackBar.open(`Convert ${lead.name} to deal`, 'Close', { duration: 3000 });
  }

  callLead(lead: Lead) {
    this.snackBar.open(`Calling ${lead.name} at ${lead.phone}`, 'Close', { duration: 3000 });
  }

  viewDeal(deal: Deal) {
    this.snackBar.open(`View deal details for ${deal.customerName}`, 'Close', { duration: 3000 });
  }

  editDeal(deal: Deal) {
    this.snackBar.open(`Edit deal for ${deal.customerName}`, 'Close', { duration: 3000 });
  }

  generateContract(deal: Deal) {
    this.snackBar.open(`Generate contract for ${deal.customerName}`, 'Close', { duration: 3000 });
  }

  addCustomer() {
    this.snackBar.open('Add customer dialog would open here', 'Close', { duration: 3000 });
  }

  contactCustomer(customer: Lead) {
    this.snackBar.open(`Contact ${customer.name}`, 'Close', { duration: 3000 });
  }

  viewCustomerHistory(customer: Lead) {
    this.snackBar.open(`View history for ${customer.name}`, 'Close', { duration: 3000 });
  }
}
