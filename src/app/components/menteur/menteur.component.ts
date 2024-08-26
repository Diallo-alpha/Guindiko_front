import { MentorService } from './../../services/mentor.service';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menteur',
  standalone: true,
  imports: [NavbarComponent, RouterModule, CommonModule],
  templateUrl: './menteur.component.html',
  styleUrls: ['./menteur.component.css']
})
export class MenteurComponent implements OnInit {
  mentors: any[] = []; // Assurez-vous que mentors est un tableau

  constructor(private mentorService: MentorService) {}

  ngOnInit(): void {
    this.mentorService.getMentors().subscribe({
      next: (data) => {
        console.log('Données reçues:', data); // Vérifiez les données reçues
        if (Array.isArray(data)) {
          this.mentors = data;
          console.log('Mentors assignés:', this.mentors); // Vérifiez les données assignées
        } else {
          console.error('Données reçues ne sont pas un tableau', data);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des mentors', err);
      }
    });
  }


  requestMentorship(mentorId: number) {
    this.mentorService.requestMentorship(mentorId).subscribe(
      (response) => {
        alert('Demande de mentorat envoyée avec succès!');
      },
      (error) => {
        console.error('Erreur lors de la demande de mentorat:', error);
        alert('Une erreur est survenue. Veuillez réessayer plus tard.');
      }
    );
  }
}

