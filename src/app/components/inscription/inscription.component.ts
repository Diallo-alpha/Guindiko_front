import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth-service.service';
import { UserModel } from '../../models/userModel';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  currentStep: number = 1;

  // User data model with initial values
  userData: UserModel = {};
  constructor(private authService: AuthService) {}

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
// Handle form submission
  onSubmit() {
    if (this.currentStep === 3) {
      this.authService.register(this.userData).subscribe({
        next: response => {
          console.log('Utilisateur inscrit avec succes :', response);
        },
        error: error => {
          if (error.status === 422) {
            console.error('validation erreur :', error.error);
          } else {
            console.error('Error inscription:', error);
          }
        }
      });
    }
  }
}
