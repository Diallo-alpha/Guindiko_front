import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { apiUrl } from './apiUrl';
import { map, catchError } from 'rxjs/operators';
import { ArticleModel } from '../models/ArticleModel';
import { SessionModel } from '../models/SessionModel';


@Injectable({
  providedIn: 'root'
})
export class MentorService {
  private http = inject(HttpClient);

  // Fonction pour générer les en-têtes dynamiquement avec le jeton d'autorisation
  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('Token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  private handleError(error: any): Observable<never> {
    console.error('Erreur lors de la requête', error);
    return throwError(() => new Error(error.message || 'Erreur serveur'));
  }

  getMentors(): Observable<any[]> { // Ensure the return type is an array
    const headers = this.createHeaders();

    return this.http.get<any>(`${apiUrl}/mentors`, { headers }).pipe(
      map(response => response.mentors || []), // Adjust according to your API structure
      catchError(this.handleError)
    );
  }

  getUserMentorships(): Observable<any[]> {
    const headers = this.createHeaders();
    return this.http.get<any[]>(`${apiUrl}/user/mentorships`, { headers });
  }


  requestMentorship(mentorId: number): Observable<any> {
    return this.http.post(`${apiUrl}/mentorats/${mentorId}/demande`, {});
  }

  // Méthode pour obtenir les articles créés par le mentor connecté
  getArticlesMentore(mentorId: number): Observable<ArticleModel[]> {
    const headers = this.createHeaders();
    return this.http.get<ArticleModel[]>(`${apiUrl}/mentor/${mentorId}/articles`, { headers });
  }

  // Autres méthodes pour gérer les articles et les actions de mentorat
  ajouterArticle(articleData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${apiUrl}/ajouter/article`, articleData, { headers });
  }

  modifierArticle(articleId: number, articleData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.patch(`${apiUrl}/modifier/article/${articleId}`, articleData, { headers });
  }

  getArticleById(articleId: number): Observable<ArticleModel> {
    const headers = this.createHeaders();
    return this.http.get<ArticleModel>(`${apiUrl}/articles/${articleId}`, { headers });
  }

  supprimerArticle(articleId: number): Observable<void> {
    const headers = this.createHeaders();
    return this.http.delete<void>(`${apiUrl}/supprimer/${articleId}/article`, { headers });
  }

  // Méthode pour obtenir les formations disponibles
  getFormations(): Observable<SessionModel[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.get<SessionModel[]>(`${apiUrl}/formations`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Méthode pour créer une session de mentorat
  creerSessionMentorat(sessionModel: SessionModel): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${apiUrl}/session-mentorats`, sessionModel, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
    // Méthode pour obtenir les sessions créées par le mentor connecté
    getSessionsMentore(mentorId: number): Observable<SessionModel[]> {
      const headers = this.createHeaders();
      return this.http.get<SessionModel[]>(`${apiUrl}/mentor/${mentorId}/sessions`, { headers })
        .pipe(
          catchError(this.handleError)
        );
    }
}
