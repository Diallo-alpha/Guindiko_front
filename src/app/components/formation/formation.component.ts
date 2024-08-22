import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-formation',
<<<<<<< HEAD
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
=======
>>>>>>> 70ca62d6e6932799fd7d992707a64071e3f8c5e2
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent {
  tags: string[] = ['Informatique', 'Marketing', 'Comptabilité', 'Transport Logistique'];

  categories = [
    { name: 'Informatique', image: './assets/informatique.png' },
    { name: 'Marketing', image: './assets/informatique.png' },
    { name: 'Comptabilité', image: './assets/informatique.png' },
    { name: 'Transport Logistique', image: './assets/informatique.png' },
  ];
}
