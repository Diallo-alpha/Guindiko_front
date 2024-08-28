import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ProfilMentorComponent } from '../profil-mentor/profil-mentor.component';
import { MentorService } from '../../../services/mentor.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-mentor',
  standalone: true,
  imports: [NavbarComponent, ProfilMentorComponent, CommonModule],
  templateUrl: './article-mentor.component.html',
  styleUrls: ['./article-mentor.component.css']
})
export class ArticleMentorComponent {
  user_id: number = 0;
  articles: any[] = [];

  constructor(private route: ActivatedRoute, private mentorService: MentorService) {}

  ngOnInit(): void {
    this.user_id = +this.route.snapshot.paramMap.get('id')!;

    // Récupérer les articles spécifiques au mentor
    this.mentorService.getArticlesMentore(this.user_id).subscribe(
      (articles) => {
        this.articles = Array.isArray(articles) ? articles : Object.values(articles);
      },
      (error) => {
        console.error('Erreur lors de la récupération des articles', error);
      }
    );
  }
}
