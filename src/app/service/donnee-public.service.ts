import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrl } from './apiUrl';
import { DomainModel } from '../models/DomainModel';
import { FormationModel } from '../models/FormationModel'; 

@Injectable({
  providedIn: 'root',
})
export class DonneePublicService {
  private http = inject(HttpClient);

  // Récupérer tous les domaines, typé avec DomainModel[]
  getDomains(): Observable<DomainModel[]> {
    return this.http.get<DomainModel[]>(`${apiUrl}/domaines`).pipe(
      catchError(this.handleError)
    );
  }

  // Récupérer les détails d'un domaine spécifique, typé avec DomainModel
  getDomainById(domainId: number): Observable<DomainModel> {
    return this.http.get<DomainModel>(`${apiUrl}/domaines/${domainId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Récupérer les formations par domaine, typé avec FormationModel[]
  getFormationsByDomain(domainId: number): Observable<FormationModel[]> {
    return this.http.get<FormationModel[]>(`${apiUrl}/domaines/${domainId}/formations`).pipe(
      catchError(this.handleError)
    );
  }

  // Récupérer une formation spécifique, typé avec FormationModel
  getFormationById(formationId: number): Observable<FormationModel> {
    return this.http.get<FormationModel>(`${apiUrl}/formations/${formationId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Méthode de gestion des erreurs
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
