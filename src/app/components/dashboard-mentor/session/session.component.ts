import { Component, OnInit } from '@angular/core';
import { MentorService } from '../../../services/mentor.service';
import { SessionModel } from '../../../models/SessionModel';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { DonneePublicService } from '../../../services/donnee-public.service';
import { FormationModel } from '../../../models/FormationModel';

type FormationMapping = {
  [id: number]: string;
};

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  sessions: SessionModel[] = [];
  formations: FormationMapping = {}; // Utiliser l'interface FormationMapping
  showModal = false;
  selectedSession: SessionModel | null = null;

  constructor(
    private mentorService: MentorService,
    private donneePublicService: DonneePublicService
  ) {}

  ngOnInit() {
    this.loadSessions();
    this.loadFormations();
  }

  loadSessions() {
    const storedUser = localStorage.getItem('User');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const userId = user.id; // Utiliser user.id au lieu de mentorId

      if (userId) {
        this.mentorService.getSessionsMentore(userId).subscribe(
          (response: any) => {
            if (Array.isArray(response.sessions)) {
              this.sessions = response.sessions;
              console.log('Sessions chargées :', this.sessions);
            } else {
              console.error('Le format de réponse des sessions est invalide.');
            }
          },
          (error) => {
            console.error('Erreur lors du chargement des sessions :', error);
          }
        );
      } else {
        console.error('ID utilisateur non trouvé ou l\'utilisateur n\'est pas un mentor.');
      }
    } else {
      console.error('Aucune donnée utilisateur trouvée dans le local storage.');
    }
  }

  loadFormations() {
    this.donneePublicService.getFormations().subscribe(
      (response: any) => {
        if (Array.isArray(response.data)) {
          this.formations = response.data.reduce((acc: FormationMapping, formation: FormationModel) => {
            if (formation.id && formation.nom) {
              acc[formation.id] = formation.nom;
            } else {
              console.error('Formation invalide:', formation);
            }
            return acc;
          }, {});
          console.log('Formations chargées :', this.formations);
        } else {
          console.error('Le format de réponse des formations est invalide.');
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des formations :', error);
      }
    );
  }

  openModal(event: MouseEvent, session: SessionModel) {
    event.preventDefault();
    this.selectedSession = session;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedSession = null;
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  getFormationName(formationId?: number): string {
    return formationId !== undefined && formationId in this.formations
      ? this.formations[formationId]
      : 'Nom de formation inconnu';
  }
}
