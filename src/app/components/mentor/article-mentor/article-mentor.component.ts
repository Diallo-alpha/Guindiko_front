import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ProfilMentorComponent } from '../profil-mentor/profil-mentor.component';

@Component({
  selector: 'app-article-mentor',
  standalone: true,
  imports: [NavbarComponent, ProfilMentorComponent],
  templateUrl: './article-mentor.component.html',
  styleUrl: './article-mentor.component.css'
})
export class ArticleMentorComponent {

}
