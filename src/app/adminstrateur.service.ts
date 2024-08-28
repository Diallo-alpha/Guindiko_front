import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminstrateurService {

  private apiUrl = 'http://localhost:8000/api/' ;

  constructor(private http  : HttpClient) {}

  //méthodes pour récupérer les demandes de mentorat
  getMentorRequests(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getMentorRequest(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
