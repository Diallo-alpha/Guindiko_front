import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from './apiUrl';
import { DomainModel } from '../models/DomainModel';

@Injectable({
  providedIn: 'root',
})
export class DonneePublicService {  // Le nom du service doit être cohérent
  private http = inject(HttpClient);

  // Récupérer tous les domaines, typé avec DomainModel[]
  getDomains(): Observable<DomainModel[]> {
    return this.http.get<DomainModel[]>(`${apiUrl}/domaines`);
  }

  // Récupérer les détails d'un domaine spécifique, typé avec DomainModel
  getDomainById(domainId: number): Observable<DomainModel> {
    return this.http.get<DomainModel>(`${apiUrl}/domaines/${domainId}`);
  }

  // Récupérer les formations par domaine (le type de réponse doit être précisé)
  getFormationsByDomain(domainId: number): Observable<any> {
    return this.http.get(`${apiUrl}/domaines/${domainId}/formations`);
  }

  // Récupérer une formation spécifique (le type de réponse doit être précisé)
  getFormationById(formationId: number): Observable<any> {
    return this.http.get(`${apiUrl}/formations/${formationId}`);
  }
}
