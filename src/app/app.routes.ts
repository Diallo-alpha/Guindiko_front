import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AccueilComponent } from './components/accueil/accueil.component';

export const routes: Routes = [
  {path: 'navbar', component:NavbarComponent},
  {path: '', component:AccueilComponent}
];
