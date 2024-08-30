import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DonneePublicService } from '../../../services/donnee-public.service';
import { AdminService } from '../../../services/admin.service';
import { DomainModel } from '../../../models/DomainModel';
import { FormationModel } from '../../../models/FormationModel';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth-service.service';
import { MentorService } from '../../../services/mentor.service';

interface Notification {
  id: string;
  type: string;
  notifiable_type: string;
  notifiable_id: number;
  data: {
    message?: string;
    [key: string]: any; // Allow for other dynamic properties
  };
  read_at: string | null;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-formation',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationAdminComponent implements OnInit {
  domains: DomainModel[] = [];
  formations: FormationModel[] = [];
  selectedDomainId: number = 1;
  startIndex: number = 0;
  selectedFormation: FormationModel | null = null;
  newFormation: FormationModel = { nom: '', domaine_id: 0, description: '' };
  userName: string = 'Utilisateur'; // Declare with a default value
  notifications: Notification[] = []; // Declare an empty array
  showNotifications: boolean = false; // Declare with a default value

  constructor(
    private donneePublicService: DonneePublicService,
    private adminService: AdminService,
    private authService: AuthService,
    private mentorService: MentorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDomains();
    this.loadFormations(this.selectedDomainId);
    this.getUserInfo();
    this.getNotifications();
  }

  loadDomains(): void {
    this.donneePublicService.getDomains().subscribe({
      next: (response: any) => {
        console.log('Réponse des domaines:', response);
        if (response && Array.isArray(response.data)) {
          this.domains = response.data;
        } else {
          console.error('Les données reçues ne sont pas un tableau');
        }
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement des domaines:', error);
      }
    });
  }

  loadFormations(domainId: number): void {
    this.donneePublicService.getFormationsByDomain(domainId).subscribe({
      next: (response: any) => {
        console.log('Formations récupérées:', response);
        if (response && Array.isArray(response.data)) {
          this.formations = response.data;
        } else {
          console.error('Les données de formation reçues ne sont pas un tableau');
        }
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement des formations:', error);
      }
    });
  }

  ajouterFormation(): void {
    if (this.newFormation.nom && this.newFormation.domaine_id && this.newFormation.description) {
      console.log('Données envoyées:', this.newFormation);
      this.adminService.creerFormation(this.newFormation).subscribe(
        response => {
          console.log('Réponse de l\'API:', response);
          Swal.fire({
            icon: 'success',
            title: 'Formation ajoutée',
            text: 'La formation a été ajoutée avec succès!',
            confirmButtonText: 'OK'
          });
          this.newFormation = { nom: '', domaine_id: 0, description: '' };
          this.loadFormations(this.selectedDomainId);
        },
        error => {
          console.error('Erreur lors de l\'ajout de la formation:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Erreur lors de l\'ajout de la formation.',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Champs manquants',
        text: 'Veuillez remplir tous les champs avant de soumettre.',
        confirmButtonText: 'OK'
      });
    }
  }

  editFormation(formation: FormationModel): void {
    this.selectedFormation = { ...formation }; // Crée une copie pour l'édition
  }

  saveFormation(): void {
    if (this.selectedFormation && this.selectedFormation.id) {
      console.log('Mise à jour de la formation:', this.selectedFormation);
      this.adminService.mettreAJourFormation(this.selectedFormation.id, this.selectedFormation).subscribe(
        response => {
          console.log('Formation mise à jour:', response);
          this.selectedFormation = null; // Réinitialiser après mise à jour
          this.loadFormations(this.selectedDomainId); // Recharger les formations après mise à jour
        },
        error => {
          console.error('Erreur lors de la mise à jour de la formation:', error);
        }
      );
    } else {
      console.warn('ID de formation invalide ou non défini');
    }
  }

  cancelEdit(): void {
    this.selectedFormation = null; // Annuler l'édition
  }

  deleteFormation(id: number): void {
    Swal.fire({
      icon: 'warning',
      title: 'Êtes-vous sûr ?',
      text: 'Vous ne pourrez pas revenir en arrière !',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.supprimerFormation(id).subscribe(
          response => {
            console.log('Formation supprimée:', response);
            this.loadFormations(this.selectedDomainId); // Recharger les formations après suppression
          },
          error => {
            console.error('Erreur lors de la suppression de la formation:', error);
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Erreur lors de la suppression de la formation.',
              confirmButtonText: 'OK'
            });
          }
        );
      }
    });
  }

  onDomainClick(domainId: number | undefined): void {
    if (domainId !== undefined) {
      this.selectedDomainId = domainId;
      this.loadFormations(domainId);
    }
  }

  prev(): void {
    if (this.startIndex >= 5) {
      this.startIndex -= 5;
    }
  }

  next(): void {
    if (this.startIndex + 5 < this.domains.length) {
      this.startIndex += 5;
    }
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  getUserInfo(): void {
    const storedUser = localStorage.getItem('User');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.userName = user.name || 'Utilisateur';
    }
  }

  getNotifications(): void {
    const storedUser = localStorage.getItem('User');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.mentorService.getMentorNotifications(user.id).subscribe(
        (data: Notification[]) => {
          this.notifications = data.filter((notification: Notification) => !notification.read_at);
          console.log('Notifications:', this.notifications);
        },
        (error) => {
          console.error('Erreur lors de la récupération des notifications', error);
        }
      );
    }
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/accueil']);
  }
}
