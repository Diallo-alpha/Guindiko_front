
import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ProfilMentorComponent } from '../profil-mentor/profil-mentor.component';
import { MentorService } from '../../../services/mentor.service';
import { ActivatedRoute } from '@angular/router';
import { SessionModel } from '../../../models/SessionModel';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { MenteeService } from '../../../services/mentee.service';

@Component({
  selector: 'app-session-mentor',
  standalone: true,
  imports: [NavbarComponent, ProfilMentorComponent, CommonModule],
  templateUrl: './session-mentor.component.html',
  styleUrls: ['./session-mentor.component.css']
})
export class SessionMentorComponent {
  user_id: number = 0;
  sessions: SessionModel[] = [];

  constructor(private route: ActivatedRoute, private mentorService: MentorService, private menteeService: MenteeService) {}

  ngOnInit(): void {
    this.user_id = +this.route.snapshot.paramMap.get('id')!;

    // Récupérer les sessions spécifiques au mentor
    this.mentorService.getSessionsMentore(this.user_id).subscribe(
      (response: any) => {
        console.log('Sessions récupérées:', response);

        // Vérification si la réponse est un tableau
        if (Array.isArray(response)) {
          this.sessions = response;
        } else if (response && typeof response === 'object' && Array.isArray(response.sessions)) {
          this.sessions = response.sessions;
        } else {
          console.error('La réponse n\'est pas un tableau de sessions', response);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des sessions', error);
      }
    );
  }

  reserverSession(sessionId: number): void {
    const reservationData = {
      session_mentorat_id: sessionId,
      statut: 'en attente'
    };
  
    console.log('Reservation Data:', reservationData); // Log the payload
  
    this.menteeService.createReservation(reservationData).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Réservation confirmée',
          text: 'Votre session de mentorat a été réservée avec succès!',
          confirmButtonText: 'OK'
        });
      },
      error => {
        console.error('Erreur lors de la réservation:', error);
        if (error.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Non autorisé',
            text: 'Vous devez vous connecter pour réserver une session.',
            confirmButtonText: 'OK'
          }).then(() => {
            // Optionally redirect to login or refresh token
          });
        } else if (error.status === 422) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur de validation',
            text: 'Les données envoyées ne sont pas valides. Veuillez vérifier et réessayer.',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la réservation. Veuillez réessayer.',
            confirmButtonText: 'OK'
          });
        }
      }
    );
  }
  
  
  
}
