import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {
  requests = [
    { name: 'Adiaratou Oumy Fall', email: 'falladiaratouumy@gmail.com', phone: '+221 77 812 84 26', diploma: 'Ingénieur en informatique' },
    // Ajoutez d'autres demandes ici
  ];

  viewDetails(request: any) {
    // Logic for viewing details
  }

  editRequest(request: any) {
    // Logic for editing the request
  }

  deleteRequest(request: any) {
    // Logic for deleting the request
  }
}
