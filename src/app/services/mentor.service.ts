import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from './apiUrl'; // Assurez-vous que ce chemin est correct

@Injectable({
  providedIn: 'root'
})
export class MentorService {
  private http = inject(HttpClient);

  // Fonction pour générer les en-têtes dynamiquement avec le jeton d'autorisation
  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('Token'); // Récupère le token depuis le localStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Accepter une demande de mentorat
  accepterDemandeMentorat(demandeMentoratId: number): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${apiUrl}/mentorats/${demandeMentoratId}/accepter`, {}, { headers });
  }

  // Refuser une demande de mentorat
  refuserDemandeMentorat(demandeMentoratId: number): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${apiUrl}/mentorats/${demandeMentoratId}/refuser`, {}, { headers });
  }

  // Créer une nouvelle session de mentorat
  creerSessionMentorat(sessionData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${apiUrl}/mentorats/session`, sessionData, { headers });
  }

  // Afficher les demandes de mentorat reçues
  afficherDemandesRecues(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${apiUrl}/mentor/demandes-recues`, { headers });
  }

  // Ajouter un nouvel article
  ajouterArticle(articleData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${apiUrl}/ajouter/article`, articleData, { headers });
  }

  // Mettre à jour un article existant
  modifierArticle(articleId: number, articleData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.patch(`${apiUrl}/modifier/article/${articleId}`, articleData, { headers });
  }

  // Supprimer un article
  supprimerArticle(articleId: number): Observable<any> {
    const headers = this.createHeaders();
    return this.http.delete(`${apiUrl}/supprimer/${articleId}/article`, { headers });
  }
}
