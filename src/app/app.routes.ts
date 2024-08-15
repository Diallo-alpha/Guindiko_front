import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { FormationComponent } from './components/formation/formation.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { MenteurComponent } from './components/menteur/menteur.component';
import { DetailsArticleComponent } from './components/details-article/details-article.component';
import { ProfilMentorComponent } from './components/mentor/profil-mentor/profil-mentor.component';
import { SessionMentorComponent } from './components/mentor/session-mentor/session-mentor.component';
import { ArticleMentorComponent } from './components/mentor/article-mentor/article-mentor.component';
import { AbonnerMentorComponent } from './components/mentor/abonner-mentor/abonner-mentor.component';

export const routes: Routes = [
  {path: 'navbar', component:NavbarComponent},
  {path: '', component:AccueilComponent},
  {path: 'formations', component:FormationComponent},
  {path: 'article', component:ArticlesComponent},
  {path: 'mentor', component:MenteurComponent}, 
  {path: 'details-article', component:DetailsArticleComponent},
  {path: 'profile', component:ProfilMentorComponent},
  {path: 'session', component:SessionMentorComponent},
  {path: 'article/mentor', component:ArticleMentorComponent},
  {path: 'abonner/mentore', component:AbonnerMentorComponent}
];
