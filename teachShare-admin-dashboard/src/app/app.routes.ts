import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { 
    path: 'users', 
    loadComponent: () => import('./components/users/users.component').then(m => m.UsersComponent)
  },
  { 
    path: 'files', 
    loadComponent: () => import('./components/files/files.component').then(m => m.FilesComponent)
  }
];