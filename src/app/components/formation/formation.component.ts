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

  constructor(private donneePublicService: DonneePublicService) {}

  ngOnInit(): void {
    this.loadDomains();
    this.loadFormations(this.selectedDomainId);
  }

  // Charger les domaines via le service
  loadDomains(): void {
    this.donneePublicService.getDomains().subscribe({
      next: (response: any) => {
        console.log(response);
        if (response && Array.isArray(response.data)) {
          this.domains = response.data; // Extraction du tableau de domaines
        } else {
          console.error('Données reçues ne sont pas un tableau');
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des domaines :', error);
      }
    });
  }
   // Charger les formations d'un domaine sélectionné
   loadFormations(domainId: number): void {
    this.donneePublicService.getFormationsByDomain(domainId).subscribe({
      next: (response: any) => {
        console.log('Formations récupérées:', response);
        if (response && Array.isArray(response.data)) {
          this.formations = response.data; // S'assurer que c'est bien un tableau
        } else {
          console.error('Les données de formation reçues ne sont pas un tableau');
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des formations :', error);
      }
    });
  }


  //cliquer sur un domain
  onDomainClick(domainId: number): void {
    this.selectedDomainId = domainId;
    this.loadFormations(domainId);
  }
  // Fonction pour passer aux 5 domaines précédents
  prev(): void {
    if (this.startIndex >= 5) {
      this.startIndex -= 5;
    }
  }

  // Fonction pour passer aux 5 domaines suivants
  next(): void {
    if (this.startIndex + 5 < this.domains.length) {
      this.startIndex += 5;
    }
  }
}
