import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'admin', 
    loadComponent: () => import('./components/admin/admin.component').then(m => m.AdminComponent)
  },
  { 
    path: 'associate', 
    loadComponent: () => import('./components/associate/associate.component').then(m => m.AssociateComponent)
  },
  { 
    path: 'schemes', 
    loadComponent: () => import('./components/schemes/schemes.component').then(m => m.SchemesComponent)
  },
  { path: '**', redirectTo: '/login' }
];
