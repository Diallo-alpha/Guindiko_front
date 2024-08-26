import { Component, OnInit } from '@angular/core';
import { MentorService } from '../../../services/mentor.service';
import { DemandeMentorat } from '../../../models/DemandeMentorat';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-abonner',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './abonner.component.html',
  styleUrls: ['./abonner.component.css']
})
export class AbonnerComponent implements OnInit {
  demandesRecues: DemandeMentorat[] = [];
  mentorId: number = 0;
  loading = true;
  error: string | null = null;
  defaultProfileImageUrl = 'chemin/vers/image/default.png'; // Chemin de l'image par défaut

  constructor(private mentorService: MentorService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.mentorId = user.id; // Supposons que `id` soit l'ID du mentor
    }
    this.fetchDemandesRecues();
  }

  fetchDemandesRecues(): void {
    this.mentorService.getDemandesRecues().subscribe(
      (demandes: DemandeMentorat[]) => { // Supposons que l'API retourne un tableau directement
        console.log('Demandes reçues:', demandes);
        this.demandesRecues = demandes; // Assigner directement le tableau aux demandesRecues
        this.loading = false;
      },
      (error) => {
        this.error = 'Erreur lors de la récupération des demandes.';
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
