import { MentorService } from './../../../services/mentor.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth-service.service';
import { CommonModule } from '@angular/common';

// Define the type for Notification outside the component
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
  selector: 'app-sidebar',
  standalone: true,

  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  userName: string = '';
  notifications: Notification[] = [];
  showNotifications: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private MentorService: MentorService
  ) {}

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
      this.MentorService.getMentorNotifications(user.id).subscribe(
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

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/accueil']);
  }
}
