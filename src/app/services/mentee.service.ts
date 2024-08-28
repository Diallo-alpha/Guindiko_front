import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrl } from './apiUrl';
import { CommentaireModel } from '../models/CommentaireModel';
import { ReservationModel } from '../models/ReservationModel';

@Injectable({
  providedIn: 'root'
})
export class MenteeService {
  private http = inject(HttpClient);

  // Create headers with the current token
  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('Token');
    if (!token) {
      console.error('Token not found');
      return new HttpHeaders(); // Return empty headers if no token
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Envoyer une demande de mentorat
  EnvoyerDemande(mentorId: number): Observable<any> {
    return this.http.post(`${apiUrl}/mentorats/${mentorId}/demande`, {}, { headers: this.createHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Récupérer tous les commentaires
  getComments(): Observable<CommentaireModel[]> {
    return this.http.get<CommentaireModel[]>(`${apiUrl}/commentaires`, { headers: this.createHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Créer un commentaire
  createComment(commentData: any): Observable<CommentaireModel> {
    return this.http.post<CommentaireModel>(`${apiUrl}/commentaires`, commentData, { headers: this.createHeaders() })
      .pipe(catchError(this.handleError));
  }

  // --- GESTION DES RÉSERVATIONS ---

  // Récupérer toutes les réservations
  getReservations(): Observable<ReservationModel[]> {
    return this.http.get<ReservationModel[]>(`${apiUrl}/reservations`, { headers: this.createHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Récupérer une réservation spécifique
  getReservationById(reservationId: number): Observable<ReservationModel> {
    return this.http.get<ReservationModel>(`${apiUrl}/reservations/${reservationId}`, { headers: this.createHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Créer une réservation
  createReservation(data: { session_mentorat_id: number; statut: string }): Observable<any> {
    return this.http.post<any>(`${apiUrl}/reservations`, data, { headers: this.createHeaders() })
      .pipe(catchError(this.handleError));
  }
  

  // Mettre à jour une réservation
  updateReservation(reservationId: number, reservationData: any): Observable<ReservationModel> {
    return this.http.put<ReservationModel>(`${apiUrl}/reservations/${reservationId}`, reservationData, { headers: this.createHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Supprimer une réservation
  deleteReservation(reservationId: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/reservations/${reservationId}`, { headers: this.createHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Gérer les erreurs API
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'An error occurred'));
  }
}
