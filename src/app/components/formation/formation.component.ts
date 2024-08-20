import { Component } from '@angular/core';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent {
  tags: string[] = ['Informatique', 'Marketing', 'Comptabilité', 'Transport Logistique'];

  categories = [
    { name: 'Informatique', image: './assets/informatique.png' },
    { name: 'Marketing', image: './assets/marketing.png' },
    { name: 'Comptabilité', image: './assets/comptabilite.png' },
    { name: 'Transport Logistique', image: './assets/logistique.png' },
  ];
}
