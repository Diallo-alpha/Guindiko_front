import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ProfilMentorComponent } from '../profil-mentor/profil-mentor.component';

@Component({
  selector: 'app-session-mentor',
  standalone: true,
  imports: [NavbarComponent, ProfilMentorComponent],
  templateUrl: './session-mentor.component.html',
  styleUrl: './session-mentor.component.css'
})
export class SessionMentorComponent {

}
