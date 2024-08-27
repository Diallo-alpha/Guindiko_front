import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorService } from '../../../services/mentor.service';
import { UserModel } from '../../../models/userModel';
import { ChangeDetectorRef } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil-mentor',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './profil-mentor.component.html',
  styleUrls: ['./profil-mentor.component.css']
})
export class ProfilMentorComponent implements OnInit {
  user_id: number = 0;
  mentor: UserModel | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mentorService: MentorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.user_id = +this.route.snapshot.paramMap.get('id')!;
    this.loadMentorDetails();
  }

  private loadMentorDetails(): void {
    this.mentorService.getMentorById(this.user_id).subscribe(
      (data: any) => {
        this.mentor = data.mentor; // S'assurer que 'mentor' est correctement assigné
        console.log(this.mentor); // Log pour débogage
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du mentor', error);
      }
    );
  }

  goToPage(page: string): void {
    this.router.navigate([`/profile/${this.user_id}/${page}`]);
  }
}
