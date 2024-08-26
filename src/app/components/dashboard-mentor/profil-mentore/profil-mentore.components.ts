import { Component } from '@angular/core'
import { SidebarComponent } from '../sidebar/sidebar.component'
import { FormsModule } from '@angular/forms'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-profil-mentor',
  standalone: true,
  imports: [SidebarComponent, FormsModule],
  templateUrl: './profil-mentore.components.html',
  styleUrls: ['./profil-mentore.components.css']
})
export class ProfilMentoreComponents {
  mentor = {
    prenom: 'Aminata Assane',
    nom: 'Ndiaye',
    email: 'exemple@exemple.com',
    experience: '6',
    biographie: `Lorem Ipsum is simply dummy text of the printing and typesetting industry...`,
    photoUrl: 'assets/images/mentor1.svg',
    password: '******'
  }

  constructor (private http: HttpClient) {}

  modifierPhoto (): void {
    // Logique pour modifier la photo
  }

  supprimerPhoto (): void {
    // Logique pour supprimer la photo
  }

  enregistrerProfil (): void {
    // Sauvegarder les modifications du profil via l'API
    this.http
      .put('https://api.example.com/mentor/profile', this.mentor)
      .subscribe({
        next: () => alert('Profil mis à jour avec succès !'),
        error: error =>
          console.error('Erreur lors de la mise à jour du profil', error)
      })
  }

  annulerModification (): void {
    // Réinitialiser les modifications du profil
    this.getMentorProfile()
  }

  private getMentorProfile (): void {
    // Charger le profil actuel depuis l'API
    this.http.get<any>('https://api.example.com/mentor/profile').subscribe({
      next: data => (this.mentor = data),
      error: error =>
        console.error('Erreur lors du chargement du profil', error)
    })
  }
}
