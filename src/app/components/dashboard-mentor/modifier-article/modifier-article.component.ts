import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorService } from '../../../services/mentor.service';
import { ArticleModel } from '../../../models/ArticleModel';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modifier-article',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './modifier-article.component.html',
  styleUrls: ['./modifier-article.component.css']
})
export class ModifierArticleComponent implements OnInit {
  article: ArticleModel = {} as ArticleModel;
  articleId!: number; // The ID of the article

  constructor(
    private mentorService: MentorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.articleId = Number(this.route.snapshot.paramMap.get('id'));
    this.getArticleById(this.articleId);
  }

  // Fetch the article by its ID
  getArticleById(articleId: number): void {
    this.mentorService.getArticleById(articleId).subscribe(
      (response: ArticleModel) => {
        this.article = response;
      },
      (error) => {
        console.error('Erreur lors du chargement de l\'article :', error);
      }
    );
  }

  // Update the article
  updateArticle(): void {
    this.mentorService.modifierArticle(this.articleId, this.article).subscribe(
      () => {
        console.log('Article modifié avec succès');
        this.router.navigate(['/article-dashboard']); 
      },
      (error) => {
        console.error('Erreur lors de la modification de l\'article :', error);
      }
    );
  }
}
