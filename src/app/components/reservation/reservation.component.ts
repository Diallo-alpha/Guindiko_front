import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenteeService } from '../../services/mentee.service';
import { ReservationModel } from '../../models/ReservationModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservations: ReservationModel[] = [];
  newReservation: ReservationModel = { user_id: 0, session_mentorat_id: 0, statut: '' };
  selectedReservation: ReservationModel | null = null;

  constructor(private menteeService: MenteeService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  // Charger les réservations
  loadReservations(): void {
    this.menteeService.getReservations().subscribe({
      next: (response: ReservationModel[]) => {
        this.reservations = response;
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement des réservations:', error);
      }
    });
  }

  // Créer une nouvelle réservation
  createReservation(): void {
    if (this.newReservation.user_id && this.newReservation.session_mentorat_id) {
      this.menteeService.createReservation(this.newReservation).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Réservation réussie',
            text: 'Votre réservation a été effectuée avec succès!',
            confirmButtonText: 'OK'
          });
          this.newReservation = { user_id: 0, session_mentorat_id: 0, statut: '' };
          this.loadReservations();
        },
        error => {
          console.error('Erreur lors de la création de la réservation:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la réservation.',
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

  // Editer une réservation
  editReservation(reservation: ReservationModel): void {
    this.selectedReservation = { ...reservation };
  }

  // Sauvegarder une réservation modifiée
  saveReservation(): void {
    if (this.selectedReservation && this.selectedReservation.id) {
      this.menteeService.updateReservation(this.selectedReservation.id, this.selectedReservation).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Modification réussie',
            text: 'Votre réservation a été modifiée avec succès!',
            confirmButtonText: 'OK'
          });
          this.selectedReservation = null;
          this.loadReservations();
        },
        error => {
          console.error('Erreur lors de la modification de la réservation:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la modification de la réservation.',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Erreur',
        text: 'ID de réservation invalide.',
        confirmButtonText: 'OK'
      });
    }
  }

  // Annuler l'édition
  cancelEdit(): void {
    this.selectedReservation = null;
  }

  // Supprimer une réservation
  deleteReservation(id: number): void {
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
        this.menteeService.deleteReservation(id).subscribe(
          response => {
            Swal.fire({
              icon: 'success',
              title: 'Supprimé!',
              text: 'Votre réservation a été supprimée.',
              confirmButtonText: 'OK'
            });
            this.loadReservations();
          },
          error => {
            console.error('Erreur lors de la suppression de la réservation:', error);
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Une erreur est survenue lors de la suppression de la réservation.',
              confirmButtonText: 'OK'
            });
          }
        );
      }
    });
  }
}
