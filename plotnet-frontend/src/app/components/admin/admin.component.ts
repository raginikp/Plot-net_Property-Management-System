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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UserService } from '../../services/user.service';
import { PropertyService } from '../../services/property.service';
import { SalesService } from '../../services/sales.service';
import { User, CreateUserRequest } from '../../models/user.model';
import { Property } from '../../models/property.model';
import { Lead, Deal } from '../../models/sales.model';

@Component({
  selector: 'app-admin',
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
    MatProgressSpinnerModule
  ],
  template: `
    <div class="admin-container">
      <div class="header">
        <h1>Admin Dashboard</h1>
        <p>Manage users, monitor system performance, and oversee all operations</p>
      </div>

      <mat-tab-group>
        <!-- Dashboard Overview -->
        <mat-tab label="Dashboard">
          <div class="tab-content">
            <div class="stats-grid">
              <mat-card class="stat-card">
                <mat-card-header>
                  <mat-icon>people</mat-icon>
                  <mat-card-title>Total Users</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="stat-number">{{ users.length }}</div>
                  <div class="stat-label">Active Users</div>
                </mat-card-content>
              </mat-card>

              <mat-card class="stat-card">
                <mat-card-header>
                  <mat-icon>location_city</mat-icon>
                  <mat-card-title>Properties</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="stat-number">{{ properties.length }}</div>
                  <div class="stat-label">Active Properties</div>
                </mat-card-content>
              </mat-card>

              <mat-card class="stat-card">
                <mat-card-header>
                  <mat-icon>trending_up</mat-icon>
                  <mat-card-title>Leads</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="stat-number">{{ leads.length }}</div>
                  <div class="stat-label">Total Leads</div>
                </mat-card-content>
              </mat-card>

              <mat-card class="stat-card">
                <mat-card-header>
                  <mat-icon>attach_money</mat-icon>
                  <mat-card-title>Deals</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="stat-number">{{ deals.length }}</div>
                  <div class="stat-label">Active Deals</div>
                </mat-card-content>
              </mat-card>
            </div>

            <div class="charts-section">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>Recent Activity</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="activity-list">
                    <div class="activity-item" *ngFor="let activity of recentActivities">
                      <mat-icon>{{ activity.icon }}</mat-icon>
                      <div class="activity-content">
                        <div class="activity-title">{{ activity.title }}</div>
                        <div class="activity-time">{{ activity.time | date:'short' }}</div>
                      </div>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <!-- User Management -->
        <mat-tab label="User Management">
          <div class="tab-content">
            <div class="section-header">
              <h2>User Management</h2>
              <button mat-raised-button color="primary" (click)="openUserDialog()">
                <mat-icon>add</mat-icon>
                Add User
              </button>
            </div>

            <mat-card>
              <mat-card-content>
                <table mat-table [dataSource]="users" class="users-table">
                  <ng-container matColumnDef="name">
                    <th mat-header-cell *matHeaderCellDef>Name</th>
                    <td mat-cell *matCellDef="let user">{{ user.name }}</td>
                  </ng-container>

                  <ng-container matColumnDef="email">
                    <th mat-header-cell *matHeaderCellDef>Email</th>
                    <td mat-cell *matCellDef="let user">{{ user.email }}</td>
                  </ng-container>

                  <ng-container matColumnDef="role">
                    <th mat-header-cell *matHeaderCellDef>Role</th>
                    <td mat-cell *matCellDef="let user">
                      <mat-chip [color]="getRoleColor(user.role)">{{ user.role | titlecase }}</mat-chip>
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="status">
                    <th mat-header-cell *matHeaderCellDef>Status</th>
                    <td mat-cell *matCellDef="let user">
                      <mat-chip [color]="user.status === 'active' ? 'primary' : 'warn'">
                        {{ user.status | titlecase }}
                      </mat-chip>
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="lastLogin">
                    <th mat-header-cell *matHeaderCellDef>Last Login</th>
                    <td mat-cell *matCellDef="let user">
                      {{ user.lastLogin | date:'short' || 'Never' }}
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef>Actions</th>
                    <td mat-cell *matCellDef="let user">
                      <button mat-icon-button (click)="editUser(user)">
                        <mat-icon>edit</mat-icon>
                      </button>
                      <button mat-icon-button color="warn" (click)="deleteUser(user.id)">
                        <mat-icon>delete</mat-icon>
                      </button>
                    </td>
                  </ng-container>

                  <tr mat-header-row *matHeaderRowDef="userColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: userColumns;"></tr>
                </table>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- System Settings -->
        <mat-tab label="System Settings">
          <div class="tab-content">
            <div class="settings-grid">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>General Settings</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <form [formGroup]="settingsForm">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Company Name</mat-label>
                      <input matInput formControlName="companyName">
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Contact Email</mat-label>
                      <input matInput type="email" formControlName="contactEmail">
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Phone Number</mat-label>
                      <input matInput formControlName="phoneNumber">
                    </mat-form-field>

                    <button mat-raised-button color="primary" (click)="saveSettings()">
                      Save Settings
                    </button>
                  </form>
                </mat-card-content>
              </mat-card>

              <mat-card>
                <mat-card-header>
                  <mat-card-title>Security Settings</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="security-options">
                    <div class="security-item">
                      <span>Two-Factor Authentication</span>
                      <button mat-stroked-button>Configure</button>
                    </div>
                    <div class="security-item">
                      <span>Password Policy</span>
                      <button mat-stroked-button>Update</button>
                    </div>
                    <div class="security-item">
                      <span>Session Timeout</span>
                      <button mat-stroked-button>Configure</button>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <!-- Reports -->
        <mat-tab label="Reports">
          <div class="tab-content">
            <div class="reports-grid">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>Sales Reports</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="report-options">
                    <button mat-stroked-button>Monthly Sales</button>
                    <button mat-stroked-button>Quarterly Report</button>
                    <button mat-stroked-button>Annual Summary</button>
                  </div>
                </mat-card-content>
              </mat-card>

              <mat-card>
                <mat-card-header>
                  <mat-card-title>User Reports</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="report-options">
                    <button mat-stroked-button>User Activity</button>
                    <button mat-stroked-button>Login Statistics</button>
                    <button mat-stroked-button>Role Distribution</button>
                  </div>
                </mat-card-content>
              </mat-card>

              <mat-card>
                <mat-card-header>
                  <mat-card-title>Property Reports</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="report-options">
                    <button mat-stroked-button>Inventory Status</button>
                    <button mat-stroked-button>Price Analysis</button>
                    <button mat-stroked-button>Performance Metrics</button>
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
    .admin-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
      color: #667eea;
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

    .users-table {
      width: 100%;
    }

    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }

    .settings-grid, .reports-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .security-options, .report-options {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .security-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }

    .activity-list {
      max-height: 300px;
      overflow-y: auto;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 10px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .activity-content {
      flex: 1;
    }

    .activity-title {
      font-weight: 500;
      margin-bottom: 5px;
    }

    .activity-time {
      font-size: 0.8em;
      color: #666;
    }

    mat-chip {
      font-size: 0.8em;
    }
  `]
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  properties: Property[] = [];
  leads: Lead[] = [];
  deals: Deal[] = [];
  
  userColumns = ['name', 'email', 'role', 'status', 'lastLogin', 'actions'];
  
  settingsForm: FormGroup;
  
  recentActivities = [
    { icon: 'person_add', title: 'New user registered: Sarah Associate', time: new Date() },
    { icon: 'home', title: 'New property added: Corporate Office Complex', time: new Date(Date.now() - 3600000) },
    { icon: 'trending_up', title: 'Lead converted to deal: John Smith', time: new Date(Date.now() - 7200000) },
    { icon: 'payment', title: 'Payment received for Plot A-101', time: new Date(Date.now() - 10800000) }
  ];

  constructor(
    private userService: UserService,
    private propertyService: PropertyService,
    private salesService: SalesService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.settingsForm = this.fb.group({
      companyName: ['PlotNet Properties', Validators.required],
      contactEmail: ['admin@plotnet.com', [Validators.required, Validators.email]],
      phoneNumber: ['+1-800-PLOTNET', Validators.required]
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.userService.getUsers().subscribe(users => this.users = users);
    this.propertyService.getProperties().subscribe(properties => this.properties = properties);
    this.salesService.getLeads().subscribe(leads => this.leads = leads);
    this.salesService.getDeals().subscribe(deals => this.deals = deals);
  }

  getRoleColor(role: string): string {
    switch (role) {
      case 'admin': return 'warn';
      case 'associate': return 'primary';
      case 'customer': return 'accent';
      default: return '';
    }
  }

  openUserDialog() {
    // Implementation for user dialog would go here
    this.snackBar.open('User dialog would open here', 'Close', { duration: 3000 });
  }

  editUser(user: User) {
    this.snackBar.open(`Edit user: ${user.name}`, 'Close', { duration: 3000 });
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.loadData();
        this.snackBar.open('User deleted successfully', 'Close', { duration: 3000 });
      });
    }
  }

  saveSettings() {
    if (this.settingsForm.valid) {
      this.snackBar.open('Settings saved successfully', 'Close', { duration: 3000 });
    }
  }
}
