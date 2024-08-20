import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/userModel';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);


  register(userData: UserModel): Observable<any> {
    return this.http.post(`${apiUrl}/register`, userData);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${apiUrl}/login`, credentials);
  }
}
