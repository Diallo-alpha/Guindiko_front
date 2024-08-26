import { Component, OnInit } from '@angular/core';
import { MentorService } from '../../../services/mentor.service';
import { DemandeMentorat } from '../../../models/DemandeMentorat';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-abonner',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './abonner.component.html',
  styleUrls: ['./abonner.component.css']
})
export class AbonnerComponent implements OnInit {
  demandesRecues: DemandeMentorat[] = [];
  demandesAcceptees: DemandeMentorat[] = [];
  mentorId: number = 0;
  loading = true;
  error: string | null = null;
  defaultProfileImageUrl = 'chemin/vers/image/default.png'; // Chemin de l'image par défaut

  constructor(private mentorService: MentorService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.mentorId = user.id;
    }
    this.fetchDemandesRecues();
    this.fetchDemandesAcceptees();
  }
  fetchDemandesRecues(): void {
    this.mentorService.getDemandesRecues(this.mentorId).subscribe(
      (response: any) => {
        console.log('Réponse complète des demandes reçues:', response);
        if (response && Array.isArray(response.demandes)) {
          // Filtrer les demandes acceptées
          this.demandesRecues = response.demandes;
          this.demandesAcceptees = this.demandesRecues.filter(demande => demande.statut === 'acceptée');
          console.log('Demandes reçues après traitement:', this.demandesRecues);
          console.log('Demandes acceptées après filtrage:', this.demandesAcceptees);
        } else {
          this.error = 'Format de réponse inattendu.';
        }
        this.loading = false;
      },
      (error) => {
        this.error = 'Erreur lors de la récupération des demandes.';
        this.loading = false;
      }
    );
  }

  fetchDemandesAcceptees(): void {
    this.mentorService.getDemandesAcceptees(this.mentorId).subscribe(
      (response: any) => {
        console.log('Réponse complète des demandes acceptées:', response);
        if (response && Array.isArray(response.demandes_acceptees)) {
          this.demandesAcceptees = response.demandes_acceptees;
          console.log('Demandes acceptées après traitement:', this.demandesAcceptees);
        } else {
          this.error = 'Format de réponse inattendu.';
        }
        this.loading = false;
      },
      (error) => {
        this.error = 'Erreur lors de la récupération des demandes acceptées.';
        this.loading = false;
      }
    );
  }


  accepterDemande(demandeId: number | null | undefined): void {
    if (demandeId !== null && demandeId !== undefined) {
      this.mentorService.accepterDemandeMentorat(demandeId).subscribe(
        () => {
          this.demandesRecues = this.demandesRecues.filter(d => d.id !== demandeId);
          alert('Demande acceptée avec succès');
        },
        () => {
          alert('Erreur lors de l\'acceptation de la demande');
        }
      );
    } else {
      alert('Erreur: ID de la demande invalide.');
    }
  }

  refuserDemande(demandeId: number | null | undefined): void {
    if (demandeId !== null && demandeId !== undefined) {
      this.mentorService.refuserDemandeMentorat(demandeId).subscribe(
        () => {
          this.demandesRecues = this.demandesRecues.filter(d => d.id !== demandeId);
          alert('Demande refusée avec succès');
        },
        () => {
          alert('Erreur lors du refus de la demande');
        }
      );
    } else {
      alert('Erreur: ID de la demande invalide.');
    }
  }
}
