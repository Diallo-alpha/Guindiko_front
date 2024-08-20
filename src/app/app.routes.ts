import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: 'dashboard', component: DashboardComponent },
];
