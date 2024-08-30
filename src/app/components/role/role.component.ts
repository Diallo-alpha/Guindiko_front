import { Component, OnInit } from '@angular/core';
import { MentorService } from '../../services/mentor.service';
import { AuthService } from '../../services/auth-service.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
Router
AuthService
MentorService

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
  selector: 'app-role',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit {


  userName: string = '';
  notifications: Notification[] = [];
  showNotifications: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private mentorService: MentorService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getNotifications();
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
