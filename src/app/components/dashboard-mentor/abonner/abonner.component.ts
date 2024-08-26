import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { SidebarComponent } from '../sidebar/sidebar.component'

@Component({
  selector: 'app-abonner',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './abonner.component.html',
  styleUrls: ['./abonner.component.css']
})
export class AbonnerComponent implements OnInit {
  subscribers: any[] = [] // Liste des abonnés

  constructor (private http: HttpClient) {}

  ngOnInit (): void {
    this.getSubscribers()
  }

  // Récupérer la liste des abonnés depuis l'API
  getSubscribers (): void {
    this.http
      .get<any[]>('https://api.example.com/subscribers') 
      .subscribe({
        next: data => (this.subscribers = data),
        error: error =>
          console.error('Erreur lors du chargement des abonnés', error)
      })
  }
}
