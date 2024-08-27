import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ProfilMentorComponent } from '../profil-mentor/profil-mentor.component';
import { MentorService } from '../../../services/mentor.service';
import { ActivatedRoute } from '@angular/router';
import { SessionModel } from '../../../models/SessionModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-mentor',
  standalone: true,
  imports: [NavbarComponent, ProfilMentorComponent, CommonModule],
  templateUrl: './session-mentor.component.html',
  styleUrls: ['./session-mentor.component.css']
})
export class SessionMentorComponent {
  user_id: number = 0;
  sessions: SessionModel[] = [];

  constructor(private route: ActivatedRoute, private mentorService: MentorService) {}

  ngOnInit(): void {
    this.user_id = +this.route.snapshot.paramMap.get('id')!;

    // Récupérer les sessions spécifiques au mentor
    this.mentorService.getSessionsMentore(this.user_id).subscribe(
      (response: any) => {
        console.log('Sessions récupérées:', response);

        // Vérification si la réponse est un tableau
        if (Array.isArray(response)) {
          this.sessions = response;
        } else if (response && typeof response === 'object' && Array.isArray(response.sessions)) {
          this.sessions = response.sessions;
        } else {
          console.error('La réponse n\'est pas un tableau de sessions', response);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des sessions', error);
      }
    );
  }
  reserverSession(sessionId: number): void {
    console.log('Session réservée avec ID:', sessionId);
    // Oumyna  tu peux ajouter la logique pour traiter la réservation de la session ici
  }
}
