import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ProfilMentorComponent } from '../profil-mentor/profil-mentor.component';
import { MentorService } from '../../../services/mentor.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-abonner-mentor',
  standalone: true,
  imports: [NavbarComponent, ProfilMentorComponent, CommonModule],
  templateUrl: './abonner-mentor.component.html',
  styleUrls: ['./abonner-mentor.component.css']
})
export class AbonnerMentorComponent {
  user_id: number = 0;
  abonnes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private mentorService: MentorService
  ) {}

  ngOnInit(): void {
    this.user_id = +this.route.snapshot.paramMap.get('id')!;

    // Récupérer les abonnés du mentor
    this.mentorService.getDemandesAcceptees(this.user_id).subscribe(
      (abonnes) => {
        this.abonnes = Array.isArray(abonnes) ? abonnes : Object.values(abonnes);
      },
      (error) => {
        console.error('Erreur lors de la récupération des abonnés', error);
      }
    );
  }
}
