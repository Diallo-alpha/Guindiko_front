import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { NavbarComponent } from '../../navbar/navbar.component'

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

  private apiUrl = 'https://your-api-endpoint.com/mentor-profile' // Remplacez par l'URL de votre API

  constructor (private http: HttpClient) {}

  ngOnInit () {
    this.fetchMentorProfile()
  }

  fetchMentorProfile () {
    this.http.get(this.apiUrl).subscribe(
      (data: any) => {
        this.mentor = data
      },
      error => {
        console.error(
          'Erreur lors de la récupération des données du mentor',
          error
        )
      }
    )
  }

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
