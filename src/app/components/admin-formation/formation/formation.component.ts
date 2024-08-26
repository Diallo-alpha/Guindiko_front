import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DonneePublicService } from '../../../services/donnee-public.service';
import { AdminService } from '../../../services/admin.service';
import { DomainModel } from '../../../models/DomainModel';
import { FormationModel } from '../../../models/FormationModel';
import Swal from 'sweetalert2';  // Import SweetAlert

@Component({
  selector: 'app-formation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationAdminComponent implements OnInit {
  domains: DomainModel[] = [];
  formations: FormationModel[] = [];
  selectedDomainId: number = 1;
  startIndex: number = 0;
  newFormation: { libelle: string, domaine: number, description: string } = { libelle: '', domaine: 0, description: '' };

  constructor(
    private donneePublicService: DonneePublicService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.loadDomains();
    this.loadFormations(this.selectedDomainId);
  }

  loadDomains(): void {
    this.donneePublicService.getDomains().subscribe({
      next: (response: any) => {
        console.log(response);
        if (response && Array.isArray(response.data)) {
          this.domains = response.data;
        } else {
          console.error('Données reçues ne sont pas un tableau');
        }
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement des domaines :', error);
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
        console.error('Erreur lors du chargement des formations :', error);
      }
    });
  }

  ajouterFormation(): void {
    if (this.newFormation.libelle && this.newFormation.domaine && this.newFormation.description) {
      console.log('Données envoyées:', this.newFormation); // Vérifiez les données ici
      this.adminService.creerFormation(this.newFormation).subscribe(
        response => {
          console.log('Formation ajoutée:', response);
          Swal.fire({
            icon: 'success',
            title: 'Formation ajoutée',
            text: 'La formation a été ajoutée avec succès!',
            confirmButtonText: 'OK'
          });
          this.newFormation = { libelle: '', domaine: 0, description: '' };
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
}
