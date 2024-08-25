import { Component, OnInit } from '@angular/core';
import { MentorService } from './../../services/mentor.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importez FormsModule pour ngModel

@Component({
  selector: 'app-menteur',
  standalone: true,
  imports: [NavbarComponent, RouterModule, CommonModule, FormsModule],
  templateUrl: './menteur.component.html',
  styleUrls: ['./menteur.component.css']
})
export class MenteurComponent implements OnInit {
  mentors: any[] = [];
  filteredMentors: any[] = [];
  searchTerm: string = ''; // Terme de recherche
  userMentorships: any[] = []; // Liste des demandes de mentorat de l'utilisateur

  constructor(private mentorService: MentorService) {}

  ngOnInit(): void {
    this.mentorService.getMentors().subscribe({
      next: (data) => {
        this.mentors = data;
        this.filteredMentors = data; // Initialiser avec tous les mentors
        this.loadUserMentorships(); // Charger les demandes de mentorat de l'utilisateur
      },
      error: (err) => {
        console.error('Error fetching mentors', err);
      }
    });
  }

  loadUserMentorships() {
    this.mentorService.getUserMentorships().subscribe({
      next: (data) => {
        this.userMentorships = data;
        this.updateMentorVisibility();
      },
      error: (err) => {
        console.error('Error fetching user mentorships', err);
      }
    });
  }

  updateMentorVisibility() {
    this.filteredMentors = this.mentors.map(mentor => {
      const hasRequested = this.userMentorships.some(mentorship => mentorship.mentorId === mentor.id && mentorship.status === 'accepted');
      return {
        ...mentor,
        showRequestButton: !hasRequested
      };
    });
  }

  searchMentors() {
    this.filteredMentors = this.mentors.filter(mentor =>
      mentor.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      mentor.formation.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.updateMentorVisibility(); // Mise à jour après recherche
  }

  requestMentorship(mentorId: number) {
    this.mentorService.requestMentorship(mentorId).subscribe(
      (response) => {
        alert('Demande de mentorat envoyée avec succès!');
        this.loadUserMentorships(); // Recharger les demandes de mentorat après envoi
      },
      (error) => {
        console.error('Erreur lors de la demande de mentorat:', error);
        alert('Une erreur est survenue. Veuillez réessayer plus tard.');
      }
    );
  }
}
