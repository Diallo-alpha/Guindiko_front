import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MentorService } from '../../../services/mentor.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  nombreDemandes: number = 0;
  nombreSessions: number = 0;
  nombreArticles: number = 0;
  sessions: any[] = [];
  demandes: any[] = [];

  constructor(private mentorService: MentorService) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.mentorService.getNombreDemandes().subscribe(
      data => {
        console.log('Données reçues pour les demandes:', data);
        this.nombreDemandes = data.nombre_demandes; // Assurez-vous que `nombre_demandes` est bien la clé utilisée
      },
      error => console.error('Erreur lors de la récupération des demandes', error)
    );

    this.mentorService.getNombreSessions().subscribe(
      data => {
        console.log('Données reçues pour les sessions:', data);
        this.nombreSessions = data.nombre_sessions; // Assurez-vous que `nombre_sessions` est bien la clé utilisée
      },
      error => console.error('Erreur lors de la récupération des sessions', error)
    );

    this.mentorService.getNombreArticles().subscribe(
      data => {
        console.log('Données reçues pour les articles:', data);
        this.nombreArticles = data.nombre_articles; // Assurez-vous que `nombre_articles` est bien la clé utilisée
      },
      error => console.error('Erreur lors de la récupération des articles', error)
    );
  




    // Vous pouvez ajouter ici des appels pour obtenir les sessions à venir et les demandes de l'utilisateur
    // Par exemple :
    // this.mentorService.getSessionsAvenir().subscribe(
    //   data => this.sessions = data.sessions,
    //   error => console.error('Erreur lors de la récupération des sessions à venir', error)
    // );

    // this.mentorService.getDemandesUtilisateur().subscribe(
    //   data => this.demandes = data.demandes,
    //   error => console.error('Erreur lors de la récupération des demandes de l\'utilisateur', error)
    // );
  }
}
