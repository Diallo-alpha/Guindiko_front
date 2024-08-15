import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menteur',
  standalone: true,
  imports: [NavbarComponent, RouterModule],
  templateUrl: './menteur.component.html',
  styleUrl: './menteur.component.css'
})
export class MenteurComponent {

}
