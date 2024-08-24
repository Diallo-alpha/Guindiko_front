import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from './apiUrl';
import { ArticleModel } from '../models/ArticleModel';

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

  // Méthode pour obtenir les articles créés par le mentor connecté
  getArticles(mentorId: number): Observable<ArticleModel[]> {
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

  supprimerArticle(articleId: number): Observable<void> {
    const headers = this.createHeaders();
    return this.http.delete<void>(`${apiUrl}/supprimer/${articleId}/article`, { headers });
  }
}
