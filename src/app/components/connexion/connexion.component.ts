import { Component } from '@angular/core';
import { AuthService } from '../../service/auth-service.service'; // Adjust the import path if necessary
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  // Define an object to hold the form data
  userobject = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  // Method to handle the login process
  connexion() {
    console.log(this.userobject); // Log the user input for debugging

    if (this.userobject.email && this.userobject.password) {
      console.log("slamm"); // Log to confirm that the function is executing

      this.authService.login(this.userobject).subscribe(
        (response: any) => {
          console.log('Token:', response.access_token);

          if (response.user) {
            // Store the token and user info in local storage
            localStorage.setItem('Token', JSON.stringify(response.access_token));
            this.router.navigateByUrl('/');
            console.log('Connexion réussie et redirection effectuée');
          }
        },
        (error) => {
          console.error('Erreur lors de la connexion:', error);
        }
      );
    }
  }
}
