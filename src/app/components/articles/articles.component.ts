import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MentorService } from '../../services/mentor.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [NavbarComponent, RouterModule, CommonModule],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: any[] = [];
  filteredArticles: any[] = [];
  mentors: { [key: string]: string } = {}; // Dictionary to store mentor names
  formations: any[] = []; // Array to store formations
  selectedFormationId: string = ''; // Selected formation ID for filtering

  constructor(private mentorService: MentorService) {}

  ngOnInit(): void {
    // Fetch articles and formations
    this.mentorService.getArticles().subscribe((data) => {
      this.articles = data;
      this.filteredArticles = this.articles;
      this.loadMentors(); // Load mentors after articles
      this.loadFormations(); // Load formations after articles
    });
  }

  // Load mentors and map them by ID
  private loadMentors(): void {
    this.mentorService.getMentors().subscribe((mentors) => {
      mentors.forEach((mentor) => {
        this.mentors[mentor.id] = mentor.name; // Map mentor ID to name
      });
    });
  }

  // Load formations
  private loadFormations(): void {
    this.mentorService.getFormations().subscribe((formations) => {
      this.formations = formations;
    });
  }

  getMentorName(userId: string): string {
    return this.mentors[userId] || 'Unknown'; // Return mentor name or 'Unknown'
  }

  filterByFormation(formationId: string): void {
    this.selectedFormationId = formationId;
    this.filteredArticles = this.articles.filter(article => article.formation_id === formationId);
  }

  // Handle filter change
  onFormationFilterChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedFormationId = selectElement.value;

    // Filter articles based on selected formation ID
    this.filteredArticles = this.articles.filter(article =>
      !this.selectedFormationId || article.formation_id === this.selectedFormationId
    );
  }
}
