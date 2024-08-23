import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrl } from './apiUrl'; // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);

  // Configuration des en-têtes, incluant le token d'autorisation récupéré depuis le localStorage
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('Token')}` // Ajout du token dans les requêtes
  });

  constructor() { }

  // Valider un mentor
  validerMentor(mentorId: number): Observable<any> {
    return this.http.post(`${apiUrl}/admin/mentor/${mentorId}/valider`, {}, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // Suspendre un utilisateur
  suspendreUtilisateur(userId: number): Observable<any> {
    return this.http.post(`${apiUrl}/admin/utilisateur/${userId}/suspendre`, {}, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // Créer une formation
  creerFormation(formationData: any): Observable<any> {
    return this.http.post(`${apiUrl}/formations`, formationData, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // Mettre à jour une formation
  mettreAJourFormation(formationId: number, formationData: any): Observable<any> {
    return this.http.put(`${apiUrl}/formations/${formationId}`, formationData, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // Supprimer une formation
  supprimerFormation(formationId: number): Observable<any> {
    return this.http.delete(`${apiUrl}/formations/${formationId}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // Récupérer les demandes pour devenir un mentor 
  obtenirDemandesMentor(): Observable<any> {
    return this.http.get(`${apiUrl}/admin/demandes-mentor`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // Récupérer la liste des mentors
  obtenirMentors(): Observable<any> {
    return this.http.get(`${apiUrl}/mentors`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // Récupérer la liste des mentorés
  obtenirMentees(): Observable<any> {
    return this.http.get(`${apiUrl}/mentees`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // Gérer les erreurs d'API
  private handleError(error: any): Observable<never> {
    console.error('Une erreur est survenue :', error);
    throw error; // Lever l'erreur pour être gérée par l'appelant
  }
}
