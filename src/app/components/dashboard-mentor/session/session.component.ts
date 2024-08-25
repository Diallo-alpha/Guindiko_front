import { Component, OnInit } from '@angular/core';
import { MentorService } from '../../../services/mentor.service';
import { SessionModel } from '../../../models/SessionModel';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  sessions: SessionModel[] = [];

  constructor(private mentorService: MentorService) {}

  ngOnInit() {
    this.loadSessions();
  }

  loadSessions() {
    const storedUser = localStorage.getItem('User');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const userId = user.id; // Utiliser user.id au lieu de mentorId

      if (userId) {
        this.mentorService.getSessionsMentore(userId).subscribe(
          (response: any) => {
            // Assurez-vous que 'sessions' est un tableau avec les détails de formation
            if (Array.isArray(response.sessions)) {
              this.sessions = response.sessions;
              console.log('Sessions chargées :', this.sessions);
            } else {
              console.error('Le format de réponse des sessions est invalide.');
            }
          },
          (error) => {
            console.error('Erreur lors du chargement des sessions :', error);
          }
        );
      } else {
        console.error('ID utilisateur non trouvé ou l\'utilisateur n\'est pas un mentor.');
      }
    } else {
      console.error('Aucune donnée utilisateur trouvée dans le local storage.');
    }
  }
}
