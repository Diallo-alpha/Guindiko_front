import { Component } from '@angular/core'
import { SidebarComponent } from '../sidebar/sidebar.component'

@Component({
  selector: 'app-dash-article',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './dash-article.component.html',
  styleUrls: ['./dash-article.component.css']
})
export class DashArticleComponent {
  // Propriétés de l'article
  articleTitle: string = "L'Évolution du Développement Web"
  articleAuthor: string = 'Cheikh Sane'
  articleCategory: string = 'Informatique'
  articleImage: string =
    'https://replicate.delivery/yhqm/G2Q9EzuyAZZJHVfiIfrsRPPXjfcmcQ0CtIeKlxGv3sjvPXQNB/out-0.png'
  articleText: string = `Décrivez les premières années du web, où les sites étaient statiques, principalement composés de texte et d'images simples, avec HTML comme langage de base.
C'est le 12 mars 1989, il y a 30 ans, jour pour jour, que Tim Berners-Lee, un scientifique britannique du Cern, a soumis un texte intitulé « Gestion de l'information : une proposition ». Internet occupait déjà une place de plus en plus importante pour les échanges d'informations, notamment dans les milieux universitaires. Certaines des technologies, associées à tort aujourd'hui au Web, existaient déjà à l'époque. L'e-mail date de 1965, tandis que les newsgroups, les premiers systèmes de forums électroniques, ont été inventés dès 1979.`
  likesCount: number = 12

  // Méthode pour modifier l'article
  editArticle () {
    // console.log("Modifier l'article")
    // Logique pour modifier l'article
  }

  // Méthode pour ajouter un 'j'aime'
  addLike () {
    this.likesCount++
    // console.log("J'aime ajouté")
  }
}
