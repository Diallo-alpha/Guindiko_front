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
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { AdminGuard } from './Guard/admin-guard.guard';
import { FormationAdminComponent } from './components/admin-formation/formation/formation.component';
import { MentorGuard } from './Guard/mentor-guard.guard';
export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'accueil'},
  {path: 'navbar', component:NavbarComponent},
  {path: 'accueil', component:AccueilComponent},
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
  {path: 'session-mentor', component:SessionComponent,  canActivate:[MentorGuard]},
  {path: 'creer-session', component:CreerSessionComponent, canActivate:[MentorGuard]},
  {path: 'creer-article', component:CreerArticleComponent, canActivate:[MentorGuard]},
  {path: 'dashboard-mentor', component:DashboardComponent, canActivate:[MentorGuard]},
  {path: 'abonner-mentor', component:AbonnerComponent, canActivate:[MentorGuard]},
  {path: 'article-dashboard', component:DashArticleComponent, canActivate:[MentorGuard]},
  {path: 'detail-formation', component:DetailFormationComponent},
  {path: 'modifier/profile-mentor', component:ProfilMentorComponents},
  {path: 'admin-dashboard', component:DashboardAdminComponent, canActivate:[AdminGuard]},
  {path: 'admin-formation', component:FormationAdminComponent}
];
