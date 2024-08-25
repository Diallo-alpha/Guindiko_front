import { Component } from '@angular/core'
import { SidebarComponent } from '../sidebar/sidebar.component'

@Component({
  selector: 'app-profil-mentor',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './profil-mentor.component.html',
  styleUrls: ['./profil-mentor.component.css']
})
export class ProfilMentorComponent {
  mentor = {
    prenom: 'Aminata Assane',
    nom: 'Ndiaye',
    email: 'exemple@exemple.com',
    experience: '6',
    biographie: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    photoUrl: 'assets/images/mentor1.svg',
    password: '******'
  }

  modifierPhoto () {
    // Logique pour modifier la photo
  }

  supprimerPhoto () {
    // Logique pour supprimer la photo
  }

  enregistrerProfil () {
    // Logique pour enregistrer les modifications
  }

  annulerModification () {
    // Logique pour annuler les modifications
  }
}
