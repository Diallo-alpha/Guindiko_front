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



}