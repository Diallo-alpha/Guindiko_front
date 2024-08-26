import { Component, OnInit } from '@angular/core';
import { MentorService } from '../../../services/mentor.service';
import { SessionModel } from '../../../models/SessionModel';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { DonneePublicService } from '../../../services/donnee-public.service';
import { FormationModel } from '../../../models/FormationModel';
import { RessourceModel } from '../../../models/RessourceModel';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

type FormationMapping = {
  [id: number]: string;
};

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  sessions: SessionModel[] = [];
  formations: FormationMapping = {};
  showModal = false;
  selectedSession: SessionModel | null = null;
  ressources: RessourceModel[] = [];
  newResource: RessourceModel = { titre: '', lien: '', session_mentorat_id: 0 };

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
      const userId = user.id;

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

    if (this.selectedSession?.id !== undefined) {
        this.loadRessources(this.selectedSession.id);
        this.showModal = true;
    } else {
        console.error('ID de la session non défini.');
    }
  }

  closeModal() {
    this.showModal = false;
    this.selectedSession = null;
  }

  loadRessources(sessionId: number) {
    this.mentorService.getRessourcesBysession(sessionId).subscribe(
      (response: { success: boolean; ressources: RessourceModel[] }) => {
        if (response.success && Array.isArray(response.ressources)) {
          this.ressources = response.ressources.map(ressource => ({
            id: ressource.id || undefined,
            session_mentorat_id: ressource.session_mentorat_id,
            titre: ressource.titre || 'Titre indisponible',
            lien: ressource.lien || 'Lien indisponible',
          }));
          console.log('Ressources chargées :', this.ressources);
        } else {
          console.error('Les données reçues ne sont pas au format attendu.', response);
          this.ressources = [];
        }
      },
      (error) => {
        if (error.status === 404) {
          console.warn('Aucune ressource trouvée pour cette session.');
          this.ressources = [];
        } else {
          console.error('Erreur lors du chargement des ressources :', error);
        }
      }
    );
  }

  ajouterRessource() {
    if (this.selectedSession?.id) {
      const ressourceData: RessourceModel = {
        session_mentorat_id: this.selectedSession.id!,
        titre: this.newResource.titre || '',
        lien: this.newResource.lien || ''
      };

      console.log('Payload:', ressourceData);

      this.mentorService.ajouterRessource(ressourceData).subscribe(
        (response: RessourceModel) => {
          console.log('Ressource ajoutée :', response);
          this.loadRessources(this.selectedSession!.id!);
          this.newResource = { titre: '', lien: '', session_mentorat_id: this.selectedSession!.id! };
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la ressource :', error);
          if (error.status === 422 && error.error) {
            console.error('Validation errors:', error.error);
          }
        }
      );
    } else {
      console.error('Aucune session sélectionnée ou ID de session non valide.');
    }
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  getFormationName(formationId?: number): string {
    return (formationId !== undefined && formationId !== null && formationId in this.formations)
      ? this.formations[formationId]
      : 'Nom de formation inconnu';
  }

  supprimerRessource(ressourceId: number) {
    this.mentorService.supprimerRessource(ressourceId).subscribe(
      () => {
        console.log('Ressource supprimée avec succès.');
        this.loadRessources(this.selectedSession?.id!);
      },
      (error) => {
        console.error('Erreur lors de la suppression de la ressource :', error);
      }
    );
  }

}
