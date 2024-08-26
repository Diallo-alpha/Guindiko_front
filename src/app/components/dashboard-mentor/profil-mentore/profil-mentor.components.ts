import { Component } from '@angular/core'
import { SidebarComponent } from '../sidebar/sidebar.component'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-profil-mentor',
  standalone: true,
  imports: [SidebarComponent, FormsModule], // Add FormsModule here
  templateUrl: './profil-mentor.components.html',
  styleUrls: ['./profil-mentor.components.css']
})
export class ProfilMentorComponent {
  mentor = {
    prenom: 'Aminata Assane',
    nom: 'Ndiaye',
    email: 'exemple@exemple.com',
    experience: '6',
    biographie: `Lorem Ipsum is simply dummy text of the printing and typesetting industry...`,
    photoUrl: 'assets/images/mentor1.svg',
    password: '******'
  }

  modifierPhoto () {
    // Logic to modify the photo
  }

  supprimerPhoto () {
    // Logic to delete the photo
  }

  enregistrerProfil () {
    // Logic to save the profile changes
  }

  annulerModification () {
    // Logic to cancel the changes
  }
}
