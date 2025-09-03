import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #drawer class="sidenav" fixedInViewport mode="side" opened>
        <mat-toolbar>PlotNet</mat-toolbar>
        <mat-nav-list>
          <a mat-list-item routerLink="/admin" routerLinkActive="active">
            <mat-icon>admin_panel_settings</mat-icon>
            <span>Admin Panel</span>
          </a>
          <a mat-list-item routerLink="/associate" routerLinkActive="active">
            <mat-icon>people</mat-icon>
            <span>Sales Management</span>
          </a>
          <a mat-list-item routerLink="/schemes" routerLinkActive="active">
            <mat-icon>location_city</mat-icon>
            <span>Property Schemes</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button
            type="button"
            aria-label="Toggle sidenav"
            mat-icon-button
            (click)="drawer.toggle()">
            <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
          </button>
          <span>PlotNet - Property Management System</span>
        </mat-toolbar>
        
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
    }

    .sidenav {
      width: 250px;
    }

    .sidenav .mat-toolbar {
      background: inherit;
      font-size: 18px;
      font-weight: 500;
    }

    .mat-toolbar.mat-primary {
      position: sticky;
      top: 0;
      z-index: 1;
    }

    .content {
      padding: 20px;
      min-height: calc(100vh - 64px);
    }

    .active {
      background-color: rgba(0, 0, 0, 0.04);
    }

    mat-nav-list a {
      display: flex;
      align-items: center;
      gap: 12px;
    }
  `]
})
export class AppComponent {
  title = 'plotnet-frontend';
}
