import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { apiUrl } from './apiUrl';
import { catchError, map, tap } from 'rxjs/operators';
import { ArticleModel } from '../models/ArticleModel';
import { SessionModel } from '../models/SessionModel';
import { RessourceModel } from '../models/RessourceModel';
import { DemandeMentorat } from '../models/DemandeMentorat';
import { UserModel } from '../models/userModel';


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
    return this.http.get<ArticleModel[]>(`${apiUrl}/mentor/${mentorId}/articles`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Autres méthodes pour gérer les articles et les actions de mentorat
  ajouterArticle(articleData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post<any>(`${apiUrl}/ajouter/article`, articleData, { headers })
      .pipe(catchError(this.handleError));
  }

  modifierArticle(articleId: number, articleData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.patch<any>(`${apiUrl}/modifier/article/${articleId}`, articleData, { headers })
      .pipe(catchError(this.handleError));
  }

  getArticleById(articleId: number): Observable<ArticleModel> {
    const headers = this.createHeaders();
    return this.http.get<ArticleModel>(`${apiUrl}/articles/${articleId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  supprimerArticle(articleId: number): Observable<void> {
    const headers = this.createHeaders();
    return this.http.delete<void>(`${apiUrl}/supprimer/${articleId}/article`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Méthode pour obtenir les formations disponibles
  getFormations(): Observable<SessionModel[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.get<SessionModel[]>(`${apiUrl}/formations`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Méthode pour créer une session de mentorat
  creerSessionMentorat(sessionModel: SessionModel): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post<any>(`${apiUrl}/session-mentorats`, sessionModel, { headers })
      .pipe(catchError(this.handleError));
  }

  // Méthode pour obtenir les sessions créées par le mentor connecté
  getSessionsMentore(mentorId: number): Observable<SessionModel[]> {
    const headers = this.createHeaders();
    return this.http.get<SessionModel[]>(`${apiUrl}/mentor/${mentorId}/sessions`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Récupère les ressources d'une session spécifique
  getRessources(sessionId: number): Observable<RessourceModel[]> {
    const headers = this.createHeaders();
    return this.http.get<RessourceModel[]>(`${apiUrl}/sessions/${sessionId}/ressources`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Récupère les ressources d'une session spécifique (correction)
  getRessourcesBysession(sessionId: number): Observable<{ success: boolean; ressources: RessourceModel[] }> {
    const headers = this.createHeaders();
    return this.http.get<{ success: boolean; ressources: RessourceModel[] }>(`${apiUrl}/sessions/${sessionId}/ressources`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Ajoute une nouvelle ressource à une session
  ajouterRessource(ressourceData: RessourceModel): Observable<RessourceModel> {
    const headers = this.createHeaders();
    return this.http.post<RessourceModel>(`${apiUrl}/ressources`, ressourceData, { headers })
      .pipe(catchError(this.handleError));
  }

  // Modifie une ressource existante
  modifierRessource(ressourceId: number, ressourceData: RessourceModel): Observable<RessourceModel> {
    const headers = this.createHeaders();
    return this.http.patch<RessourceModel>(`${apiUrl}/ressources/${ressourceId}`, ressourceData, { headers })
      .pipe(catchError(this.handleError));
  }

  // Supprime une ressource
  supprimerRessource(ressourceId: number): Observable<void> {
    const headers = this.createHeaders();
    return this.http.delete<void>(`${apiUrl}/ressources/${ressourceId}`, { headers })
      .pipe(catchError(this.handleError));
  }
  // Méthode pour obtenir les demandes de mentorat reçues par le mentor connecté
  getDemandesRecues(userId: number) {
    const headers = this.createHeaders();
    const params = { user_id: userId.toString() };

    return this.http.get<any>(`${apiUrl}/mentor/demandes-recues`, { headers, params })
      .pipe(
        tap(response => console.log('Données récupérées:', response)),
        catchError(this.handleError)
      );
  }

// Méthode pour accepter une demande de mentorat
accepterDemandeMentorat(demandeId: number): Observable<any> {
  const headers = this.createHeaders();
  return this.http.post(`${apiUrl}/mentorats/${demandeId}/accepter`, {}, { headers })
    .pipe(catchError(this.handleError));
}

getDemandesAcceptees(userId: number): Observable<any> {
  const headers = this.createHeaders();
  return this.http.get<any>(`${apiUrl}/mentor/${userId}/demandes-acceptees`, { headers })
    .pipe(
      tap(response => console.log('Demandes acceptées récupérées:', response)),
      catchError(this.handleError)
    );
}

// Méthode pour refuser une demande de mentorat
refuserDemandeMentorat(demandeId: number): Observable<any> {
  const headers = this.createHeaders();
  return this.http.post(`${apiUrl}/mentorats/${demandeId}/refuser`, {}, { headers })
    .pipe(catchError(this.handleError));
};

// Méthode pour obtenir le nombre de demandes de mentorat pour l'utilisateur connecté
getNombreDemandes(): Observable<any> {
  const headers = this.createHeaders();
  return this.http.get<any>(`${apiUrl}/mentor/statistiques/demandes`, { headers })
    .pipe(catchError(this.handleError));
}

// Méthode pour obtenir le nombre de sessions créées par l'utilisateur connecté
getNombreSessions(): Observable<any> {
  const headers = this.createHeaders();
  return this.http.get<any>(`${apiUrl}/mentor-sessions/statistiques/sessions`, { headers })
    .pipe(catchError(this.handleError));
}

// Méthode pour obtenir le nombre d'articles créés par l'utilisateur connecté
getNombreArticles(): Observable<any> {
  const headers = this.createHeaders();
  return this.http.get<any>(`${apiUrl}/mentor-articles/statistiques/articles`, { headers })
    .pipe(catchError(this.handleError));
}

//afficher les notifications
getMentorNotifications(userId: string): Observable<any> {
  const headers = this.createHeaders();
  console.log('Headers envoyés:', headers);
  return this.http.get<any>(`${apiUrl}/mentor/${userId}/notifications`, { headers })
    .pipe(
      catchError(this.handleError)
    );
}
getMentorById(user_id: number): Observable<UserModel> {
  const headers = this.createHeaders();
  return this.http.get<UserModel>(`${apiUrl}/mentore/${user_id}`, { headers })
    .pipe(catchError(this.handleError));
}

}
