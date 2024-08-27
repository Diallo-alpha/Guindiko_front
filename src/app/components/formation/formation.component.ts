import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { DonneePublicService } from '../../services/donnee-public.service';
import { DomainModel } from '../../models/DomainModel';
import { FormationModel } from '../../models/FormationModel';

@Component({
  selector: 'app-formation',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
  domains: DomainModel[] = [];
  formations: FormationModel[] = [];
  selectedDomainId: number = 1;
  startIndex: number = 0;
  hasFormations: boolean = true; // Nouveau booléen pour suivre s'il y a des formations

  constructor(private donneePublicService: DonneePublicService) {}

  ngOnInit(): void {
    this.loadDomains();
    this.loadFormations(this.selectedDomainId);
  }

  loadDomains(): void {
    this.donneePublicService.getDomains().subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.data)) {
          this.domains = response.data;
        } else {
          console.error('Données reçues ne sont pas un tableau');
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des domaines :', error);
      }
    });
  }

  loadFormations(domainId: number): void {
    this.donneePublicService.getFormationsByDomain(domainId).subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.data)) {
          this.formations = response.data;
          this.hasFormations = this.formations.length > 0; // Mise à jour du booléen
        } else {
          this.formations = [];
          this.hasFormations = false;
          console.error('Les données de formation reçues ne sont pas un tableau');
        }
      },
      error: (error) => {
        this.formations = [];
        this.hasFormations = false; // Aucun résultat en cas d'erreur
        console.error('Erreur lors du chargement des formations :', error);
      }
    });
  }

  loadAllFormations(): void {
    this.donneePublicService.getAllFormations().subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.data)) {
          this.formations = response.data;
        } else {
          console.error('Les données de formation reçues ne sont pas un tableau');
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement de toutes les formations :', error);
      }
    });
  }

  onAllClick(): void {
    this.loadAllFormations();
  }

  onDomainClick(domainId: number): void {
    this.selectedDomainId = domainId;
    this.loadFormations(domainId);
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
