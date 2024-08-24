import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
  standalone: true,
  imports: [CommonModule] 

})
export class DashboardAdminComponent implements OnInit {
  requests: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.fetchMentorRequests();
  }

// Supposons que l'API renvoie un objet avec les demandes sous la propriété `demandes`
fetchMentorRequests() {
  this.adminService.obtenirDemandesMentor().subscribe(
    (data: any) => {
      console.log('Response from API:', data);
      // Utilisez `data.demandes` pour accéder aux données
      this.requests = data.demandes || [];
    },
    (error) => {
      console.error('Error fetching mentor requests:', error);
    }
  );
}

 // Validate a mentor request
 validerDemande(mentorId: number): void {
  this.adminService.validerMentor(mentorId).subscribe({
    next: () => {
      alert('La demande a été validée avec succès.');
      this.fetchMentorRequests();  // Refresh the list
    },
    error: (error: any) => {
      console.error('Erreur lors de la validation de la demande :', error);
      alert('Erreur lors de la validation de la demande.');
    }
  });
}

// Reject a mentor request
rejeterDemande(mentorId: number): void {
  this.adminService.suspendreUtilisateur(mentorId).subscribe({
    next: () => {
      alert('La demande a été rejetée avec succès.');
      this.fetchMentorRequests();  // Refresh the list
    },
    error: (error: any) => {
      console.error('Erreur lors du rejet de la demande :', error);
      alert('Erreur lors du rejet de la demande.');
    }
  });
}



}