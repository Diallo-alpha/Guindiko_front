import { Component, OnInit } from '@angular/core'
import { NavbarComponent } from '../../navbar/navbar.component'
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-profil-mentor',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './profil-mentor.component.html',
  styleUrls: ['./profil-mentor.component.css']
})
export class ProfilMentorComponent implements OnInit {
  mentor = {
    prenom: '',
    nom: '',
    email: '',
    biographie: '',
    experience: '',
    langues: '',
    membres: 0,
    photoUrl: ''
  }

  private apiUrl = 'https://your-api-endpoint.com/mentor-profile' 
  constructor () {}

  ngOnInit () {
    this.fetchMentorProfile()
  }

  async fetchMentorProfile () {
    try {
      const response = await fetch(this.apiUrl)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      this.mentor = data
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des données du mentor',
        error
      )
    }
  }

  requestMentorship () {
    console.log('Demande de mentorat envoyée')
    //  la logique pour demander un mentorat
  }

  viewArticles () {
    console.log('Voir les articles')
    //  la logique pour voir les articles
  }

  viewSessions () {
    console.log('Voir les sessions')
    //  la logique pour voir les sessions
  }

  viewMembers () {
    console.log('Voir les membres')
    //  la logique pour voir les membres
  }
}
