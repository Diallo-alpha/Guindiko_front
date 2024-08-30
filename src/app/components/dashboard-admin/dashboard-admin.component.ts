import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { MentorService } from '../../services/mentor.service';
import { AuthService } from '../../services/auth-service.service';
import { Router, RouterModule } from '@angular/router';



interface Notification {
  id: string;
  type: string;
  notifiable_type: string;
  notifiable_id: number;
  data: {
    message?: string;
    [key: string]: any; // Allow for other dynamic properties
  };
  read_at: string | null;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],

})

export class DashboardAdminComponent implements OnInit {
  requests: any[] = [];
  userName: string = 'Utilisateur'; // Declare with a default value
  notifications: Notification[] = []; // Declare an empty array
  showNotifications: boolean = false; // Declare with a default value



  constructor(
    private adminService: AdminService,
    private mentorService: MentorService,
    private authService: AuthService ,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchMentorRequests();
    this.getUserInfo();
    this.getNotifications();
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

navigateTo(path: string): void {
  this.router.navigate([path]);
}

getUserInfo(): void {
  const storedUser = localStorage.getItem('User');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    this.userName = user.name || 'Utilisateur';
  }
}

getNotifications(): void {
  const storedUser = localStorage.getItem('User');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    this.mentorService.getMentorNotifications(user.id).subscribe(
      (data: Notification[]) => {
        this.notifications = data.filter((notification: Notification) => !notification.read_at);
        console.log('Notifications:', this.notifications);
      },
      (error) => {
        console.error('Erreur lors de la récupération des notifications', error);
      }
    );
  }
}

toggleNotifications(): void {
  this.showNotifications = !this.showNotifications;
}
logout(): void {
  this.authService.logout();
  this.router.navigate(['/accueil']);
}
}
