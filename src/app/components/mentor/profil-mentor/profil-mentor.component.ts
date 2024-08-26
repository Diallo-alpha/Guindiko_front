import { Component } from '@angular/core'
import { NavbarComponent } from '../../navbar/navbar.component'

@Component({
  selector: 'app-profil-mentor',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './profil-mentor.component.html',
  styleUrls: ['./profil-mentor.component.css']
})
export class ProfilMentorComponent {
  // Propriétés dynamiques
  mentorName = 'Alpha Diallo'
  mentorEmail = 'alphaloppecity@gmail.com'
  mentorBio = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
               Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...`
  mentorExperience = '8 ans'
  mentorLanguages = 'Français'
  mentorMembers = 300
  mentorImage = 'assets/images/mentor1.svg'

  // Méthodes pour actions
  requestMentorship () {
    console.log('Demande de mentorat envoyée')
  }

  viewArticles () {
    console.log('Voir les articles')
  }

  viewSessions () {
    console.log('Voir les sessions')
  }

  viewMembers () {
    console.log('Voir les membres')
  }
}
