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
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';

import { PropertyService } from '../../services/property.service';
import { Property, Plot } from '../../models/property.model';

@Component({
  selector: 'app-schemes',
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
    MatGridListModule,
    MatExpansionModule,
    MatBadgeModule
  ],
  template: `
    <div class="schemes-container">
      <div class="header">
        <h1>Property Schemes & Plots</h1>
        <p>Manage residential, commercial, and office properties with detailed plot information</p>
      </div>

      <mat-tab-group>
        <!-- Properties Overview -->
        <mat-tab label="Properties Overview">
          <div class="tab-content">
            <div class="section-header">
              <h2>All Properties</h2>
              <button mat-raised-button color="primary" (click)="addProperty()">
                <mat-icon>add</mat-icon>
                Add Property
              </button>
            </div>

            <div class="properties-grid">
              <mat-card *ngFor="let property of properties" class="property-card">
                <mat-card-header>
                  <mat-card-title>{{ property.name }}</mat-card-title>
                  <mat-card-subtitle>
                    <mat-chip [color]="getPropertyTypeColor(property.type)">
                      {{ property.type | titlecase }}
                    </mat-chip>
                  </mat-card-subtitle>
                </mat-card-header>
                
                <mat-card-content>
                  <div class="property-info">
                    <div class="info-row">
                      <mat-icon>location_on</mat-icon>
                      <span>{{ property.location }}</span>
                    </div>
                    <div class="info-row">
                      <mat-icon>home</mat-icon>
                      <span>{{ property.availablePlots }}/{{ property.totalPlots }} plots available</span>
                    </div>
                    <div class="info-row">
                      <mat-icon>attach_money</mat-icon>
                      <span>₹{{ property.pricePerSqFt }}/sq ft</span>
                    </div>
                    <div class="info-row">
                      <mat-icon>check_circle</mat-icon>
                      <mat-chip [color]="property.status === 'active' ? 'primary' : 'warn'">
                        {{ property.status | titlecase }}
                      </mat-chip>
                    </div>
                  </div>

                  <div class="amenities-section">
                    <h4>Amenities</h4>
                    <div class="amenities-list">
                      <mat-chip *ngFor="let amenity of property.amenities.slice(0, 3)">
                        {{ amenity }}
                      </mat-chip>
                      <mat-chip *ngIf="property.amenities.length > 3" 
                               [matBadge]="property.amenities.length - 3" 
                               matBadgeColor="accent">
                        +More
                      </mat-chip>
                    </div>
                  </div>
                </mat-card-content>

                <mat-card-actions>
                  <button mat-button (click)="viewProperty(property)">
                    <mat-icon>visibility</mat-icon>
                    View Details
                  </button>
                  <button mat-button (click)="viewPlots(property)">
                    <mat-icon>grid_view</mat-icon>
                    View Plots
                  </button>
                  <button mat-button (click)="editProperty(property)">
                    <mat-icon>edit</mat-icon>
                    Edit
                  </button>
                </mat-card-actions>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <!-- Residential Properties -->
        <mat-tab label="Residential">
          <div class="tab-content">
            <div class="section-header">
              <h2>Residential Properties</h2>
              <div class="filter-section">
                <mat-form-field appearance="outline">
                  <mat-label>Filter by Status</mat-label>
                  <mat-select [(value)]="residentialFilter" (selectionChange)="filterResidential()">
                    <mat-option value="all">All</mat-option>
                    <mat-option value="active">Active</mat-option>
                    <mat-option value="sold-out">Sold Out</mat-option>
                    <mat-option value="upcoming">Upcoming</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
            </div>

            <div class="property-details-grid">
              <mat-expansion-panel *ngFor="let property of getResidentialProperties()" class="property-panel">
                <mat-expansion-panel-header>
                  <mat-panel-title>
                    {{ property.name }}
                  </mat-panel-title>
                  <mat-panel-description>
                    {{ property.location }} • {{ property.availablePlots }} plots available
                  </mat-panel-description>
                </mat-expansion-panel-header>

                <div class="property-expanded-content">
                  <div class="property-stats">
                    <div class="stat-item">
                      <span class="stat-label">Total Plots</span>
                      <span class="stat-value">{{ property.totalPlots }}</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-label">Available</span>
                      <span class="stat-value">{{ property.availablePlots }}</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-label">Price/Sq Ft</span>
                      <span class="stat-value">₹{{ property.pricePerSqFt }}</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-label">Occupancy</span>
                      <span class="stat-value">{{ getOccupancyRate(property) }}%</span>
                    </div>
                  </div>

                  <div class="property-description">
                    <h4>Description</h4>
                    <p>{{ property.description }}</p>
                  </div>

                  <div class="amenities-full">
                    <h4>All Amenities</h4>
                    <div class="amenities-grid">
                      <mat-chip *ngFor="let amenity of property.amenities">{{ amenity }}</mat-chip>
                    </div>
                  </div>

                  <div class="action-buttons">
                    <button mat-stroked-button (click)="managePlots(property)">
                      <mat-icon>grid_view</mat-icon>
                      Manage Plots
                    </button>
                    <button mat-stroked-button (click)="viewAnalytics(property)">
                      <mat-icon>analytics</mat-icon>
                      Analytics
                    </button>
                    <button mat-stroked-button (click)="generateBrochure(property)">
                      <mat-icon>picture_as_pdf</mat-icon>
                      Brochure
                    </button>
                  </div>
                </div>
              </mat-expansion-panel>
            </div>
          </div>
        </mat-tab>

        <!-- Commercial Properties -->
        <mat-tab label="Commercial">
          <div class="tab-content">
            <div class="section-header">
              <h2>Commercial Properties</h2>
              <button mat-raised-button color="accent" (click)="addCommercialProperty()">
                <mat-icon>business</mat-icon>
                Add Commercial Property
              </button>
            </div>

            <div class="commercial-properties">
              <mat-card *ngFor="let property of getCommercialProperties()" class="commercial-card">
                <mat-card-header>
                  <mat-card-title>{{ property.name }}</mat-card-title>
                  <mat-card-subtitle>{{ property.location }}</mat-card-subtitle>
                </mat-card-header>

                <mat-card-content>
                  <div class="commercial-metrics">
                    <div class="metric-row">
                      <div class="metric">
                        <span class="metric-label">Total Area</span>
                        <span class="metric-value">{{ getTotalArea(property) }} sq ft</span>
                      </div>
                      <div class="metric">
                        <span class="metric-label">Available Units</span>
                        <span class="metric-value">{{ property.availablePlots }}</span>
                      </div>
                    </div>
                    <div class="metric-row">
                      <div class="metric">
                        <span class="metric-label">Rental Rate</span>
                        <span class="metric-value">₹{{ property.pricePerSqFt }}/sq ft</span>
                      </div>
                      <div class="metric">
                        <span class="metric-label">Occupancy</span>
                        <span class="metric-value">{{ getOccupancyRate(property) }}%</span>
                      </div>
                    </div>
                  </div>

                  <div class="business-amenities">
                    <h4>Business Amenities</h4>
                    <div class="amenities-list">
                      <mat-chip *ngFor="let amenity of property.amenities">{{ amenity }}</mat-chip>
                    </div>
                  </div>
                </mat-card-content>

                <mat-card-actions>
                  <button mat-button color="primary" (click)="viewCommercialDetails(property)">
                    View Details
                  </button>
                  <button mat-button (click)="manageLeases(property)">
                    Manage Leases
                  </button>
                </mat-card-actions>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <!-- Office Properties -->
        <mat-tab label="Office Spaces">
          <div class="tab-content">
            <div class="section-header">
              <h2>Office Properties</h2>
              <button mat-raised-button color="warn" (click)="addOfficeProperty()">
                <mat-icon>corporate_fare</mat-icon>
                Add Office Property
              </button>
            </div>

            <div class="office-properties">
              <div class="office-grid">
                <mat-card *ngFor="let property of getOfficeProperties()" class="office-card">
                  <mat-card-header>
                    <mat-card-title>{{ property.name }}</mat-card-title>
                    <mat-card-subtitle>{{ property.location }}</mat-card-subtitle>
                  </mat-card-header>

                  <mat-card-content>
                    <div class="office-features">
                      <div class="feature-item">
                        <mat-icon>business_center</mat-icon>
                        <span>{{ property.totalPlots }} Office Units</span>
                      </div>
                      <div class="feature-item">
                        <mat-icon>wifi</mat-icon>
                        <span>High-Speed Internet</span>
                      </div>
                      <div class="feature-item">
                        <mat-icon>local_parking</mat-icon>
                        <span>Dedicated Parking</span>
                      </div>
                      <div class="feature-item">
                        <mat-icon>security</mat-icon>
                        <span>24/7 Security</span>
                      </div>
                    </div>

                    <div class="office-pricing">
                      <div class="pricing-info">
                        <span class="price">₹{{ property.pricePerSqFt }}/sq ft</span>
                        <span class="price-label">Monthly Rent</span>
                      </div>
                    </div>
                  </mat-card-content>

                  <mat-card-actions>
                    <button mat-button (click)="viewOfficeLayout(property)">
                      <mat-icon>floor_plan</mat-icon>
                      Floor Plan
                    </button>
                    <button mat-button (click)="scheduleVisit(property)">
                      <mat-icon>event</mat-icon>
                      Schedule Visit
                    </button>
                  </mat-card-actions>
                </mat-card>
              </div>
            </div>
          </div>
        </mat-tab>

        <!-- Plot Management -->
        <mat-tab label="Plot Management">
          <div class="tab-content">
            <div class="section-header">
              <h2>Individual Plot Management</h2>
              <div class="plot-filters">
                <mat-form-field appearance="outline">
                  <mat-label>Select Property</mat-label>
                  <mat-select [(value)]="selectedPropertyId" (selectionChange)="loadPlots()">
                    <mat-option *ngFor="let property of properties" [value]="property.id">
                      {{ property.name }}
                    </mat-option>
                  </mat-select>
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Filter by Status</mat-label>
                  <mat-select [(value)]="plotStatusFilter">
                    <mat-option value="all">All Plots</mat-option>
                    <mat-option value="available">Available</mat-option>
                    <mat-option value="booked">Booked</mat-option>
                    <mat-option value="sold">Sold</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
            </div>

            <div class="plots-section" *ngIf="selectedPropertyId">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>Plot Details</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <table mat-table [dataSource]="getFilteredPlots()" class="plots-table">
                    <ng-container matColumnDef="plotNumber">
                      <th mat-header-cell *matHeaderCellDef>Plot Number</th>
                      <td mat-cell *matCellDef="let plot">{{ plot.plotNumber }}</td>
                    </ng-container>

                    <ng-container matColumnDef="area">
                      <th mat-header-cell *matHeaderCellDef>Area (sq ft)</th>
                      <td mat-cell *matCellDef="let plot">{{ plot.area }}</td>
                    </ng-container>

                    <ng-container matColumnDef="dimensions">
                      <th mat-header-cell *matHeaderCellDef>Dimensions</th>
                      <td mat-cell *matCellDef="let plot">{{ plot.dimensions }}</td>
                    </ng-container>

                    <ng-container matColumnDef="facing">
                      <th mat-header-cell *matHeaderCellDef>Facing</th>
                      <td mat-cell *matCellDef="let plot">{{ plot.facing | titlecase }}</td>
                    </ng-container>

                    <ng-container matColumnDef="price">
                      <th mat-header-cell *matHeaderCellDef>Price</th>
                      <td mat-cell *matCellDef="let plot">₹{{ plot.price | number:'1.0-0' }}</td>
                    </ng-container>

                    <ng-container matColumnDef="status">
                      <th mat-header-cell *matHeaderCellDef>Status</th>
                      <td mat-cell *matCellDef="let plot">
                        <mat-chip [color]="getPlotStatusColor(plot.status)">
                          {{ plot.status | titlecase }}
                        </mat-chip>
                      </td>
                    </ng-container>

                    <ng-container matColumnDef="corner">
                      <th mat-header-cell *matHeaderCellDef>Corner</th>
                      <td mat-cell *matCellDef="let plot">
                        <mat-icon *ngIf="plot.corner" color="primary">check_circle</mat-icon>
                        <mat-icon *ngIf="!plot.corner" color="disabled">remove_circle</mat-icon>
                      </td>
                    </ng-container>

                    <ng-container matColumnDef="actions">
                      <th mat-header-cell *matHeaderCellDef>Actions</th>
                      <td mat-cell *matCellDef="let plot">
                        <button mat-icon-button (click)="editPlot(plot)">
                          <mat-icon>edit</mat-icon>
                        </button>
                        <button mat-icon-button (click)="viewPlotDetails(plot)">
                          <mat-icon>visibility</mat-icon>
                        </button>
                        <button mat-icon-button *ngIf="plot.status === 'available'" (click)="bookPlot(plot)">
                          <mat-icon>book_online</mat-icon>
                        </button>
                      </td>
                    </ng-container>

                    <tr mat-header-row *matHeaderRowDef="plotColumns"></tr>
                    <tr mat-row *matRowDef="let row; columns: plotColumns;"></tr>
                  </table>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .schemes-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .header {
      background: linear-gradient(135deg, #FF9800 0%, #F57C00 100%);
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

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      flex-wrap: wrap;
      gap: 15px;
    }

    .properties-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 20px;
    }

    .property-card {
      height: fit-content;
    }

    .property-info {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 15px;
    }

    .info-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .amenities-section {
      margin-top: 15px;
    }

    .amenities-section h4 {
      margin: 0 0 10px 0;
      font-size: 1em;
      color: #666;
    }

    .amenities-list {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }

    .filter-section {
      display: flex;
      gap: 15px;
    }

    .property-panel {
      margin-bottom: 15px;
    }

    .property-expanded-content {
      padding: 15px 0;
    }

    .property-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 15px;
      margin-bottom: 20px;
    }

    .stat-item {
      text-align: center;
      padding: 15px;
      background: #f5f5f5;
      border-radius: 8px;
    }

    .stat-label {
      display: block;
      font-size: 0.8em;
      color: #666;
      margin-bottom: 5px;
    }

    .stat-value {
      display: block;
      font-size: 1.2em;
      font-weight: bold;
      color: #FF9800;
    }

    .property-description {
      margin-bottom: 20px;
    }

    .amenities-full h4 {
      margin-bottom: 10px;
    }

    .amenities-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .action-buttons {
      display: flex;
      gap: 10px;
      margin-top: 20px;
      flex-wrap: wrap;
    }

    .commercial-properties {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 20px;
    }

    .commercial-card {
      height: fit-content;
    }

    .commercial-metrics {
      margin-bottom: 20px;
    }

    .metric-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
    }

    .metric {
      text-align: center;
      flex: 1;
    }

    .metric-label {
      display: block;
      font-size: 0.8em;
      color: #666;
      margin-bottom: 5px;
    }

    .metric-value {
      display: block;
      font-size: 1.1em;
      font-weight: bold;
      color: #4CAF50;
    }

    .business-amenities h4 {
      margin-bottom: 10px;
    }

    .office-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .office-card {
      height: fit-content;
    }

    .office-features {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
    }

    .feature-item {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .office-pricing {
      text-align: center;
      padding: 15px;
      background: #f5f5f5;
      border-radius: 8px;
    }

    .price {
      display: block;
      font-size: 1.5em;
      font-weight: bold;
      color: #FF5722;
    }

    .price-label {
      font-size: 0.9em;
      color: #666;
    }

    .plot-filters {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }

    .plots-table {
      width: 100%;
    }

    mat-chip {
      font-size: 0.8em;
    }

    .plot-filters mat-form-field {
      min-width: 200px;
    }
  `]
})
export class SchemesComponent implements OnInit {
  properties: Property[] = [];
  plots: Plot[] = [];
  selectedPropertyId: number | null = null;
  residentialFilter = 'all';
  plotStatusFilter = 'all';
  
  plotColumns = ['plotNumber', 'area', 'dimensions', 'facing', 'price', 'status', 'corner', 'actions'];

  constructor(
    private propertyService: PropertyService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.propertyService.getProperties().subscribe(properties => {
      this.properties = properties;
      if (properties.length > 0) {
        this.selectedPropertyId = properties[0].id;
        this.loadPlots();
      }
    });
  }

  loadPlots() {
    if (this.selectedPropertyId) {
      this.propertyService.getPlotsByProperty(this.selectedPropertyId).subscribe(plots => {
        this.plots = plots;
      });
    }
  }

  getPropertyTypeColor(type: string): string {
    switch (type) {
      case 'residential': return 'primary';
      case 'commercial': return 'accent';
      case 'office': return 'warn';
      case 'industrial': return '';
      default: return '';
    }
  }

  getResidentialProperties(): Property[] {
    let filtered = this.properties.filter(p => p.type === 'residential');
    if (this.residentialFilter !== 'all') {
      filtered = filtered.filter(p => p.status === this.residentialFilter);
    }
    return filtered;
  }

  getCommercialProperties(): Property[] {
    return this.properties.filter(p => p.type === 'commercial');
  }

  getOfficeProperties(): Property[] {
    return this.properties.filter(p => p.type === 'office');
  }

  getOccupancyRate(property: Property): number {
    const occupiedPlots = property.totalPlots - property.availablePlots;
    return Math.round((occupiedPlots / property.totalPlots) * 100);
  }

  getTotalArea(property: Property): number {
    // Mock calculation - in real app, this would sum up all plot areas
    return property.totalPlots * 1200; // Assuming average 1200 sq ft per plot
  }

  getFilteredPlots(): Plot[] {
    if (this.plotStatusFilter === 'all') {
      return this.plots;
    }
    return this.plots.filter(plot => plot.status === this.plotStatusFilter);
  }

  getPlotStatusColor(status: string): string {
    switch (status) {
      case 'available': return 'primary';
      case 'booked': return 'accent';
      case 'sold': return 'warn';
      default: return '';
    }
  }

  filterResidential() {
    // Filter is applied in getResidentialProperties()
  }

  addProperty() {
    this.snackBar.open('Add property dialog would open here', 'Close', { duration: 3000 });
  }

  addCommercialProperty() {
    this.snackBar.open('Add commercial property dialog would open here', 'Close', { duration: 3000 });
  }

  addOfficeProperty() {
    this.snackBar.open('Add office property dialog would open here', 'Close', { duration: 3000 });
  }

  viewProperty(property: Property) {
    this.snackBar.open(`View details for ${property.name}`, 'Close', { duration: 3000 });
  }

  viewPlots(property: Property) {
    this.selectedPropertyId = property.id;
    this.loadPlots();
    this.snackBar.open(`Viewing plots for ${property.name}`, 'Close', { duration: 3000 });
  }

  editProperty(property: Property) {
    this.snackBar.open(`Edit ${property.name}`, 'Close', { duration: 3000 });
  }

  managePlots(property: Property) {
    this.snackBar.open(`Manage plots for ${property.name}`, 'Close', { duration: 3000 });
  }

  viewAnalytics(property: Property) {
    this.snackBar.open(`View analytics for ${property.name}`, 'Close', { duration: 3000 });
  }

  generateBrochure(property: Property) {
    this.snackBar.open(`Generate brochure for ${property.name}`, 'Close', { duration: 3000 });
  }

  viewCommercialDetails(property: Property) {
    this.snackBar.open(`View commercial details for ${property.name}`, 'Close', { duration: 3000 });
  }

  manageLeases(property: Property) {
    this.snackBar.open(`Manage leases for ${property.name}`, 'Close', { duration: 3000 });
  }

  viewOfficeLayout(property: Property) {
    this.snackBar.open(`View floor plan for ${property.name}`, 'Close', { duration: 3000 });
  }

  scheduleVisit(property: Property) {
    this.snackBar.open(`Schedule visit for ${property.name}`, 'Close', { duration: 3000 });
  }

  editPlot(plot: Plot) {
    this.snackBar.open(`Edit plot ${plot.plotNumber}`, 'Close', { duration: 3000 });
  }

  viewPlotDetails(plot: Plot) {
    this.snackBar.open(`View details for plot ${plot.plotNumber}`, 'Close', { duration: 3000 });
  }

  bookPlot(plot: Plot) {
    this.snackBar.open(`Book plot ${plot.plotNumber}`, 'Close', { duration: 3000 });
  }
}
