import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { FormationComponent } from './components/formation/formation.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { MenteurComponent } from './components/menteur/menteur.component';
import { DetailsArticleComponent } from './components/details-article/details-article.component';

export const routes: Routes = [
  {path: 'navbar', component:NavbarComponent},
  {path: '', component:AccueilComponent},
  {path: 'formations', component:FormationComponent},
  {path: 'article', component:ArticlesComponent},
  {path: 'mentor', component:MenteurComponent},
  {path: 'details-article', component:DetailsArticleComponent}
];
