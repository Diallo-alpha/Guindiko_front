import { Component } from '@angular/core'
import { SidebarComponent } from '../sidebar/sidebar.component'

@Component({
  selector: 'app-creer-article',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './creer-article.component.html',
  styleUrls: ['./creer-article.component.css']
})
export class CreerArticleComponent {
  titre: string = ''
  description: string = ''
  image: File = new File([], '') // Initialisation de l'image avec un fichier vide

  onImageSelected (event: any) {
    const file: File = event.target.files[0]
    if (file) {
      this.image = file
    } else {
      console.log('Aucun fichier sélectionné.')
    }
  }

  publierArticle () {
    if (this.titre && this.image.size > 0 && this.description) {
      console.log('Article créé avec succès:', {
        titre: this.titre,
        image: this.image.name, // Nom du fichier
        description: this.description
      })
      // Logique pour envoyer les données au backend ou effectuer une autre action
    } else {
      console.log('Veuillez remplir tous les champs et sélectionner une image.')
    }
  }
}
