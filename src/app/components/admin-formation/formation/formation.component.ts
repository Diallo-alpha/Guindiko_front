import { Component } from '@angular/core';
@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationAdminComponent {
  tags: string[] = ['Informatique', 'Marketing', 'Comptabilité', 'Transport Logistique'];

  categories = [
    { name: 'Informatique', image: './assets/informatique.png' },
    { name: 'Marketing', image: './assets/informatique.png' },
    { name: 'Comptabilité', image: './assets/informatique.png' },
    { name: 'Transport Logistique', image: './assets/informatique.png' },
  ];
}
