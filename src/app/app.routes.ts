import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
<<<<<<< HEAD
import { AccueilComponent } from './components/accueil/accueil.component';
import { FormationComponent } from './components/formation/formation.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { MenteurComponent } from './components/menteur/menteur.component';
import { DetailsArticleComponent } from './components/details-article/details-article.component';
import { ProfilMentorComponent } from './components/mentor/profil-mentor/profil-mentor.component';
import { SessionMentorComponent } from './components/mentor/session-mentor/session-mentor.component';
import { ArticleMentorComponent } from './components/mentor/article-mentor/article-mentor.component';
import { AbonnerMentorComponent } from './components/mentor/abonner-mentor/abonner-mentor.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { SidebarComponent } from './components/dashboard-mentor/sidebar/sidebar.component';
import { SessionComponent } from './components/dashboard-mentor/session/session.component';
import { CreerSessionComponent } from './components/dashboard-mentor/creer-session/creer-session.component';
import { CreerArticleComponent } from './components/dashboard-mentor/creer-article/creer-article.component';
import { DashboardComponent } from './components/dashboard-mentor/dashboard/dashboard.component';
import { AbonnerComponent } from './components/dashboard-mentor/abonner/abonner.component';
import { DashArticleComponent } from './components/dashboard-mentor/dash-article/dash-article.component';
import { DetailFormationComponent } from './components/detail-formation/detail-formation.component';
import { ProfilMentorComponents } from './components/dashboard-mentor/profil-mentore/profil-mentor.components';
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
  {path: 'abonner/mentore', component:AbonnerMentorComponent},
  {path: 'inscription', component:InscriptionComponent},
  {path: 'connexion', component:ConnexionComponent},
  {path: 'sidebar', component:SidebarComponent},
  {path: 'session-mentor', component:SessionComponent},
  {path: 'creer-session', component:CreerSessionComponent},
  {path: 'creer-article', component:CreerArticleComponent},
  {path: 'dashboard-mentor', component:DashboardComponent},
  {path: 'abonner-mentor', component:AbonnerComponent},
  {path: 'article-dashboard', component:DashArticleComponent},
  {path: 'detail-formation', component:DetailFormationComponent},
  {path: 'modifier/profile-mentor', component:ProfilMentorComponents}
// import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { FormationComponent } from './components/formation/formation.component';

// export const routes: Routes = [
//   { path: 'navbar', component: NavbarComponent },
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'formations', component: FormationComponent },

];
