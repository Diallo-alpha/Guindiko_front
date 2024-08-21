import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserModel } from '../models/userModel';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  // Enregistrer un nouvel utilisateur
  register(userData: UserModel): Observable<any> {
    return this.http.post(`${apiUrl}/register`, userData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.handleError) // Gestion des erreurs
    );
  }

  // Connexion d'un utilisateur et récupération du token et des données utilisateur (y compris le rôle)
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${apiUrl}/login`, credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      map((response: any) => {
        const user = response.user;
        if (user) {
          const roleNames = user.roles.map((role: any) => role.name); 

          return {
            ...response,
            user: {
              ...user,
              role: roleNames[0] || null,
            }
          };
        }
        return response;
      }),
      catchError(this.handleError) // Gestion des erreurs
    );
  }

  // Obtenir le rôle de l'utilisateur à partir des données utilisateur stockées
  getUserRole(): string | null {
    const storedUser = localStorage.getItem('User');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      return user.role || null;
    }
    return null;
  }

  // Stocker les données utilisateur (y compris le token) dans le localStorage
  storeUserData(user: any, token: string): void {
    localStorage.setItem('User', JSON.stringify(user));
    localStorage.setItem('Token', token);
  }

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return !!localStorage.getItem('Token');
  }

  // Déconnecter l'utilisateur en effaçant le localStorage
  logout(): void {
    localStorage.removeItem('User');
    localStorage.removeItem('Token');
  }

  // Gérer les erreurs globalement pour toutes les requêtes HTTP
  private handleError(error: any) {
    console.error('Une erreur est survenue:', error);
    return throwError(() => new Error('Une erreur est survenue, veuillez réessayer plus tard.'));
  }
}
