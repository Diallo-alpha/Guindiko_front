import { Component, OnInit } from '@angular/core';
import { MentorService } from '../../../services/mentor.service';
import { ArticleModel } from '../../../models/ArticleModel';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dash-article',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './dash-article.component.html',
  styleUrls: ['./dash-article.component.css']
})
export class DashArticleComponent implements OnInit {
  articles: ArticleModel[] = []; // Array to hold the articles
  mentorId: number = 0; // Stocker l'ID du mentor connecté

  constructor(private mentorService: MentorService) {}

  ngOnInit(): void {
    this.mentorId = this.getConnectedMentorId(); // Méthode pour récupérer l'ID du mentor connecté
    this.loadArticles();
  }

  loadArticles() {
    this.mentorService.getArticles(this.mentorId).subscribe(
      (response: ArticleModel[]) => {
        this.articles = response;
      },
      (error) => {
        console.error('Erreur lors du chargement des articles :', error);
      }
    );
  }

  deleteArticle(articleId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      this.mentorService.supprimerArticle(articleId).subscribe(
        () => {
          this.articles = this.articles.filter(article => article.id !== articleId);
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'article :', error);
        }
      );
    }
  }

  editArticle(articleId: number) {
    // Navigate to the article edit page or open a modal for editing
    console.log('Modifier l\'article avec l\'ID:', articleId);
  }

  // Simuler la récupération de l'ID du mentor connecté (remplacer avec votre logique réelle)
  getConnectedMentorId(): number {
    const mentor = JSON.parse(localStorage.getItem('User') || '{}');
    return mentor?.id || 0;
  }
}
