import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from './apiUrl'; // Assurez-vous que ce chemin est correct

@Injectable({
  providedIn: 'root'
})
export class MentorService {
  private http = inject(HttpClient);

  // Configuration des en-têtes, incluant le token d'autorisation récupéré depuis le localStorage
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('Token')}` // Ajouter le token à chaque requête
  });

  // Accepter une demande de mentorat
  accepterDemandeMentorat(demandeMentoratId: number): Observable<any> {
    return this.http.post(`${apiUrl}/mentorats/${demandeMentoratId}/accepter`, {}, { headers: this.headers });
  }

  // Refuser une demande de mentorat
  refuserDemandeMentorat(demandeMentoratId: number): Observable<any> {
    return this.http.post(`${apiUrl}/mentorats/${demandeMentoratId}/refuser`, {}, { headers: this.headers });
  }

  // Créer une nouvelle session de mentorat
  creerSessionMentorat(sessionData: any): Observable<any> {
    return this.http.post(`${apiUrl}/mentorats/session`, sessionData, { headers: this.headers });
  }

  // Afficher les demandes de mentorat reçues
  afficherDemandesRecues(): Observable<any> {
    return this.http.get(`${apiUrl}/mentor/demandes-recues`, { headers: this.headers });
  }

  // Ajouter un nouvel article
  ajouterArticle(articleData: any): Observable<any> {
    return this.http.post(`${apiUrl}/ajouter/article`, articleData, { headers: this.headers });
  }

  // Mettre à jour un article existant
  modifierArticle(articleId: number, articleData: any): Observable<any> {
    return this.http.patch(`${apiUrl}/modifier/article/${articleId}`, articleData, { headers: this.headers });
  }

  // Supprimer un article
  supprimerArticle(articleId: number): Observable<any> {
    return this.http.delete(`${apiUrl}/supprimer/${articleId}/article`, { headers: this.headers });
  }
}
