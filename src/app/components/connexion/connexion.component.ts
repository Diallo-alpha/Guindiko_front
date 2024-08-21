import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
            this.authService.storeUserData(response.user, response.access_token);

            const roles = response.user.roles;
            console.log('User roles:', roles);

            if (roles.includes('admin')) {
              this.router.navigateByUrl('/admin-dashboard');
            } else if (roles.includes('mentor')) {
              this.router.navigateByUrl('/dashboard-mentor');
            } else if (roles.includes('mentee')) {
              this.router.navigateByUrl('/');
            } else {
              this.router.navigateByUrl('/inscription');
            }
          }
        },
        error: error => {
          console.error('Error during login:', error);
        }
      });
    }
  }
}
