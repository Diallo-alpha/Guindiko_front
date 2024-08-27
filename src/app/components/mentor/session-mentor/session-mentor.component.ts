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
  styleUrl: './session-mentor.component.css'
})
export class SessionMentorComponent {
  user_id: number = 0;
  sessions: any[] = [];

  constructor(private route: ActivatedRoute, private mentorService: MentorService) {}

  ngOnInit(): void {
    this.user_id = +this.route.snapshot.paramMap.get('id')!;

    // Récupérer les sessions spécifiques au mentor
    this.mentorService.getSessionsMentore(this.user_id).subscribe(
      (sessions) => {
        this.sessions = Array.isArray(sessions) ? sessions : Object.values(sessions);
      },
      (error) => {
        console.error('Erreur lors de la récupération des sessions', error);
      }
    );
  }
}
