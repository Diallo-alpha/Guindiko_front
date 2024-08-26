import { Routes } from '@angular/router'
import { NavbarComponent } from './components/navbar/navbar.component'
import { AccueilComponent } from './components/accueil/accueil.component'
import { FormationComponent } from './components/formation/formation.component'
import { ArticlesComponent } from './components/articles/articles.component'
import { MenteurComponent } from './components/menteur/menteur.component'
import { DetailsArticleComponent } from './components/details-article/details-article.component'
import { SessionMentorComponent } from './components/mentor/session-mentor/session-mentor.component'
import { ArticleMentorComponent } from './components/mentor/article-mentor/article-mentor.component'
import { AbonnerMentorComponent } from './components/mentor/abonner-mentor/abonner-mentor.component'
import { InscriptionComponent } from './components/inscription/inscription.component'
import { ConnexionComponent } from './components/connexion/connexion.component'
import { SidebarComponent } from './components/dashboard-mentor/sidebar/sidebar.component'
import { SessionComponent } from './components/dashboard-mentor/session/session.component'
import { CreerSessionComponent } from './components/dashboard-mentor/creer-session/creer-session.component'
import { CreerArticleComponent } from './components/dashboard-mentor/creer-article/creer-article.component'
import { DashboardComponent } from './components/dashboard-mentor/dashboard/dashboard.component'
import { AbonnerComponent } from './components/dashboard-mentor/abonner/abonner.component'
import { DashArticleComponent } from './components/dashboard-mentor/dash-article/dash-article.component'
import { DetailFormationComponent } from './components/detail-formation/detail-formation.component'
import { ProfilMentoreComponents } from './components/dashboard-mentor/profil-mentore/profil-mentore.components' // Assurez-vous que le chemin est correct
import { ProfilMentorComponent } from './components/mentor/profil-mentor/profil-mentor.component' // Assurez-vous que le chemin est correct
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component'
import { AdminGuard } from './Guard/admin-guard.guard'
import { MentorGuard } from './Guard/mentor-guard.guard'
import { ModifierArticleComponent } from './components/dashboard-mentor/modifier-article/modifier-article.component'

export const routes: Routes = [
  // Routes publiques
  { path: '', pathMatch: 'full', redirectTo: 'accueil' },
  { path: 'navbar', component: NavbarComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'formations', component: FormationComponent },
  { path: 'article', component: ArticlesComponent },
  { path: 'mentor', component: MenteurComponent },
  { path: 'details-article', component: DetailsArticleComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'detail-formation', component: DetailFormationComponent },
  { path: 'mentor/profil/edit', component: ProfilMentoreComponents }, // Route pour afficher le profil du mentor
  { path: 'mentor/profil', component: ProfilMentorComponent }, // Route pour modifier le profil du mentor

  // Routes protégées pour Mentor
  {
    path: 'mentor/session',
    component: SessionMentorComponent,
    canActivate: [MentorGuard]
  },
  {
    path: 'mentor/article',
    component: ArticleMentorComponent,
    canActivate: [MentorGuard]
  },
  {
    path: 'mentor/abonner',
    component: AbonnerMentorComponent,
    canActivate: [MentorGuard]
  },
  {
    path: 'mentor/dashboard',
    component: DashboardComponent,
    canActivate: [MentorGuard]
  },
  {
    path: 'mentor/creer-session',
    component: CreerSessionComponent,
    canActivate: [MentorGuard]
  },
  {
    path: 'mentor/creer-article',
    component: CreerArticleComponent,
    canActivate: [MentorGuard]
  },
  {
    path: 'mentor/modifier-article/:id',
    component: ModifierArticleComponent,
    canActivate: [MentorGuard]
  },
  {
    path: 'mentor/article-dashboard',
    component: DashArticleComponent,
    canActivate: [MentorGuard]
  },

  // Routes protégées pour Admin
  {
    path: 'admin/dashboard',
    component: DashboardAdminComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/formation',
    component: FormationAdminComponent,
    canActivate: [AdminGuard]
  }
]
