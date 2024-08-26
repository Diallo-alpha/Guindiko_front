import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { UserModel } from '../../models/userModel';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  currentStep: number = 1;

  // User data model with initial values
  userData: UserModel = {};

  constructor(private authService: AuthService, private router: Router) {}

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  getProgressBarWidth(): string {
    return (this.currentStep * 33.33) + '%';
  }

  // Handle file selection for CV
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.userData.cv = file.name; // Store the file name in userData.cv
      // You can also store the actual file if needed
    }
  }

  // Handle form submission
  onSubmit() {
    if (this.currentStep === 3) {
      console.log('donner sommis:', this.userData); // Log user data submission

      this.authService.register(this.userData).subscribe({
        next: (response: any) => {
          console.log('Utilisateur inscrit avec succes :', response);

          // Store the token and user info in local storage
          localStorage.setItem('Token', JSON.stringify(response.token));
          localStorage.setItem('User', JSON.stringify(response.user));

          // Navigate to a different route after successful registration
          this.router.navigateByUrl('/');

          console.log('Redirection effectuée après inscription réussie');
        },
        error: error => {
          console.error('Error during registration:', error); // Log any errors
        }
      });
    }
  }
}
