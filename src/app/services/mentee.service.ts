import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrl } from './apiUrl'; // Ensure this is the correct path
import { CommentaireModel } from '../models/CommentaireModel';
@Injectable({
  providedIn: 'root'
})
export class MenteeService {
  private http = inject(HttpClient);

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('Token')}` // Add the token to requests
  });

  // Envoyer une demande de mentorat
  sendMentoringRequest(mentorId: number): Observable<any> {
    return this.http.post(`${apiUrl}/mentorats/${mentorId}/demande`, {}, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // Récupérer tous les commentaires
  getComments(): Observable<CommentaireModel[]> {
    return this.http.get<CommentaireModel[]>(`${apiUrl}/commentaires`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // Créer un commentaire
  createComment(commentData: any): Observable<CommentaireModel> {
    return this.http.post<CommentaireModel>(`${apiUrl}/commentaires`, commentData, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }


  // Gérer les erreurs API
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
}
