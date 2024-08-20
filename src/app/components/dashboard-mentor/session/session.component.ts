import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  selector: 'app-session',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './session.component.html',
  styleUrl: './session.component.css'
})
export class SessionComponent {

}
