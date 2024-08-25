import { Component } from '@angular/core';
import { MentorService } from '../../../services/mentor.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SessionModel } from './../../../models/SessionModel';

@Component({
  selector: 'app-creer-session',
  standalone: true,
  imports: [SidebarComponent, FormsModule, CommonModule],
  templateUrl: './creer-session.component.html',
  styleUrls: ['./creer-session.component.css'],
})
export class CreerSessionComponent {
  sessionModel: SessionModel = {
    formation_id: 0,
    date: new Date(),  // Initialise avec une instance de Date
    statut: 'en_attente',
    duree: 1
  };
  formations: any[] = [];

  constructor(private mentorService: MentorService) {
    this.loadFormations();
  }

  // Charger les formations disponibles
  loadFormations() {
    this.mentorService.getFormations().subscribe(
      (response: any) => {
        console.log('Formations response:', response);
        this.formations = response.data;
      },
      (error) => {
        console.error('Erreur lors du chargement des formations :', error);
      }
    );
  }

  // Créer une session de mentorat
  creerSession() {
    console.log('Données envoyées pour la création de session :', this.sessionModel);

    this.mentorService.creerSessionMentorat(this.sessionModel).subscribe(
      (response) => {
        console.log('Session créée avec succès :', response);
      },
      (error) => {
        console.error('Erreur lors de la création de la session :', error);
      }
    );
  }
}
