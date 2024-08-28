import { MentorService } from './../../services/mentor.service';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenteeService } from '../../services/mentee.service';

@Component({
  selector: 'app-menteur',
  standalone: true,
  imports: [NavbarComponent, RouterModule, CommonModule],
  templateUrl: './menteur.component.html',
  styleUrls: ['./menteur.component.css']
})
export class MenteurComponent implements OnInit {
  mentors: any[] = [];
  filteredMentors: any[] = []; // Tableau pour stocker les mentors filtrés


  constructor(private mentorService: MentorService,
        private menteeService: MenteeService
  ) {}

  ngOnInit(): void {
    this.mentorService.getMentors().subscribe({
      next: (data) => {
        console.log('Données reçues:', data);
        if (Array.isArray(data)) {
          this.mentors = data.filter(mentor => mentor && mentor.name); // Filtrez les mentors valides
          this.filteredMentors = this.mentors; // Initialisez les mentors filtrés
        } else {
          console.error('Données reçues ne sont pas un tableau', data);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des mentors', err);
      }
    });
  }


  filterMentors(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredMentors = this.mentors.filter(mentor =>
      mentor.name.toLowerCase().includes(query) ||
      mentor.formation.name.toLowerCase().includes(query)
    );
  }

  envoyerDemande(mentorId: number): void {
    this.menteeService.EnvoyerDemande(mentorId).subscribe({
      next: (response) => {
        console.log('Demande de mentorat envoyée avec succès', response);
        alert('Votre demande de mentorat a été envoyée.');
      },
      error: (error) => {
        console.error('Erreur lors de l\'envoi de la demande de mentorat', error);
        alert('Une erreur est survenue lors de l\'envoi de la demande.');
      }
    });
  }

}

