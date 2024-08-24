import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule  ],
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  userobject = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  connexion() {
    if (this.userobject.email && this.userobject.password) {
      this.authService.login(this.userobject).subscribe({
        next: (response: any) => {
          console.log('Login response:', response);

          if (response.user) {
            // Sauvegarder les données utilisateur et le token dans le localStorage
            this.authService.storeUserData(response.user, response.access_token);

            // Assurez-vous que les rôles existent avant de procéder
            const roles = response.user.roles || [];
            console.log('User roles:', roles);

            if (roles.length > 0) {
              // Naviguer selon le rôle de l'utilisateur
              if (roles.includes('admin')) {
                this.router.navigateByUrl('/admin-dashboard');
              } else if (roles.includes('mentor')) {
                this.router.navigateByUrl('/dashboard-mentor');
              } else if (roles.includes('mentee')) {
                this.router.navigateByUrl('/');
              } else {
                this.router.navigateByUrl('/inscription');
              }
            } else {
              console.error('Aucun rôle défini pour l\'utilisateur');
            }
          } else {
            console.error('Pas de données utilisateur dans la réponse');
          }
        },
        error: error => {
          console.error('Erreur lors de la connexion:', error);
        }
      });
    }
  }
}
