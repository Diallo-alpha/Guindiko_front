import { Component } from '@angular/core'
import { SidebarComponent } from '../sidebar/sidebar.component'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Propriétés pour les statistiques
  sessionsCount: number = 20
  membersCount: number = 150
  requestsCount: number = 15
  articlesCount: number = 4

  // Liste des sessions à venir
  upcomingSessions = [
    {
      theme: 'What is Lorem Ipsum',
      category: 'Informatique',
      date: '10/01/2024',
      duration: '3h'
    },
    {
      theme: 'What is Lorem Ipsum',
      category: 'Informatique',
      date: '10/01/2024',
      duration: '3h'
    }
  ]

  // Liste des demandes
  requests = [
    { fullName: 'Fatim Ndiaye' },
    { fullName: 'Maty Seck' },
    { fullName: 'Martin Diop' },
    { fullName: 'Adiara Mbodj' }
  ]

  // Méthode pour accepter une demande
  acceptRequest (request: any) {
    console.log(`${request.fullName} accepted`)
    // Logique pour accepter la demande
  }

  // Méthode pour rejeter une demande
  rejectRequest (request: any) {
    console.log(`${request.fullName} rejected`)
    // Logique pour rejeter la demande
  }
}
