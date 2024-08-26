import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { MentorService } from '../../../services/mentor.service';

@Component({
  selector: 'app-profil-mentor',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './profil-mentor.component.html',
  styleUrls: ['./profil-mentor.component.css']
})
export class ProfilMentorComponent implements OnInit {
  mentor: any; // Vous pouvez définir un type spécifique pour Mentor si disponible

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mentorService: MentorService
  ) { }

  ngOnInit(): void {
    // Obtenir l'ID du mentor depuis les paramètres de l'URL
    const mentorId = +this.route.snapshot.paramMap.get('id')!;
    this.getMentorDetails(mentorId);
  }

  getMentorDetails(id: number): void {
    this.mentorService.getMentorById(id).subscribe(
      (data) => {
        this.mentor = data;
        console.log('Mentor Details:', this.mentor);
      },
      (error) => {
        console.error('Error fetching mentor details:', error);
      }
    );
  }

  goToPage(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
