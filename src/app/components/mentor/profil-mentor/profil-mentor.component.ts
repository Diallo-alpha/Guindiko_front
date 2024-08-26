import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-mentor',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './profil-mentor.component.html',
  styleUrl: './profil-mentor.component.css'
})
export class ProfilMentorComponent {

  constructor(private router: Router) { }

  goToPage(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
