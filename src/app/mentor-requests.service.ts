import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MentorRequestsService {
  private apiUrl = 'http://localhost:8000/api'; // Remplacez par l'URL de votre API Laravel

  constructor(private http: HttpClient) {}

  getMentorRequests(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getMentorRequest(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createMentorRequest(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateMentorRequest(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteMentorRequest(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
