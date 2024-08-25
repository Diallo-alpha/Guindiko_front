import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Gestion des formulaires
import { NavbarComponent } from '../../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MentorService } from '../../../services/mentor.service';
import { ArticleModel } from '../../../models/ArticleModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-mentor',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './creer-article.component.html',
  styleUrls: ['./creer-article.component.css']
})
export class CreerArticleComponent implements OnInit {
 
  articleForm!: FormGroup; // Formulaire pour les articles
  article: ArticleModel[] = []; // Tableau pour stocker les articles

  constructor(private fb: FormBuilder, private mentorService: MentorService) {}

  ngOnInit(): void {
    // Initialisation du formulaire avec validations des champs
    this.articleForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      formation_id: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // Remplacé par formation_id
      image: ['', Validators.required],
      date_publication: [new Date(), Validators.required]
    });
  }

  onSubmit() {
    if (this.articleForm.valid) {
      const article: ArticleModel = this.articleForm.value;

      this.mentorService.ajouterArticle(article).subscribe(response => {
        console.log('Article créé avec succès :', response);
        // Actions après le succès
      }, error => {
        console.error('Erreur lors de la création de l\'article :', error);
        // Actions en cas d'erreur
      });
    } else {
      console.error('Le formulaire est invalide.');
    }
  }
}
